# Estado de PulseWatch

## Actualización

2026-11-21 — Formulario de crear monitores hecho en la rama feature/monitor-form (PR hacia feature/frontend-monitors-ui pendiente de integrar). Con él, el área feature/frontend-monitors-ui queda completa y su PR final hacia main está pendiente.

## Estado comprobado

Repositorio en GitHub con main publicada. Hay documentación y un frontend con pruebas y CI; la pantalla de monitores usa datos de ejemplo provisionales. No existe backend.

Entorno comprobado en el equipo de Manuel: Node 24.21.0, npm 12.1.0, Python 3.14.0 y 3.13, uv 0.13.4, Docker 29.9.2, Compose 5.6.1 y Git 2.51.0. Detalle y decisiones en docs/deployment.md.

## Fase y tarea activa

Fase 1, base técnica. Hecho: versiones del entorno y frontend de esta fase (Vite, TypeScript estricto, ESLint, Prettier, Vitest, CI, estructura por funcionalidades, lista de monitores con los estados de carga, error, vacío y éxito, y formulario accesible de crear monitores, todo sobre datos de ejemplo). Pendiente de la fase: backend (FastAPI, PostgreSQL, Alembic, Ruff, mypy, pytest), Docker Compose, SonarQube con cobertura y protección de main.

## Alcance confirmado

Alcance de docs/product.md aceptado sin cambios: primer recorrido local (Fase 2) y primera versión publicable (Fase 3). Equipos, alertas, estado público y mantenimiento programado quedan como ampliaciones.

## Decisiones abiertas

Se acuerdan y se registran en docs/decisions/ antes de implementarlas:

1. Intervalo mínimo y máximo de comprobación, y timeout máximo. El formulario usa de forma provisional 30 a 3600 segundos (constantes en validateMonitorForm.ts); el backend tendrá la validación real.
2. Número de fallos consecutivos que abre una incidencia.
3. Comportamiento de una comprobación ya iniciada cuando se pausa el monitor.
4. Fórmula y ventana de la disponibilidad.
5. Las pendientes de docs/architecture.md: sesiones, cliente HTTP, hosting, registro de imágenes, retención y diseño visual.
6. Python 3.13 como versión objetivo: verificar con una prueba real al crear el backend.

## Aplicación y controles

Frontend con ESLint, Prettier y CI de GitHub Actions (lint, formato y build) verificada en la PR #7. Pendientes: tests del frontend, backend con Ruff, mypy y pytest, Docker, SonarQube y CD. No hay despliegue verificado.

## Decisiones tomadas

React/TypeScript/Vite; Python/FastAPI; PostgreSQL en Docker; Node 24; uv para el backend; API y worker separados; GitHub Flow con ramas de integración por área, PR de tarea hacia ellas, PR final a main con commit de merge, y toda PR con al menos tres commits. Selección de plugins y reparto con Codex en docs/tooling.md; disponibilidad real en el equipo sin verificar.

## Siguiente paso

Integrar feature/monitor-form en feature/frontend-monitors-ui y abrir la PR final de esa rama hacia main. Después, abrir el área feature/backend-base con FastAPI y uv (Python 3.13 a verificar con una prueba real), empezando por un endpoint de salud con su prueba, que escribirá Manuel con la explicación de Claude.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
