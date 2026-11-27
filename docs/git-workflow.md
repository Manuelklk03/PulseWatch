# GitHub Flow

## Reglas

main contiene trabajo integrado estable. No desarrollar en main ni usar develop. Las ramas usan los prefijos feature/, fix/, docs/, test/, refactor/, chore/ o ci/ y un nombre en inglés kebab-case.

El agente prepara comandos y mensajes; Manuel los ejecuta salvo encargo expreso.

## Ramas de integración y ramas de tarea

El trabajo se organiza por áreas, con dos niveles de rama:

- **Rama de integración**: una por área de trabajo (por ejemplo feature/frontend-testing). Sale de main actualizada y agrupa varias tareas. Llega a main solo mediante una PR final, cuando el área está terminada y comprobada.
- **Rama de tarea**: sale de la rama de integración y su PR va hacia esa rama, nunca hacia main.
- **Cambio suelto** de documentación o configuración que no pertenece a ningún área: rama docs/ o chore/ desde main, con PR directa a main.
- **Una tarea por rama**: no mezclar tareas distintas en la misma rama ni cambiar de tarea con git stash sin avisar a Manuel.
- **No traer main a una rama**: no hacer merge de main dentro de una rama de tarea o de integración. Si main avanza y la rama necesita esos cambios (por ejemplo, por conflictos), avisar a Manuel: se decide entre rebase con git push --force-with-lease, que él autoriza, o un merge puntual que se documenta en la PR.

## Secuencia obligatoria

1. git status y rama actual; identificar y conservar cambios pendientes.
2. Área nueva: git switch main, git pull --ff-only, crear la rama de integración y publicarla con git push -u.
3. Tarea nueva: git switch a la rama de integración, git pull --ff-only y crear la rama de tarea desde ella.
4. Implementar, documentar y comprobar.
5. Revisar git diff y añadir archivos selectivamente.
6. Commits pequeños con título, línea en blanco y descripción.
7. Primer push con -u; siguientes con git push.
8. PR de la tarea hacia la rama de integración, con al menos tres commits.
9. Revisar el diff, esperar checks obligatorios y resolver fallos.
10. Squash and merge, con el título de la PR y una lista breve de cambios como descripción.
11. Borrar la rama de tarea remota, volver a la rama de integración, git pull --ff-only y borrar la rama local.
12. Repetir del paso 3 al 11 hasta cerrar el área.
13. Área completa: PR final de la rama de integración hacia main, con revisión del diff y checks, y squash and merge con título y descripción.
14. Borrar la rama de integración remota, volver a main, git pull --ff-only, comprobar sincronía y borrar la rama local.

## Tamaño de las PR

Cada PR contiene al menos tres commits, cada uno con un cambio coherente y revisable por separado (por ejemplo, regla o código, pruebas y documentación). La regla vale para todas: las de tarea hacia la rama de integración, la final hacia main y las de cambios sueltos. No abrir PR de uno o dos commits. Si una tarea no da para tres commits con sentido, ampliar su alcance de forma razonable o agrupar la tarea con otra relacionada; no dividir un cambio de forma artificial. Comprobar con git log RAMA_BASE..HEAD --oneline antes de abrir la PR, donde RAMA_BASE es la rama hacia la que va la PR.

Con squash and merge, los commits de la PR se unen en uno solo al fusionar: la regla de tres commits asegura una PR revisable por pasos, aunque en la rama destino quede un único commit.

Como las PR de tarea no van hacia main, los checks de CI deben ejecutarse en PR hacia cualquier rama, no solo hacia main.

## Squash and merge

Todas las PR se fusionan con squash and merge, las de tarea hacia la rama de integración y la final hacia main. Cada PR queda como un solo commit en la rama destino y el historial es lineal. Los commits individuales se conservan en la propia PR, donde se revisan.

- El título del commit es el título de la PR: Conventional Commits en español, con el número de la PR entre paréntesis al final.
- La descripción del commit es una lista breve de los cambios, tomada de la sección Cambios de la PR.
- Ejemplo: `gh pr merge 21 --squash --delete-branch --subject "feat(db): modelo Monitor y su migración (#21)" --body "- Primer cambio.\n- Segundo cambio."`
- Tras un squash, Git no reconoce la rama local como integrada: comprobar que la PR figura como fusionada y borrar la rama local con git branch -D.

## Formato de la PR

El título sigue Conventional Commits. El cuerpo usa las secciones de .github/pull_request_template.md: Qué toca, Cambios, Validación, Riesgos y pendientes y Documentación. La sección Validación indica los comandos y resultados reales, lo que falló y se corrigió, y lo que no se pudo comprobar.

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
