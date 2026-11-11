# Estado de PulseWatch

## Actualización

2026-11-11 — Frontend base integrado en main (PR #4) y regla de commits sin firmas automáticas (PR #5). Selección de skills y reparto con Codex revisados en docs/tooling.md (rama docs/skills-selection, PR pendiente de integrar). La limpieza de la plantilla de Vite está empezada pero sin commitear: rama feature/frontend-structure, cambios guardados en el stash "frontend-structure-wip".

## Estado comprobado

Repositorio en GitHub con main publicada. Solo hay documentación; no existe código de aplicación.

Entorno comprobado en el equipo de Manuel: Node 24.21.0, npm 12.1.0, Python 3.14.0 y 3.13, uv 0.13.4, Docker 29.9.2, Compose 5.6.1 y Git 2.51.0. Detalle y decisiones en docs/deployment.md.

## Fase y tarea activa

Fase 1, base técnica. Hecho: versiones del entorno, y proyecto base del frontend con React, TypeScript estricto, Vite, ESLint y Prettier. Pendiente del frontend: sustituir la pantalla de ejemplo de Vite por la estructura de PulseWatch (carpetas por funcionalidades y CSS Modules con BEM) y Vitest con Testing Library.

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

Integrar la PR docs/skills-selection. Después, volver a feature/frontend-structure (git stash pop) y montar la estructura del frontend con Manuel escribiendo el código en modo guiado, un archivo cada vez: global.css, App.module.css, App.tsx, main.tsx y la pantalla de monitores con su estado vacío.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
