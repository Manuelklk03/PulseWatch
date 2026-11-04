# Roadmap

Cada fase tiene tareas acotadas y condiciones de cierre. No ejecutar todas las fases automáticamente.

## Fase 0 — Directrices

- [ ] Incorporar y revisar este paquete en el repositorio.
- [ ] Confirmar alcance inicial.
- [x] Seleccionar plugins con Claude y documentarlos.
- [ ] Revisar e integrar PR de documentación.

Cierre: documentación revisada en main y punto de continuación actualizado.

## Fase 1 — Base técnica

- [ ] Fijar versiones compatibles y requisitos del entorno.
- [ ] React, TypeScript y Vite.
- [ ] ESLint, Prettier y comprobación de tipos.
- [ ] FastAPI, Ruff, mypy y pytest.
- [ ] PostgreSQL y Alembic.
- [ ] Docker Compose y comprobaciones de salud.
- [ ] CI con pruebas mínimas significativas.
- [ ] SonarQube Cloud, cobertura y Quality Gate comprobado.
- [ ] Protección de main con checks reales.

Cierre: entorno reproducible y controles ejecutados correctamente.

## Fase 2 — Primer recorrido

- [ ] Contratos de monitores y resultados.
- [ ] Validación de destinos y límites.
- [ ] Crear y consultar monitores.
- [ ] Worker separado y persistencia de resultados.
- [ ] Historial desde el frontend.
- [ ] Prueba con servidor HTTP controlado.

Cierre: crear un monitor y consultar resultados desde el navegador, en local.

## Fase 3 — Versión publicable

- [ ] Autenticación y autorización.
- [ ] Gestión completa y pausa de monitores.
- [ ] Incidencias y recuperación.
- [ ] Paginación y retención.
- [ ] Tests de permisos, reglas y seguridad.
- [ ] Responsive, teclado y estados de interfaz.

Cierre: criterios de producto verificados.

## Fase 4 — Despliegue y operación

- [ ] Hosting y registro elegidos.
- [ ] Imágenes identificadas por commit o versión.
- [ ] CD y comprobaciones posteriores al despliegue.
- [ ] Migraciones controladas y recuperación.
- [ ] Copias y restauración probadas.
- [ ] Logs y diagnóstico documentados.
- [ ] Demo, capturas y guía de uso.

Cierre: producto accesible y operación comprobada.

## Fase 5 — Ampliaciones

Equipos, alertas y estado público según prioridades. TaskFlow CLI se iniciará después como proyecto independiente.
