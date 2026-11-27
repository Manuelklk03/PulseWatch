# Entorno, Docker y despliegue

## Estado

Pendiente. No hay hosting, registro ni comandos de arranque verificados.

## Requisitos del entorno de desarrollo

Comprobado el 2026-11-05 en el equipo de Manuel (Windows 11, PowerShell):

| Herramienta | Versión disponible | Decisión |
| --- | --- | --- |
| Node.js | 24.21.0 | Usar Node 24. Vite 8 exige ^20.19.0 o >=22.12.0. |
| npm | 12.1.0 | Gestor del frontend; se conserva package-lock.json. |
| Python | 3.14.0 y 3.13.7 | Usar 3.13.7, verificado con ruff, mypy y pytest en local (2026-11-21) y en la CI (3.13.18 en Linux, 2026-11-22). |
| uv | 0.13.4 | Gestor de entorno y dependencias del backend; se conserva uv.lock. |
| Docker y Compose | 29.9.2 y 5.6.1 | Entorno reproducible y PostgreSQL local. |
| Git | 2.51.0 | Flujo de docs/git-workflow.md. |

No se instala PostgreSQL ni psql en el sistema: la base de datos local se ejecuta en Docker.

Sobre Python: una simulación de instalación con uv (sin instalar ni ejecutar) resolvió FastAPI, SQLAlchemy, Alembic, psycopg, pydantic, mypy, ruff y pytest tanto en 3.14 como en 3.13. Se eligió 3.13 por ser más madura; está fijada en backend/.python-version y verificada con una prueba real (ver Backend).

### Frontend

Versiones instaladas el 2026-11-05: Vite 8.3.5, React 19.3.1, TypeScript 6.0.3 y Prettier 3.9.10.

TypeScript se queda en la serie 6.0 (`~6.0.3`) y no en la 7.0 que trae la plantilla de Vite: `typescript-eslint` 8.72 declara como compatible solo TypeScript `<6.1.0` y npm rechaza la instalación con TypeScript 7 (error ERESOLVE). No usar `--force`. Revisar cuando `typescript-eslint` admita TypeScript 7.

`npm audit` informa de 10 vulnerabilidades moderadas, todas del mismo aviso de `minimatch` en herramientas de desarrollo. `npm audit --omit=dev` da 0 vulnerabilidades en las dependencias de producción. No se aplica `npm audit fix --force` porque puede romper versiones; se resolverá al actualizar ESLint.

### Backend

Versiones instaladas el 2026-11-21 con uv: FastAPI 0.165.0, Starlette 1.10.0, uvicorn 0.54.0, pytest 9.2.0, Ruff 0.17.6, mypy 2.4.1 y httpx2 2.16.2. Python 3.13 queda fijado en backend/.python-version y en requires-python. El proyecto no se empaqueta (es una aplicación) y se conserva backend/uv.lock.

El cliente de pruebas de Starlette marca httpx como obsoleto y recomienda httpx2, así que las pruebas usan httpx2.

La CI del backend descarga Python 3.13 a partir de backend/.python-version y ejecuta las mismas comprobaciones que en local.

Para preparar otro ordenador: instalar uv y ejecutar `uv sync --locked` desde backend/.

Versiones de las librerías que aún no se han instalado (SQLAlchemy, Alembic y el resto) y la imagen de PostgreSQL se fijan al inicializar cada parte, con su archivo de bloqueo.

## Local

Compose tendrá frontend, API, worker y PostgreSQL. Al implementarlo, documentar versiones, puertos, variables, migraciones, datos de ejemplo, salud, arranque, parada y diagnóstico. Diferenciar configuración de desarrollo y producción.

.env.example contiene valores ficticios. Los secretos locales se excluyen de Git. PostgreSQL dispone de volumen persistente. Borrar volúmenes requiere advertir la pérdida real de datos y autorización correspondiente.

### PostgreSQL local

Estado actual: compose.yaml define un único servicio, `db`, con PostgreSQL. La API, el worker y el frontend se añadirán después.

| Elemento | Valor |
| --- | --- |
| Imagen | postgres:18-alpine (verificado con PostgreSQL 18.7) |
| Puerto | 127.0.0.1:5433 en el equipo, 5432 dentro de Docker. Solo accesible desde el propio equipo. |
| Datos | Volumen postgres_data, que sobrevive a parar y volver a arrancar el contenedor (comprobado) |
| Salud | Comprobación con pg_isready cada 5 segundos |
| Variables | POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB y POSTGRES_PORT, en .env (copia de .env.example, que contiene valores ficticios) |

El puerto 5433 evita chocar con otros PostgreSQL locales que usen el 5432. Si el 5433 también está ocupado, cambiar POSTGRES_PORT en .env.

Comandos, desde la raíz del repositorio (PowerShell):

```powershell
Copy-Item .env.example .env        # solo la primera vez
docker compose up -d --wait        # arranca y espera a que esté sano
docker compose ps                  # estado
docker compose logs db             # diagnóstico
docker compose down                # para y conserva los datos
```

`docker compose down -v` borra también el volumen y **destruye todos los datos** de la base. Usarlo solo cuando se quiera empezar de cero.

Si falta .env o alguna variable obligatoria, Compose se detiene con un mensaje que nombra la variable que falta.

### Migraciones (Alembic)

Configuradas en backend/alembic.ini y backend/migrations/. La dirección de la base de datos sale de la variable DATABASE_URL de .env, nunca de un archivo de Git. Comandos, desde backend/ (PowerShell), con la base de datos arrancada:

```powershell
uv run --env-file ../.env alembic current                  # versión aplicada
uv run --env-file ../.env alembic upgrade head             # aplica las migraciones pendientes
uv run --env-file ../.env alembic downgrade -1             # deshace la última
uv run --env-file ../.env alembic revision --autogenerate -m "mensaje"   # cuando los modelos estén conectados
```

Notas:

- DATABASE_URL usa 127.0.0.1 y no localhost: en Windows, localhost puede resolver antes a IPv6 (::1), donde Docker no publica el puerto, y la conexión se queda esperando sin dar error. Se comprobó: con localhost el comando se colgaba y con 127.0.0.1 respondía en menos de un segundo.
- Cada migración generada se corrige y formatea con Ruff (check --fix y format), porque la plantilla de Alembic usa sintaxis antigua que las reglas del proyecto rechazan.
- Sin la variable DATABASE_URL, Alembic se detiene con un mensaje que explica cómo ejecutarlo.
- Estado actual: hay una migración (crear la tabla monitors) y target_metadata apunta a Base.metadata en migrations/env.py. alembic check no detecta restricciones CHECK; las protegen las pruebas. Las pruebas del modelo necesitan la base de datos arrancada y las migraciones aplicadas.
- Verificado con PostgreSQL real y una migración temporal (borrada después): SQL sin conexión, upgrade, current y downgrade.

## CD

1. Validar el commit integrado.
2. Construir imágenes identificadas por commit o versión.
3. Publicar en el registro elegido.
4. Desplegar las mismas imágenes comprobadas.
5. Aplicar migraciones de forma controlada y una sola vez.
6. Comprobar salud y recorrido básico.
7. Registrar versión, resultado y vía de recuperación.

Definir eventos y entornos antes de activar CD. Evitar despliegues simultáneos al mismo entorno. Proteger secretos y credenciales. Elegir automatización acorde a las capacidades y coste del hosting.

## Operación

Logs estructurados sin secretos, identificadores para diagnóstico, salud de API y worker, control del atraso de comprobaciones y retención de resultados.

Antes de publicar: probar copia y restauración, reinicios y recuperación. Documentar cómo volver a una imagen anterior compatible. Un rollback de imagen no revierte automáticamente una migración: los datos necesitan un plan específico.
