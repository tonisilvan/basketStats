# Acta + Overlay (sin backend) — build local

## Cómo abrir en local (IMPORTANTE)
No lo abras con `file://`. Usa un servidor estático:
- Opción 1 (Python): `python3 -m http.server 5500` y abre http://localhost:5500/
- Opción 2 (Node): `npx serve` en la carpeta del proyecto
- Opción 3 (VS Code): extensión *Live Server*

El Service Worker se registra en `./sw.js` (scope `./`), así funciona también si sirves desde un subdirectorio.

## Si ves la página vacía
1. Abre DevTools → **Console** para ver errores.
2. Borra SW y caché: DevTools → **Application** → **Clear storage** → Clear site data; y **Application → Service Workers → Unregister**.
3. Recarga dura (Cmd/Ctrl+Shift+R).

## Producción (Vercel)
Sube estos archivos (acta.html, sw.js, overlay.html, vercel.json). La home será `/acta.html`.
