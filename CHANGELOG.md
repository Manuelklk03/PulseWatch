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
- Pantalla de monitores con cabecera accesible y estado vacío reutilizable (EmptyState).
- Fin de línea LF en todo el repositorio con .gitattributes.

La incorporación a un repositorio y la configuración técnica todavía están pendientes.
