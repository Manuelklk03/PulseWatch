# Estado de PulseWatch

## Actualización

2026-11-23 — Área feature/backend-base integrada en main (PR #16 a #18). Área feature/database-base abierta: PostgreSQL 18 en Docker Compose verificado en local (rama chore/postgres-compose, PR hacia la rama de integración pendiente de integrar).

## Estado comprobado

Repositorio en GitHub con main publicada. Hay documentación y un frontend con pruebas y CI; la pantalla de monitores usa datos de ejemplo provisionales. El backend tiene el endpoint GET /health con sus pruebas y su CI.

Entorno comprobado en el equipo de Manuel: Node 24.21.0, npm 12.1.0, Python 3.14.0 y 3.13, uv 0.13.4, Docker 29.9.2, Compose 5.6.1 y Git 2.51.0. Detalle y decisiones en docs/deployment.md.

## Fase y tarea activa

Fase 1, base técnica. Hecho: versiones del entorno y frontend de esta fase (Vite, TypeScript estricto, ESLint, Prettier, Vitest, CI, estructura por funcionalidades, lista de monitores con los estados de carga, error, vacío y éxito, y formulario accesible de crear monitores, todo sobre datos de ejemplo). Backend: proyecto con uv, endpoint de salud, pruebas y CI hechos. PostgreSQL 18 en Docker Compose ya funciona en local. Pendiente de la fase: SQLAlchemy y Alembic, el resto de Docker Compose, Docker Compose, SonarQube con cobertura y protección de main.

## Alcance confirmado

Alcance de docs/product.md aceptado sin cambios: primer recorrido local (Fase 2) y primera versión publicable (Fase 3). Equipos, alertas, estado público y mantenimiento programado quedan como ampliaciones.

## Decisiones abiertas

Se acuerdan y se registran en docs/decisions/ antes de implementarlas:

1. Intervalo mínimo y máximo de comprobación, y timeout máximo. El formulario usa de forma provisional 30 a 3600 segundos (constantes en validateMonitorForm.ts); el backend tendrá la validación real.
2. Número de fallos consecutivos que abre una incidencia.
3. Comportamiento de una comprobación ya iniciada cuando se pausa el monitor.
4. Fórmula y ventana de la disponibilidad.
5. Las pendientes de docs/architecture.md: sesiones, cliente HTTP, hosting, registro de imágenes, retención y diseño visual.
6. Python 3.13 verificado en local (3.13.7) y en la CI del backend (3.13.18 en Linux).

## Aplicación y controles

Frontend con ESLint, Prettier y CI de GitHub Actions (lint, formato y build) verificada en la PR #7. Backend con Ruff, mypy estricto y pytest, ejecutados en su propia CI (PR #17). Pendientes: PostgreSQL y Alembic, Docker, SonarQube y CD. No hay despliegue verificado.

## Decisiones tomadas

React/TypeScript/Vite; Python/FastAPI; PostgreSQL 18 en Docker Compose con volumen persistente; Node 24; uv para el backend; API y worker separados; GitHub Flow con ramas de integración por área, PR de tarea hacia ellas, PR final a main con commit de merge, y toda PR con al menos tres commits. Selección de plugins y reparto con Codex en docs/tooling.md; disponibilidad real en el equipo sin verificar.

## Siguiente paso

Integrar chore/postgres-compose en feature/database-base. Después, SQLAlchemy y Alembic: Claude configura y verifica contra PostgreSQL real, y Manuel escribe la conexión, el primer modelo Monitor y la primera migración con la explicación de Claude. Antes de crear la tabla, acordar y registrar en docs/decisions/ los límites del intervalo de comprobación.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
