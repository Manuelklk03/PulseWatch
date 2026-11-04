# Entorno, Docker y despliegue

## Estado

Pendiente. No hay hosting, registro ni comandos de arranque verificados.

## Requisitos del entorno de desarrollo

Comprobado el 2026-11-05 en el equipo de Manuel (Windows 11, PowerShell):

| Herramienta | Versión disponible | Decisión |
| --- | --- | --- |
| Node.js | 24.21.0 | Usar Node 24. Vite 8 exige ^20.19.0 o >=22.12.0. |
| npm | 12.1.0 | Gestor del frontend; se conserva package-lock.json. |
| Python | 3.14.0 y 3.13 | Objetivo 3.13, a verificar al inicializar el backend. |
| uv | 0.13.4 | Gestor de entorno y dependencias del backend; se conserva uv.lock. |
| Docker y Compose | 29.9.2 y 5.6.1 | Entorno reproducible y PostgreSQL local. |
| Git | 2.51.0 | Flujo de docs/git-workflow.md. |

No se instala PostgreSQL ni psql en el sistema: la base de datos local se ejecuta en Docker.

Sobre Python: una simulación de instalación con uv (sin instalar ni ejecutar) resolvió FastAPI, SQLAlchemy, Alembic, psycopg, pydantic, mypy, ruff y pytest tanto en 3.14 como en 3.13. Se elige 3.13 por ser más madura; se fijará con un archivo .python-version al crear el backend y se revisará con una prueba real.

Versiones de las librerías (Vite, React, TypeScript, FastAPI y el resto) y la imagen de PostgreSQL se fijan al inicializar cada parte, con su archivo de bloqueo.

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
