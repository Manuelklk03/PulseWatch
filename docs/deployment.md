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
