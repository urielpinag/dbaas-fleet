# Guía de contribución

Proyecto individual, pero con el mismo flujo que un equipo: todo cambio entra por Pull Request.

## Ramas

| Prefijo | Uso | Ejemplo |
|---|---|---|
| `feature/` | Funcionalidad nueva | `feature/terraform-cluster` |
| `fix/` | Corrección de errores | `fix/secret-encoding` |
| `chore/` | Mantenimiento, dependencias | `chore/bump-node` |
| `docs/` | Documentación y diagramas | `docs/wiki-arquitectura` |

Se crean desde `main` y se eliminan al mergear.

## Commits

Conventional Commits en imperativo y en español o inglés, sin mezclar dentro del mismo PR:

```text
feat(api): agregar endpoint de catálogo de motores
fix(k8s): corregir permisos del PVC de postgres
docs(propuesta): agregar diagrama de despliegue
```

## Pull Requests

1. Un PR por issue, con `Closes #N` en la descripción.
2. Título igual al commit principal.
3. Checklist del template completo: pruebas, documentación y sin secretos.
4. Merge con **squash**; la rama se elimina automáticamente.

## Definition of Done

- [ ] `npm run typecheck`, `npm test` y `npm run build` pasan en local y en CI.
- [ ] Gitleaks y Trivy sin hallazgos críticos.
- [ ] Documentación o diagrama actualizado si cambia el comportamiento.
- [ ] Issue cerrado y movido a `Done` en el tablero.

## Secretos

Nunca se commitean credenciales. En local va `.env` (ignorado); en CI, GitHub Secrets. Cualquier secreto expuesto se rota de inmediato.
