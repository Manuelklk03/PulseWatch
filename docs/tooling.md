# Herramientas y plugins

Selección acordada con Claude el 2026-11-05 a partir de la documentación de la Fase 0. Es una propuesta de uso, no una prueba de instalación: antes de usar una herramienta, el agente comprueba que está disponible.

## Criterios

Cada plugin debe resolver una necesidad concreta. Evitar duplicidades e instrucciones incompatibles. AGENTS.md y el flujo de Git deben respetarse. No copiar configuración global completa, tokens o rutas personales.

## Claude Code: se usan

| Herramienta | Finalidad | Cuándo |
| --- | --- | --- |
| superpowers: brainstorming, writing-plans | Definir y planificar cada tarea acotada | Inicio de tarea |
| superpowers: verification-before-completion | No declarar checks superados sin evidencia | Cierre de tarea |
| superpowers: test-driven-development | Reglas de incidencias, validación de destinos y worker | Fases 2 y 3 |
| superpowers: systematic-debugging | Diagnóstico de fallos reales | Cuando haya un fallo |
| superpowers: finishing-a-development-branch | Cierre de rama; Manuel ejecuta commit, push y PR salvo encargo expreso | Cierre de tarea |
| ponytail | Cambios mínimos, sin funcionalidades ni dependencias no pedidas | Siempre |
| code-review y security-review | Revisión del diff antes de cada PR, en especial controles de destino de docs/security.md | Antes de la PR |
| frontend-stack (router), impeccable, make-interfaces-feel-better | Diseño, accesibilidad y pulido de interfaz | Fase 3 |
| antislop-ui, antislop-code | Apoyo opcional en frontend y código | Opcional |
| Playwright y chrome-devtools-mcp (a11y) | Pruebas e2e y accesibilidad | Desde la Fase 2 |

## Claude Code: no se usan

- Memorias duplicadas (claude-mem, mempalace, notepad y wiki de oh-my-claudecode): la continuidad vive en docs/STATUS.md y Git, no en la memoria del chat.
- Automatización autónoma (oh-my-claudecode autopilot, ralph, team, ultragoal): el roadmap no se ejecuta solo y Manuel integra los cambios.
- caveman: va contra la explicación paso a paso en español de AGENTS.md y el objetivo de aprender.
- supabase y vercel (incluidos nextjs y shadcn): backend FastAPI con PostgreSQL propio, hosting sin elegir hasta la Fase 4, estilos con CSS Modules y BEM.
- gsap, threejs, scroll-world y cinematic-scroll: no hay necesidad real en un panel de monitorización.
- seo, claude-api, taste, ui-ux-pro-max, brand y slides: no aplican a este producto o chocan con las reglas de diseño.

## Codex

Codex lee AGENTS.md por su cuenta. Usos previstos:

- Revisión independiente del diff antes de la PR, en solo lectura.
- Diagnóstico de causa raíz cuando Claude se atasque.
- Trabajo en paralelo solo en otra rama o worktree y en otra carpeta (por ejemplo backend y frontend). Nunca el mismo checkout.

Reglas para Codex: no hace commit ni push, no añade dependencias, informa de las comprobaciones ejecutadas y deja STATUS y CHANGELOG para el cierre.

## Registro por herramienta

Cuando una herramienta se instale o se configure de forma compartida, añadir aquí:

- Nombre, versión cuando sea relevante y finalidad.
- Instalación y comprobación.
- Configuración compartida y configuración personal excluida.
- Permisos necesarios.
- Forma de preparar otro ordenador.

Estado actual: la disponibilidad real de estas herramientas en el equipo de Manuel no está verificada, y la configuración compartida está pendiente.
