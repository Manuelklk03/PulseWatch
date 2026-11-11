# Calidad, tests y DevSecOps

## Herramientas

| Control | Herramienta |
| --- | --- |
| Lint JS/TS y React | ESLint |
| Formato frontend y documentos compatibles | Prettier |
| Tipos frontend | TypeScript |
| Lint y formato Python | Ruff |
| Tipos Python | mypy |
| Lógica y componentes frontend | Vitest y Testing Library |
| Backend unitario e integración | pytest |
| Recorridos reales | Playwright |
| Análisis y cobertura importada | SonarQube Cloud |

ESLint y Prettier tienen responsabilidades diferentes. Evitar reglas de formato de ESLint incompatibles con Prettier. Documentar scripts solo después de crearlos y comprobarlos.

## Scripts del frontend

Desde frontend/, comprobados el 2026-11-05:

| Script | Función |
| --- | --- |
| npm run dev | Servidor de desarrollo de Vite |
| npm run lint | ESLint |
| npm run format | Prettier reescribe los archivos |
| npm run format:check | Prettier solo comprueba el formato |
| npm run build | Comprobación de tipos con tsc y compilación con Vite |

Aún no hay tests del frontend ni CI que los ejecute.

## Pruebas significativas

Unitarias: umbrales, timeout, apertura/cierre de incidencias y fórmula de disponibilidad.

Integración: API, PostgreSQL aislado, migraciones, permisos y consistencia transaccional.

E2E: crear monitor, consultar historial, simular caída y recuperación con un servicio controlado.

Seguridad: acceso entre usuarios, destinos prohibidos, IPv6, redirecciones y límites.

Sin dependencia de webs públicas. Controlar reloj y red en las pruebas que lo necesiten. No reproducir solo detalles de implementación para aumentar cobertura.

## CI prevista

PR hacia main y push a main: instalación reproducible, lint, formato, tipos, tests y cobertura, build y construcción Docker. Añadir E2E al existir un recorrido ejecutable.

### Estado actual

Existe el workflow .github/workflows/frontend-ci.yml: npm ci, lint, format:check y build del frontend (tipos incluidos en el build), con Node 24, permisos de solo lectura y concurrencia que cancela ejecuciones antiguas. Se activa en PR hacia main y en push a main cuando cambia frontend/ o el propio workflow. Faltan tests y cobertura del frontend, el backend, la construcción Docker y SonarQube. Las acciones usan tags de versión mayor (checkout v7 y setup-node v7); fijarlas por SHA queda pendiente (ver DevSecOps).

Los controles deben ejecutarse sobre el commit vigente de la PR. Fallos no se ocultan con continue-on-error en checks obligatorios.

## SonarQube

Analizar frontend y backend e importar informes reales de cobertura. Definir condiciones del Quality Gate y exclusiones justificadas. Hacer obligatorio el resultado una vez conectado y verificado. Enviar un análisis no demuestra que el gate esté superado.

No inventar porcentajes de cobertura. Acordar umbrales cuando haya una base medible y proteger especialmente el código nuevo y las reglas críticas.

## DevSecOps

Configurar revisión de dependencias, detección de secretos y análisis de imágenes cuando existan esos artefactos. Clasificar hallazgos y justificar excepciones. Permisos mínimos de workflows; secretos de despliegue fuera de PR no confiables. Fijar acciones y dependencias de forma reproducible, con un procedimiento de actualización.

## Terminado

Criterios cumplidos, pruebas apropiadas superadas, documentación actualizada, diff revisado y limitaciones explícitas. Para documentación: enlaces, comandos y coherencia; no build inexistente.
