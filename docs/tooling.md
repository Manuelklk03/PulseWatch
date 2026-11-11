# Herramientas y plugins

Selección acordada con Claude. Revisada el 2026-11-11 con los plugins instalados en el equipo de Manuel (lista de `installed_plugins.json` y carpetas de skills de Claude Code y Codex). Que una herramienta esté instalada no prueba que funcione bien en este proyecto: el agente comprueba su disponibilidad antes de usarla.

## Criterios

Cada plugin debe resolver una necesidad concreta. Evitar duplicidades e instrucciones incompatibles. AGENTS.md y el flujo de Git deben respetarse. No copiar configuración global completa, tokens o rutas personales. Antes de instalar una skill nueva, revisarla con skill-inspector.

## Claude Code: se usan ahora (Fase 1)

| Herramienta | Finalidad |
| --- | --- |
| superpowers: brainstorming y writing-plans | Definir y planificar cada tarea acotada. |
| superpowers: verification-before-completion | No declarar checks superados sin evidencia. |
| superpowers: systematic-debugging | Diagnóstico de fallos reales, por ejemplo conflictos de dependencias. |
| ponytail | Cambios mínimos, sin funcionalidades ni dependencias no pedidas. |
| code-review | Revisión del diff antes de cada PR. |
| skill-inspector | Revisar una skill o plugin antes de instalarlo. |
| grill-me | Preguntas para comprobar que Manuel entiende el código escrito. |

## Claude Code: se usan más adelante

| Herramienta | Cuándo | Finalidad |
| --- | --- | --- |
| superpowers: test-driven-development | Fases 2 y 3 | Reglas de incidencias, validación de destinos, umbrales y worker. |
| security-audit | Fase 2 (controles de destino) y antes de publicar (Fase 4) | Revisión de seguridad acotada a los controles de docs/security.md. Auditoría completa solo si Manuel la pide. |
| security-review | Antes de cada PR que toque autenticación, destinos o permisos | Revisión del diff. |
| frontend-stack (router) con impeccable y make-interfaces-feel-better | Fase 3 | Diseño, accesibilidad y pulido de la interfaz. |
| unslop | Fase 3, solo a través del router frontend-stack | Quitar aspecto genérico de la interfaz. No aplicar a la vez que otra skill de estética. |
| antislop (ui y code) | Fase 3, opcional | Apoyo en frontend y código. |
| chrome-devtools-mcp (a11y) | Desde la Fase 2 | Accesibilidad y diagnóstico en navegador. |
| superpowers: finishing-a-development-branch | Cierre de rama | Se adapta al flujo de docs/git-workflow.md. |

## Claude Code: no se usan

- Memorias duplicadas (claude-mem, mempalace, notepad y wiki de oh-my-claudecode, headroom): la continuidad vive en docs/STATUS.md y Git, no en la memoria del chat.
- Automatización autónoma (oh-my-claudecode autopilot, ralph, team, ultragoal): el roadmap no se ejecuta solo y las PR siguen docs/git-workflow.md.
- caveman: reduce las explicaciones, y AGENTS.md pide explicar paso a paso en español.
- supabase y vercel (incluidos nextjs y shadcn): backend FastAPI con PostgreSQL propio, hosting sin elegir hasta la Fase 4, estilos con CSS Modules y BEM.
- gsap, threejs, scroll-world, cinematic-scroll, lemo-opuscar e imagegen: sin necesidad real en un panel de monitorización.
- claude-seo, ai-seo, taste, ui-ux-pro-max, brand, slides y claude-api: no aplican a este producto o chocan con las reglas de diseño.
- agent-reach: lectura de redes sociales; sin uso en el proyecto.
- cli-anything y claude-code-setup: sin necesidad por ahora.

## Codex

Codex 0.164.0 está instalado y lee AGENTS.md. Su configuración personal pide un estilo de mentor: un archivo cada vez, explicado, sin avanzar hasta entenderlo. Es compatible con el modo guiado de este proyecto.

Skills de Codex (carpeta de skills de Codex):

| Skill | Decisión |
| --- | --- |
| codebase-design | Usar ya: revisar estructura de carpetas, capas y responsabilidades del frontend y del backend. |
| frontend-design | Fase 3. No usarla a la vez que frontend-stack de Claude sobre la misma interfaz. |
| gsap, threejs, scroll-world, cinematic-scroll y scroll-scrubbed | No usar. |

Plugins de Codex activos en su configuración:

| Plugin | Decisión |
| --- | --- |
| coderabbit | Candidato a revisión de PR. Verificar que funciona y su coste antes de depender de él. |
| github | Solo lectura. Codex no hace push, PR ni merge. |
| browser y computer-use | Desde la Fase 2, para comprobar flujos en navegador. |
| documents, spreadsheets, presentations, pdf, template-creator, codex-app-tools y visualize | No usar. |

### Reparto de trabajo

| Tarea | Responsable |
| --- | --- |
| Planificar, guiar el código y explicarlo paso a paso | Claude |
| Escribir el código de aplicación (modo guiado) | Manuel |
| Configuración, Git, PR y merge | Claude, con autorización de Manuel |
| Revisión independiente del diff antes de la PR, en solo lectura | Codex |
| Diagnóstico de causa raíz cuando Claude se atasque | Codex |
| Configuración que no toca el código de Manuel (por ejemplo CI del frontend) | Codex, en otra rama o worktree |

Reglas: un solo agente escribe en un checkout a la vez. Codex trabaja en un worktree aparte, no hace commit ni push, no añade firmas ni líneas de coautoría en los mensajes, no añade dependencias, informa de las comprobaciones que ejecutó y deja STATUS y CHANGELOG para el cierre. Claude revisa su diff antes de integrarlo.

## Registro por herramienta

Cuando una herramienta se instale o se configure de forma compartida, añadir aquí:

- Nombre, versión cuando sea relevante y finalidad.
- Instalación y comprobación.
- Configuración compartida y configuración personal excluida.
- Permisos necesarios.
- Forma de preparar otro ordenador.

Estado actual: las herramientas están instaladas en el equipo de Manuel, pero no se ha verificado su funcionamiento en este proyecto. La configuración compartida está pendiente.
