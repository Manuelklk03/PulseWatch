# Estado de PulseWatch

## Actualización

2026-11-14 — Frontend base (PR #4), regla de commits sin firmas (PR #5), selección de skills con reparto para Codex (PR #6) y CI del frontend (PR #7) integrados en main. Estructura del frontend y pantalla de monitores con estado vacío hechas en la rama feature/frontend-structure, PR pendiente de integrar.

## Estado comprobado

Repositorio en GitHub con main publicada. Solo hay documentación; no existe código de aplicación.

Entorno comprobado en el equipo de Manuel: Node 24.21.0, npm 12.1.0, Python 3.14.0 y 3.13, uv 0.13.4, Docker 29.9.2, Compose 5.6.1 y Git 2.51.0. Detalle y decisiones en docs/deployment.md.

## Fase y tarea activa

Fase 1, base técnica. Hecho: versiones del entorno, frontend con React, TypeScript estricto, Vite, ESLint, Prettier, CI y estructura por funcionalidades (app, features, shared) con CSS Modules y BEM. Pendiente del frontend: Vitest con Testing Library. Después, el backend.

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

Frontend con ESLint, Prettier y CI de GitHub Actions (lint, formato y build) verificada en la PR #7. Pendientes: tests del frontend, backend con Ruff, mypy y pytest, Docker, SonarQube y CD. No hay despliegue verificado.

## Decisiones tomadas

React/TypeScript/Vite; Python/FastAPI; PostgreSQL en Docker; Node 24; uv para el backend; API y worker separados; GitHub Flow con commit de merge y PR de al menos tres commits. Selección de plugins y reparto con Codex en docs/tooling.md; disponibilidad real en el equipo sin verificar.

## Siguiente paso

Integrar la PR feature/frontend-structure con merge commit. Después, Vitest y Testing Library en el frontend (primera prueba: EmptyState), en bloque de varios archivos guiado por Claude.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
