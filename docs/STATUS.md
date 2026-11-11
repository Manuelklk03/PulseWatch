# Estado de PulseWatch

## Actualización

2026-11-11 — Frontend base (PR #4), regla de commits sin firmas (PR #5) y selección de skills con reparto para Codex (PR #6) integrados en main. CI del frontend preparada por Codex en la rama chore/frontend-ci, PR pendiente de integrar. La estructura del frontend está empezada en feature/frontend-structure.

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

Frontend base con ESLint, Prettier y CI de GitHub Actions (lint, formato y build); la CI se verifica en la propia PR. Pendientes: tests del frontend, backend con Ruff, mypy y pytest, Docker, SonarQube y CD. No hay despliegue verificado.

## Decisiones tomadas

React/TypeScript/Vite; Python/FastAPI; PostgreSQL en Docker; Node 24; uv para el backend; API y worker separados; GitHub Flow con commit de merge y PR de al menos tres commits. Selección de plugins y reparto con Codex en docs/tooling.md; disponibilidad real en el equipo sin verificar.

## Siguiente paso

Integrar la PR chore/frontend-ci con merge commit. Después, montar la estructura del frontend en feature/frontend-structure con Manuel escribiendo el código en modo guiado, un archivo cada vez: global.css, App.module.css, App.tsx, main.tsx y la pantalla de monitores con su estado vacío.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
