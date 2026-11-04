# PulseWatch

Plataforma de monitorización de webs y APIs con gestión de incidencias.

PulseWatch permitirá registrar servicios HTTP, comprobar periódicamente su disponibilidad, consultar tiempos de respuesta y seguir incidencias desde una interfaz web.

## Estado

Fase 0: documentación preparada. La aplicación, los tests, Docker, CI/CD y SonarQube todavía no están implementados. No existe una demo pública verificada.

Empieza por [EMPEZAR.md](EMPEZAR.md). El punto de continuación está en [docs/STATUS.md](docs/STATUS.md).

## Objetivo

Crear un producto de portfolio completo y aprender a desarrollar, probar, desplegar y operar una aplicación. Primero se terminará una versión publicable de PulseWatch. TaskFlow CLI será un proyecto posterior independiente.

## Funcionalidades previstas

- Monitores HTTP con historial y tiempos de respuesta.
- Comprobaciones periódicas desde un proceso separado.
- Detección de caídas y recuperación, sin incidencias duplicadas.
- Usuarios y permisos; equipos en una ampliación posterior.
- Alertas y página pública de estado en fases posteriores.

## Base técnica elegida

| Parte | Tecnología |
| --- | --- |
| Frontend | React, TypeScript y Vite |
| Backend | Python y FastAPI |
| Datos | PostgreSQL, SQLAlchemy y Alembic |
| Calidad frontend | ESLint, Prettier y TypeScript |
| Calidad Python | Ruff y mypy |
| Pruebas | Vitest, Testing Library, pytest y Playwright |
| Entorno | Docker y Docker Compose |
| Automatización | GitHub Actions y SonarQube Cloud |

Las versiones compatibles y los archivos de bloqueo se fijarán al inicializar cada parte. No hay todavía comandos de arranque verificados.

## Documentación

- [Reglas para agentes](AGENTS.md)
- [Entrada para Claude](CLAUDE.md)
- [Producto](docs/product.md)
- [Arquitectura](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Estado](docs/STATUS.md)
- [Forma de trabajo](docs/workflow.md)
- [GitHub Flow](docs/git-workflow.md)
- [Calidad y pruebas](docs/quality.md)
- [Entorno y despliegue](docs/deployment.md)
- [Seguridad](docs/security.md)
- [Herramientas y plugins](docs/tooling.md)
- [Decisiones](docs/decisions/README.md)
- [Cambios](CHANGELOG.md)

## Autor

Manuel Casinos Pérez — desarrollador full stack junior, Valencia.

- [GitHub](https://github.com/Manuelklk03)
- [LinkedIn](https://www.linkedin.com/in/manuel-casinos-perez/)

Licencia pendiente de elección antes de publicar la primera versión.
