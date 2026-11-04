# Estado de PulseWatch

## Actualización

2026-11-05 — alcance inicial confirmado, README reescrito y regla de PR de al menos tres commits documentada (rama docs/confirm-scope, PR pendiente de integrar). La PR #1 (herramientas) ya está integrada en main.

## Estado comprobado

Repositorio en GitHub con main publicada. Solo hay documentación; no existe código de aplicación.

## Fase y tarea activa

Fase 0, a falta de integrar la PR docs/confirm-scope. Con ella integrada, la Fase 0 queda cerrada.

## Alcance confirmado

Alcance de docs/product.md aceptado sin cambios: primer recorrido local (Fase 2) y primera versión publicable (Fase 3). Equipos, alertas, estado público y mantenimiento programado quedan como ampliaciones.

## Decisiones abiertas

Se acuerdan y se registran en docs/decisions/ antes de implementarlas:

1. Intervalo mínimo y máximo de comprobación, y timeout máximo.
2. Número de fallos consecutivos que abre una incidencia.
3. Comportamiento de una comprobación ya iniciada cuando se pausa el monitor.
4. Fórmula y ventana de la disponibilidad.
5. Las pendientes de docs/architecture.md: sesiones, cliente HTTP, hosting, registro de imágenes, retención y diseño visual.

## Aplicación y controles

Sin código de aplicación. ESLint, Prettier, Ruff, mypy, tests, Docker, Actions, SonarQube y CD pendientes. No hay despliegue verificado.

## Decisiones tomadas

React/TypeScript/Vite; Python/FastAPI; PostgreSQL; API y worker separados; GitHub Flow con commit de merge y PR de al menos tres commits. Selección de plugins y reparto con Codex en docs/tooling.md; disponibilidad real en el equipo sin verificar.

## Siguiente paso

Integrar la PR docs/confirm-scope con merge commit. Después, planificar la Fase 1: fijar versiones compatibles y requisitos del entorno, empezando por una tarea acotada (por ejemplo, frontend con Vite).

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
