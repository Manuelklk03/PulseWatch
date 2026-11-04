# Producto y alcance

## Problema y usuarios

Un desarrollador o equipo necesita saber si sus servicios HTTP funcionan, cuándo fallan y cuánto duran sus incidencias. Un visitante podrá consultar una página pública de estado en una fase posterior.

## Primer recorrido técnico

Registrar un monitor, ejecutar comprobaciones periódicas y mostrar resultados en la web. Funciona en local con datos de desarrollo. No exponerlo públicamente sin autenticación y controles de seguridad.

## Primera versión publicable

- Registro, inicio y cierre de sesión.
- Monitores propiedad de un usuario.
- Crear, consultar, editar, pausar y eliminar monitores.
- HTTP GET con intervalo y timeout limitados.
- Historial y tiempos de respuesta.
- Apertura de incidencia tras varios fallos consecutivos.
- Cierre al recuperarse el servicio.
- Interfaz responsive, demo y documentación.

Los umbrales exactos se acuerdan y documentan antes de implementarlos.

## Criterios de aceptación

- Un usuario no accede a monitores ajenos, ni mediante IDs manipulados.
- Un monitor pausado no inicia comprobaciones nuevas; definir qué ocurre con una ya iniciada.
- Un timeout registra un resultado fallido.
- Una caída no crea varias incidencias abiertas para el mismo monitor.
- La recuperación registra su fecha y duración correspondiente.
- La disponibilidad distingue resultados fallidos de periodos sin datos; documentar fórmula y ventana.
- Se rechazan destinos internos o prohibidos.
- Las pruebas no dependen de webs públicas.

## Ampliaciones

Equipos y roles, alertas por correo y webhook, página pública de estado, mantenimiento programado, informes y políticas de recuperación.

## Fuera del alcance inicial

Scripts de usuarios, monitorización multirregión, facturación y clon completo de una plataforma comercial.
