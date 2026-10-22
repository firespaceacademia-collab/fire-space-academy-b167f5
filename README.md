# Fire Space Academy — Roleplay

Sitio oficial del roleplay Fire Space Academy: lore, inteligencias, rangos, directorio de estudiantes, el periódico "The Intruders" y un portal de admisiones con códigos únicos.

**Tecnologías:** TanStack Start (React 19), Tailwind CSS 4, shadcn/ui, Netlify Database (Drizzle ORM) y Netlify Image CDN.

## Uso local
```bash
pnpm install
netlify dev --port 8889
```

## Edición manual
- `data/estudiantes.json`: directorio de estudiantes (instrucciones y plantilla dentro del archivo).
- Imágenes de expedientes: `public/img/estudiantes/`.
- `data/solicitudes.json`: estructura de las solicitudes (los datos reales viven en la base de datos).

## Pendiente
- Pasar las fichas aceptadas al directorio a mano.
