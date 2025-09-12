# Acta Live con Express (v2)
- Sirve `public/acta.html` (mesa) y `public/overlay.html` (OBS).
- El acta hace `POST /live` con cada cambio y el servidor expone `/live.json` y `/live.csv`.
- Sin Service Worker (funciona perfecto dentro de OBS).

## Uso
```
npm i
npm start
# Acta:   http://localhost:3000/
# Overlay: http://localhost:3000/overlay.html?fg=%23fff&bg=transparent&size=80&align=center
```
Coloca tus CSV en `public/plantillas/` y añade sus nombres (sin .csv) en `public/plantillas/index.json` como en la versión estática.
