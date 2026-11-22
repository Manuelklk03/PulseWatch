# Changelog

Cambios completados, no planes futuros. Estos últimos pertenecen al roadmap.

## Sin publicar

### Documentación

- Paquete documental inicial de producto, arquitectura, estado y continuidad entre agentes.
- Reglas de GitHub Flow y plan de calidad, pruebas, DevSecOps y despliegue.

- Selección de herramientas y plugins para Claude Code y reparto de tareas con Codex en docs/tooling.md.
- Alcance inicial confirmado y decisiones abiertas registradas en docs/STATUS.md.
- Regla de GitHub Flow: cada PR contiene al menos tres commits coherentes.
- README reescrito para presentar el proyecto, su arquitectura y su seguridad.
- Requisitos y versiones del entorno de desarrollo en docs/deployment.md.
- Decisión de TypeScript 6.0, aviso de dependencias de desarrollo y scripts del frontend en docs/deployment.md y docs/quality.md.

- Regla de GitHub Flow: commits y merges sin líneas de coautoría ni firmas automáticas.
- Skills de Claude Code y Codex clasificadas por fase, y reparto de trabajo entre ambos, en docs/tooling.md.
- Regla de modo guiado: pasos con varios archivos relacionados, cada uno explicado, y las tareas que no son código las hace el agente.
- Flujo de Git con ramas de integración por área, PR de tarea hacia ellas y PR final a main; la regla de tres commits vale para toda PR y la CI se ejecuta en PR hacia cualquier rama.

### Frontend

- Proyecto base en frontend/ con React, TypeScript estricto y Vite.
- ESLint y Prettier integrados, con los scripts lint, format y format:check.
- CI de GitHub Actions del frontend (lint, formato y build), preparada por Codex y revisada por Claude.
- Estructura por funcionalidades (app, features, shared), CSS Modules con BEM, variables CSS y foco visible.
- Lista de monitores con los estados de carga, error con reintento, vacío y éxito, sobre datos de ejemplo provisionales aislados en monitorsApi.ts.
- Componentes MonitorCard y MonitorList, y hook useMonitors; cada componente en su propia carpeta.
- Formulario accesible de crear monitores: campos controlados con etiquetas asociadas, aria-invalid y aria-describedby, foco al primer error y sin doble envío.
- Validación del formulario como lógica pura (nombre, dirección http o https sin credenciales e intervalo), con límites provisionales de 30 a 3600 segundos.
- Estado pending (Pendiente) para monitores aún no comprobados.
- Fin de línea LF en todo el repositorio con .gitattributes.
- Vitest, jsdom y Testing Library configurados, con los scripts test y test:watch.
- Pruebas de EmptyState, MonitorCard, MonitorForm, MonitorsPage y la validación (31 en total) ejecutadas en la CI del frontend, con user-event para simular la interacción.

### Backend

- Proyecto en backend/ con uv, Python 3.13 y FastAPI, con uv.lock para instalaciones reproducibles.
- Ruff, mypy en modo estricto y pytest configurados y verificados con una ejecución real; pruebas con httpx2.
- Endpoint GET /health con modelo de respuesta de Pydantic, factoría create_app y dos pruebas.
- CI del backend (uv sync --locked, Ruff, mypy y pytest) con la acción setup-uv fijada por SHA, verificada con Python 3.13 en GitHub.

### Entorno local

- compose.yaml con PostgreSQL 18, volumen persistente, comprobación de salud y puerto publicado solo en 127.0.0.1:5433.
- .env.example con valores ficticios; el archivo .env queda fuera de Git y Compose avisa si falta alguna variable.

La incorporación a un repositorio y la configuración técnica todavía están pendientes.
