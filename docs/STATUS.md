# Estado de PulseWatch

## Actualización

2026-11-14 — Historial de main limpiado (sin merges de main dentro de ramas) y área feature/frontend-testing abierta. Vitest configurado en la rama chore/vitest-setup, PR hacia feature/frontend-testing pendiente de integrar.

## Estado comprobado

Repositorio en GitHub con main publicada. Hay documentación y un frontend con una pantalla de monitores en estado vacío; no existe backend ni tests.

Entorno comprobado en el equipo de Manuel: Node 24.21.0, npm 12.1.0, Python 3.14.0 y 3.13, uv 0.13.4, Docker 29.9.2, Compose 5.6.1 y Git 2.51.0. Detalle y decisiones en docs/deployment.md.

## Fase y tarea activa

Fase 1, base técnica. Hecho: versiones del entorno, frontend con React, TypeScript estricto, Vite, ESLint, Prettier, CI, estructura por funcionalidades (app, features, shared) con CSS Modules y BEM, y Vitest con Testing Library configurado. Pendiente del frontend: primeras pruebas y su paso en la CI. Después, el backend.

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

React/TypeScript/Vite; Python/FastAPI; PostgreSQL en Docker; Node 24; uv para el backend; API y worker separados; GitHub Flow con ramas de integración por área, PR de tarea hacia ellas, PR final a main con commit de merge, y toda PR con al menos tres commits. Selección de plugins y reparto con Codex en docs/tooling.md; disponibilidad real en el equipo sin verificar.

## Siguiente paso

Integrar la PR chore/vitest-setup hacia feature/frontend-testing. Después, las tareas test/empty-state (primera prueba, con el paso npm test en la CI) y test/monitors-page; las pruebas las escribe Manuel con la explicación de Claude. Al terminar, PR final hacia main.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
