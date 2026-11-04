# Estado de PulseWatch

## Actualización

2026-11-05 — Fase 0 cerrada con las PR #1 y #2 integradas en main. Fase 1 iniciada: requisitos del entorno documentados (rama docs/dev-environment, PR pendiente de integrar).

## Estado comprobado

Repositorio en GitHub con main publicada. Solo hay documentación; no existe código de aplicación.

Entorno comprobado en el equipo de Manuel: Node 24.21.0, npm 12.1.0, Python 3.14.0 y 3.13, uv 0.13.4, Docker 29.9.2, Compose 5.6.1 y Git 2.51.0. Detalle y decisiones en docs/deployment.md.

## Fase y tarea activa

Fase 1, base técnica. Hecho: versiones y requisitos del entorno. Siguiente tarea: frontend con React, TypeScript y Vite.

## Alcance confirmado

Alcance de docs/product.md aceptado sin cambios: primer recorrido local (Fase 2) y primera versión publicable (Fase 3). Equipos, alertas, estado público y mantenimiento programado quedan como ampliaciones.

## Decisiones abiertas

Se acuerdan y se registran en docs/decisions/ antes de implementarlas:

1. Intervalo mínimo y máximo de comprobación, y timeout máximo.
2. Número de fallos consecutivos que abre una incidencia.
3. Comportamiento de una comprobación ya iniciada cuando se pausa el monitor.
4. Fórmula y ventana de la disponibilidad.
5. Las pendientes de docs/architecture.md: sesiones, cliente HTTP, hosting, registro de imágenes, retención y diseño visual.
6. Python 3.13 como versión objetivo: verificar con una prueba real al crear el backend.

## Aplicación y controles

Sin código de aplicación. ESLint, Prettier, Ruff, mypy, tests, Docker, Actions, SonarQube y CD pendientes. No hay despliegue verificado.

## Decisiones tomadas

React/TypeScript/Vite; Python/FastAPI; PostgreSQL en Docker; Node 24; uv para el backend; API y worker separados; GitHub Flow con commit de merge y PR de al menos tres commits. Selección de plugins y reparto con Codex en docs/tooling.md; disponibilidad real en el equipo sin verificar.

## Siguiente paso

Integrar la PR docs/dev-environment con merge commit. Después, crear el frontend con Vite en una rama feature/frontend-scaffold, con Manuel escribiendo el código en modo guiado.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
