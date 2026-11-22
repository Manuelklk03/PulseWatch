# Estado de PulseWatch

## Actualización

2026-11-23 — Área feature/database-base: PostgreSQL (PR #19) y SQLAlchemy con Alembic (PR #20) integrados en la rama. Decisión 0001 de los límites de comprobación registrada. La tarea del primer modelo está preparada en la rama feature/monitor-model, a la espera del código de Manuel.

## Estado comprobado

Repositorio en GitHub con main publicada. Hay documentación y un frontend con pruebas y CI; la pantalla de monitores usa datos de ejemplo provisionales. El backend tiene el endpoint GET /health con sus pruebas y su CI.

Entorno comprobado en el equipo de Manuel: Node 24.21.0, npm 12.1.0, Python 3.14.0 y 3.13, uv 0.13.4, Docker 29.9.2, Compose 5.6.1 y Git 2.51.0. Detalle y decisiones en docs/deployment.md.

## Fase y tarea activa

Fase 1, base técnica. Hecho: versiones del entorno y frontend de esta fase (Vite, TypeScript estricto, ESLint, Prettier, Vitest, CI, estructura por funcionalidades, lista de monitores con los estados de carga, error, vacío y éxito, y formulario accesible de crear monitores, todo sobre datos de ejemplo). Backend: proyecto con uv, endpoint de salud, pruebas y CI hechos. PostgreSQL 18 en Docker Compose ya funciona en local. SQLAlchemy, Alembic y psycopg instalados y Alembic configurado, sin modelos ni migraciones todavía. Pendiente de la fase: primer modelo y primera migración, el resto de Docker Compose, Docker Compose, SonarQube con cobertura y protección de main.

## Alcance confirmado

Alcance de docs/product.md aceptado sin cambios: primer recorrido local (Fase 2) y primera versión publicable (Fase 3). Equipos, alertas, estado público y mantenimiento programado quedan como ampliaciones.

## Decisiones abiertas

Se acuerdan y se registran en docs/decisions/ antes de implementarlas:

1. Resuelta el 2026-11-23: intervalo de 30 a 3600 s y timeout de 1 a 30 s, con 10 s por defecto (docs/decisions/0001-limites-de-comprobacion.md). El frontend aún no tiene el campo de timeout.
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

Manuel escribe, con la explicación de Claude, la base declarativa, el motor, el modelo Monitor y sus pruebas contra PostgreSQL en la rama feature/monitor-model. Claude genera la migración con él y añade a la CI un PostgreSQL de servicio. Al terminar, PR hacia feature/database-base y después PR final del área hacia main.

## Cómo actualizar

Registrar fecha, objetivo, rama y commit consultados, cambios pendientes, comandos y resultados reales, bloqueos y siguiente acción concreta. Distinguir preparado, aplicado, verificado y publicado. Reemplazar información obsoleta; el historial pertenece a Git, PR y CHANGELOG.
