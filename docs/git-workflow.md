# GitHub Flow

## Reglas

main contiene trabajo integrado estable. No desarrollar en main ni usar develop. Una rama por tarea, con prefijos feature/, fix/, docs/, test/, refactor/ o chore/ y nombre en inglés kebab-case.

El agente prepara comandos y mensajes; Manuel los ejecuta salvo encargo expreso.

## Secuencia obligatoria

1. git status y rama actual.
2. Identificar y conservar cambios pendientes.
3. Para tarea nueva: main actualizada con git pull --ff-only.
4. Crear rama descriptiva o continuar la rama existente de la tarea.
5. Implementar, documentar y comprobar.
6. Revisar git diff y añadir archivos selectivamente.
7. Commits pequeños con título, línea en blanco y descripción.
8. Primer push con -u; siguientes con git push.
9. Una PR de la tarea hacia main.
10. Revisar el diff, esperar checks obligatorios y resolver fallos.
11. Create a merge commit, con título y descripción.
12. Borrar rama remota integrada.
13. Volver a main y git pull --ff-only.
14. Comprobar sincronía y borrar rama local integrada cuando corresponda.

## Tamaño de las PR

Cada PR contiene al menos tres commits, cada uno con un cambio coherente y revisable por separado (por ejemplo, regla o código, pruebas y documentación). No abrir PR de uno o dos commits. Si una tarea no da para tres commits con sentido, ampliar su alcance de forma razonable o agrupar la tarea con otra relacionada; no dividir un cambio de forma artificial. Comprobar con git log main..HEAD --oneline antes de abrir la PR.

## Convención

Conventional Commits en español. Tipos: feat, fix, docs, test, refactor, style, chore, ci, build y perf.

Los mensajes de commit y de merge contienen solo título y descripción. No llevan líneas Co-Authored-By ni firmas automáticas de agentes o herramientas. Los commits anteriores a esta regla que las incluyen no se reescriben.

Ejemplo:

```text
feat(monitors): registrar servicios para monitorizar

- Añadir creación y consulta de monitores.
- Validar destinos y propiedad de los recursos.
- Incorporar pruebas de comportamiento.
```

## Protección y versiones

Exigir PR y checks reales en main una vez configurados. No exigir una aprobación de terceros imposible de obtener. Revisar siempre el diff. No crear tags ni releases sin indicación de Manuel.

Una PR documental inicial puede no tener CI: indicarlo expresamente y no simular resultados. La CI se configura cuando existen sus herramientas.
