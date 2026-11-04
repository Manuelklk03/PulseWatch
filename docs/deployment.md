# Entorno, Docker y despliegue

## Estado

Pendiente. No hay hosting, registro ni comandos de arranque verificados.

## Local

Compose tendrá frontend, API, worker y PostgreSQL. Al implementarlo, documentar versiones, puertos, variables, migraciones, datos de ejemplo, salud, arranque, parada y diagnóstico. Diferenciar configuración de desarrollo y producción.

.env.example contiene valores ficticios. Los secretos locales se excluyen de Git. PostgreSQL dispone de volumen persistente. Borrar volúmenes requiere advertir la pérdida real de datos y autorización correspondiente.

## CD

1. Validar el commit integrado.
2. Construir imágenes identificadas por commit o versión.
3. Publicar en el registro elegido.
4. Desplegar las mismas imágenes comprobadas.
5. Aplicar migraciones de forma controlada y una sola vez.
6. Comprobar salud y recorrido básico.
7. Registrar versión, resultado y vía de recuperación.

Definir eventos y entornos antes de activar CD. Evitar despliegues simultáneos al mismo entorno. Proteger secretos y credenciales. Elegir automatización acorde a las capacidades y coste del hosting.

## Operación

Logs estructurados sin secretos, identificadores para diagnóstico, salud de API y worker, control del atraso de comprobaciones y retención de resultados.

Antes de publicar: probar copia y restauración, reinicios y recuperación. Documentar cómo volver a una imagen anterior compatible. Un rollback de imagen no revierte automáticamente una migración: los datos necesitan un plan específico.
