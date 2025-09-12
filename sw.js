// SW para /live.json y /live.csv
const CACHE = 'live-cache-v1';
const LIVE_JSON = '/live.json';
const LIVE_CSV  = '/live.csv';

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());

async function putLive(path, body, contentType) {
  const cache = await caches.open(CACHE);
  const resp = new Response(body, {
    headers: { 'content-type': contentType, 'cache-control': 'no-store' }
  });
  await cache.put(path, resp);
}

self.addEventListener('message', async (event) => {
  const msg = event.data || {};
  if (msg.type === 'save') {
    if (msg.json) await putLive(LIVE_JSON, JSON.stringify(msg.json), 'application/json; charset=utf-8');
    if (msg.csv)  await putLive(LIVE_CSV,  msg.csv,                  'text/csv; charset=utf-8');
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === LIVE_JSON || url.pathname === LIVE_CSV) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(url.pathname);
      return hit || new Response(url.pathname.endsWith('.json') ? '{}' : '', {
        headers: { 'content-type': url.pathname.endsWith('.json')
          ? 'application/json; charset=utf-8' : 'text/csv; charset=utf-8',
          'cache-control':'no-store'
        }
      });
    })());
  }
});
