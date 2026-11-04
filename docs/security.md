# Seguridad

## Riesgo principal

El servidor consulta URLs aportadas por usuarios. Debe impedir acceso a redes internas, metadatos y destinos no permitidos, además de limitar abuso contra servicios externos.

## Controles desde el primer monitor

- Solo HTTP/HTTPS y puertos acordados.
- Rechazar credenciales en URL.
- Resolver y validar IPv4 e IPv6; bloquear loopback, redes privadas, link-local, direcciones reservadas y metadatos.
- Vincular la validación al destino real de conexión; evitar cambios DNS entre comprobar y conectar.
- Redirecciones desactivadas inicialmente; si se habilitan, validar cada salto.
- Timeout, tamaño máximo, concurrencia e intervalos limitados.
- Verificación TLS activa.
- Sin scripts ni cabeceras arbitrarias al principio.
- Restricciones de salida de red adicionales cuando el hosting lo permita.

Validar solo el texto de una URL no es suficiente. Los servicios de pruebas internos deben usar una configuración aislada y nunca una excepción permisiva compartida con producción.

## Usuarios y datos

Autorización por recurso; contraseñas con hash adecuado; sesión, cookies y CSRF según arquitectura elegida; límites de intentos y operaciones. No registrar tokens, contraseñas o URLs sensibles completas. Separar desarrollo, pruebas y producción.

## Verificación

Tests de controles y permisos, revisión de hallazgos y riesgos pendientes antes de publicar. Definir reglas de retención y eliminación del historial.
