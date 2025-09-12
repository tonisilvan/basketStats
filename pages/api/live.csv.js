export const config = { api: { bodyParser: false } };

let memory = { csv: '' };

async function getKV() {
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch (_) {
    return null;
  }
}

function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
}

export default async function handler(req, res) {
  setCORS(res);
  const kv = await getKV();
  const keyCSV  = 'live:csv';
  try {
    if (kv) {
      const csv = await kv.get(keyCSV);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      return res.status(200).send(csv || '');
    }
  } catch (_) {}
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  return res.status(200).send(memory.csv || '');
}
