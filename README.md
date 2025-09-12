# Acta + Overlay v3 (lee plantillas desde /plantillas)

- `acta.html` ahora **solo** carga plantillas desde la carpeta `/plantillas` usando `plantillas/index.json`.
- `overlay.html` lee `/live.json` expuesto por `sw.js`.

## Local
Sirve con un servidor (no file://), por ejemplo:
```
python3 -m http.server 5500
# http://localhost:5500/acta.html
```
Coloca tus CSVs en `/plantillas` y **añádelos a `plantillas/index.json`** sin extensión.

## Producción
Sube todo a Vercel como estático. La home reescribe a `/acta.html`.

