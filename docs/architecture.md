# Arquitectura

## Base elegida

Un repositorio con frontend y backend. API y worker comparten el código necesario del backend, pero se ejecutan separados. Primera versión sin microservicios ni cola externa obligatoria.

## Estructura prevista

| Ruta | Responsabilidad |
| --- | --- |
| frontend/ | React, TypeScript y Vite |
| backend/ | FastAPI, dominio, persistencia, worker y pruebas |
| docs/ | Documentación y decisiones |
| .github/ | Plantillas y workflows reales cuando existan |
| compose.yaml | Entorno local cuando se implemente |

Las carpetas y archivos de aplicación se crean al inicializarlos.

## Responsabilidades

Frontend: presentación, navegación, formularios y API; nunca acceso directo a PostgreSQL.

API: entradas HTTP, autenticación, autorización y gestión de recursos. Sin bucle de monitorización dentro del servidor web.

Worker: selecciona monitores pendientes, comprueba destinos y persiste resultados e incidencias. Inicialmente un solo worker. Varios workers exigirán coordinación y exclusión explícitas.

PostgreSQL: persistencia, integridad y restricciones. SQLAlchemy para acceso y Alembic para migraciones.

## Modelo previsto

User, Monitor, CheckResult e Incident. Teams y Memberships llegan después.

## Reglas

- Separar rutas HTTP, lógica de negocio y persistencia.
- Centralizar cliente HTTP y controles de seguridad.
- Transacciones y restricciones para evitar estados incompatibles.
- Definir contratos, paginación y retención antes de publicar.
- Guardar instantes en UTC y definir la presentación local.
- Documentar política de programación, reintentos y recuperación tras reiniciar el worker.
- No almacenar cuerpos de respuestas externas sin necesidad explícita.

## Decisiones pendientes

Sesiones y protección asociada, umbrales, cliente HTTP, hosting, registro de imágenes, retención y diseño visual. Registrar decisiones importantes en docs/decisions/.
