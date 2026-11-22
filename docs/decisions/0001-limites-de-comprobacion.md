# 0001 — Límites del intervalo y del timeout de las comprobaciones

Fecha: 2026-11-23
Estado: aceptada

## Problema

docs/product.md pide "HTTP GET con intervalo y timeout limitados" y docs/security.md exige "timeout, tamaño máximo, concurrencia e intervalos limitados", pero ningún documento fija los valores. Hacen falta antes de crear la tabla de monitores, porque la base de datos los aplicará como restricciones. El frontend ya validaba el intervalo con 30 a 3600 s de forma provisional.

Restricciones: un intervalo muy corto aumenta la carga del worker y de los servicios monitorizados; un intervalo muy largo retrasa la detección de caídas; un timeout largo bloquea al worker.

## Opciones

Intervalo de comprobación:

- 30 a 3600 s: coincide con lo que ya valida el frontend.
- 60 a 86400 s: más conservador con los destinos y permite comprobaciones diarias; obliga a cambiar el frontend.
- 10 a 3600 s: comprobaciones muy frecuentes, con más carga y más riesgo de abuso.

Timeout: incluirlo ya en el modelo con un valor por defecto, o añadirlo con otra migración cuando se implemente el worker.

## Decisión

Confirmada por Manuel el 2026-11-23:

- Intervalo de comprobación: de 30 a 3600 segundos.
- Timeout de cada comprobación: de 1 a 30 segundos, con 10 segundos por defecto, incluido ya en el modelo.

## Consecuencias

- La tabla monitors lleva dos restricciones CHECK con esos rangos, y el backend es quien las aplica de verdad. El frontend las repite solo como ayuda a quien rellena el formulario.
- Los valores existen en tres sitios: la base de datos, las constantes del backend y las del frontend (validateMonitorForm.ts). Si cambian, hay que cambiar los tres.
- El frontend todavía no tiene el campo de timeout. Se añadirá cuando se conecte con la API.
- Alembic no compara las restricciones CHECK al autogenerar migraciones: estos límites los protegen las pruebas, no `alembic check`.
- Los límites del timeout y del intervalo no sustituyen los controles de destino, tamaño máximo y concurrencia de docs/security.md, que siguen pendientes.

## Verificación

Pendiente de implementar: pruebas contra PostgreSQL que comprueben el rechazo de los valores justo fuera de los límites (29 y 3601 s de intervalo, 0 y 31 s de timeout) y la aceptación de los valores en los propios límites.
