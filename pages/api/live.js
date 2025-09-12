export const config = { api: { bodyParser: { sizeLimit: '2mb' } } };

let memory = { json: {}, csv: '', updatedAt: 0 };

async function getKV() {
  try {
    const { kv } = await import('@vercel/kv');
    // A simple ping; if no env vars, this will throw and we'll fallback to memory
    return kv;
  } catch (_) {
    return null;
  }
}

function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
}

export default async function handler(req, res) {
  setCORS(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  const kv = await getKV();
  const keyJSON = 'live:json';
  const keyCSV  = 'live:csv';

  if (req.method === 'GET') {
    try {
      if (kv) {
        const json = await kv.get(keyJSON);
        return res.status(200).json(json || {});
      }
    } catch (_) { /* ignore and fallback */ }
    return res.status(200).json(memory.json || {});
  }

  if (req.method === 'POST') {
    const { json, csv, title } = req.body || {};
    const payload = json || {};
    if (title) payload.title = title;
    payload.updatedAt = Date.now();
    try {
      if (kv) {
        await kv.set(keyJSON, payload);
        if (typeof csv === 'string') await kv.set(keyCSV, csv);
        return res.status(200).json({ ok: true, stored: 'kv' });
      }
    } catch (_) { /* ignore and fallback */ }

    memory.json = payload;
    if (typeof csv === 'string') memory.csv = csv;
    memory.updatedAt = Date.now();
    return res.status(200).json({ ok: true, stored: 'memory' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
