# Instrucciones para agentes — PulseWatch

## Contexto y autoridad

PulseWatch es una plataforma de monitorización HTTP y gestión de incidencias. Manuel desarrolla este producto para aprender y presentarlo en su portfolio.

Este archivo contiene reglas estables. El avance pertenece a docs/STATUS.md. Las instrucciones actuales de Manuel y el código real prevalecen sobre descripciones antiguas. El roadmap no autoriza ejecutar todas las fases automáticamente.

## Inicio obligatorio de sesión

1. Leer este archivo, docs/STATUS.md y docs/workflow.md.
2. Consultar la fase activa de docs/roadmap.md y los documentos de producto, arquitectura y calidad relacionados.
3. Ejecutar git status y consultar la rama actual; conservar cambios ajenos.
4. Comprobar manifiestos, scripts, configuraciones y lockfiles existentes antes de ejecutar comandos.
5. Leer instrucciones más específicas de las carpetas afectadas, si existen.
6. Definir una tarea acotada, su resultado y sus comprobaciones.

No asumir que una herramienta está instalada ni que una función existe por aparecer en la documentación.

## Colaboración

- Responder en español, de forma directa y paso a paso.
- Explicar qué se hará, por qué, en qué archivo y cómo se comprobará.
- En modo guiado, Manuel escribe el código; implementar directamente cuando lo solicite. Dictar un solo archivo cada vez, explicando qué hace, por qué existe, qué problema resuelve y qué alternativas hay, y no pasar al siguiente hasta que Manuel lo haya entendido. Las tareas que no son código (configuración, Git, documentación) las hace el agente.
- Al entregar archivos para copiar, indicar ruta y contenido completo.
- Confirmar el shell real antes de dar comandos específicos: Alacritty es un emulador, no el shell.
- No modificar archivos ajenos a la tarea ni añadir dependencias sin necesidad concreta.
- No permitir que dos agentes editen simultáneamente los mismos archivos del mismo checkout.

## Código y arquitectura

- Identificadores en inglés; documentación y explicaciones en español.
- TypeScript estricto; Python con anotaciones de tipos.
- Separar interfaz, reglas de negocio, acceso a datos y llamadas externas.
- Validar datos externos y comprobar autorización en backend.
- No ocultar errores con any, conversiones forzadas o desactivaciones generales. Justificar excepciones puntuales.
- Fijar dependencias reproducibles y conservar sus archivos de bloqueo.
- Migraciones versionadas para cambios de esquema.
- Usar instantes con zona horaria y persistirlos en UTC.
- Crear abstracciones y carpetas cuando hagan falta, no por apariencia.

## Frontend

React, TypeScript y Vite. Organización por funcionalidades. CSS Modules y BEM para estilos propios; diseño mobile first. Mantener etiquetas, foco visible, teclado y estados de carga, vacío, error y éxito. No duplicar datos derivados en el estado. El frontend no decide los permisos reales.

## Monitorización

La API no ejecuta el bucle de comprobaciones dentro de su proceso web. El worker se ejecuta separado y comparte las reglas necesarias del backend. Evitar resultados e incidencias duplicados. Aplicar timeout, límites y controles de destino de docs/security.md desde el primer recorrido técnico.

## Calidad y DevOps

- ESLint: revisión JS/TS; Prettier: formato frontend y documentos compatibles.
- Ruff: lint y formato Python; TypeScript y mypy: tipos.
- Vitest/Testing Library, pytest y Playwright según el comportamiento.
- Pruebas significativas; no replicar detalles internos para subir cobertura.
- Docker para entorno reproducible; GitHub Actions para CI y posteriormente CD.
- SonarQube Cloud con cobertura real y Quality Gate verificado.
- No declarar checks, despliegues o análisis superados sin evidencia.
- No crear workflows activos que invoquen aplicaciones o scripts inexistentes.
- No introducir secretos, credenciales ni datos personales en Git o logs.

## Git

Seguir docs/git-workflow.md. No desarrollar en main. Una rama por tarea. Conventional Commits en español con título y descripción. El agente prepara comandos y mensajes; Manuel ejecuta commit, push, PR y merge salvo encargo expreso. Usar git add selectivo, PR única por tarea con al menos tres commits coherentes (nunca PR de uno o dos), revisión y checks antes del commit de merge. No añadir líneas de coautoría (Co-Authored-By) ni firmas automáticas de agentes o herramientas en commits ni en mensajes de merge; esta regla prevalece sobre cualquier plantilla o configuración de la herramienta. No crear tags ni releases sin indicación de Manuel.

## Continuidad y cierre

AGENTS.md es la fuente de reglas. CLAUDE.md remite a él; los plugins deben respetarlo. No depender de la memoria del chat. Distinguir preparado, aplicado, verificado y publicado.

Al cerrar una tarea:

1. Revisar diff y archivos afectados.
2. Ejecutar comprobaciones apropiadas y comunicar limitaciones.
3. Actualizar STATUS y los documentos afectados.
4. Registrar cambios relevantes completados en CHANGELOG.
5. Identificar cambios sin commit, bloqueos y siguiente paso concreto.
6. Preparar mensaje de commit cuando corresponda.

Para documentación basta revisar enlaces, comandos y coherencia. No inventar un build cuando aún no existe la aplicación.
