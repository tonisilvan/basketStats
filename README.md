# Next.js Live Acta (Vercel-ready)

- `public/acta.html` → mesa (envía autosave a **/api/live**).
- `public/overlay.html` → overlay OBS (lee **/api/live**).
- `pages/api/live.js` y `pages/api/live.csv.js` → API con **Vercel KV** si está disponible; si no, usa **memoria efímera** (válido para tests, no garantiza persistencia entre cold starts).

## Despliegue en Vercel
1. Crea un proyecto nuevo y sube esta carpeta (o súbela a GitHub y conecta).
2. (Opcional, recomendado) Añade la integration **Vercel KV** y crea una DB. No hace falta tocar código.
3. Deploy.

Rutas:
- Home → `/acta.html`
- Overlay → `/overlay.html?fg=%23fff&bg=transparent&size=80&align=center`
- API → `GET/POST /api/live`, `GET /api/live.csv`

## Notas
- Sin KV, el estado vive en memoria de la lambda (puede perderse tras inactividad). Con **Vercel KV** es estable y multi-visitante.
