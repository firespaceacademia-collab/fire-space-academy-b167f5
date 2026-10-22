# AGENTS.md

Fire Space Academy: sitio de una sola página en TanStack Start desplegado en Netlify. Todo el texto viene del lore oficial del usuario; no inventes contenido, estudiantes ni lugares.

## Estructura
- `src/routes/index.tsx`: monta todas las secciones; su loader trae las solicitudes públicas.
- `src/components/fs/`: secciones (hero, lore, jerarquia, zonas, directorio, intruders, admisiones, navbar, footer, primitives).
- `src/lib/academia.ts`: inteligencias, rangos y lectura de `data/estudiantes.json`. La edad Off se descarta aquí y nunca llega a la UI.
- `src/lib/solicitudes.functions.ts`: server functions de solicitudes. `src/server/solicitudes.server.ts`: helpers solo de servidor (código de administrador, códigos únicos, purga a las 24 h).
- `db/schema.ts` + `netlify/database/migrations/`: tabla `solicitudes` (Drizzle `@beta`). Cada cambio de esquema necesita una migración nueva.
- Tema en `src/styles.css` (paleta `--fs-*`; fuentes Cinzel, Cormorant y Special Elite).

## Decisiones
- El usuario edita los estudiantes a mano en `data/estudiantes.json`; mantén el formato y los comentarios `_LEEME`.
- La lista pública de solicitudes solo expone nombre y estado. El detalle, aceptar/rechazar y exportar exigen el código de administrador, que se valida en el servidor (`FS_CODIGO_ADMIN`, por defecto FS-2110). Eliminar una ficha exige el código del postulante.
- Las imágenes se sirven a través de `/.netlify/images`.
