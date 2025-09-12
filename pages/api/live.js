import { getRedis } from '../../lib/redis';
export const config = { api: { bodyParser: { sizeLimit: '2mb' } } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Cache-Control','no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const r = await getRedis();

  if (req.method === 'GET') {
    const raw = await r.get('live:json');
    return res.status(200).json(raw ? JSON.parse(raw) : {});
  }

  if (req.method === 'POST') {
    const { json={}, csv='', title='' } = req.body || {};
    const payload = { ...(json||{}), title, updatedAt: Date.now() };
    await r.set('live:json', JSON.stringify(payload));
    await r.set('live:csv', csv);
    return res.status(200).json({ ok:true });
  }

  return res.status(405).end();
}
