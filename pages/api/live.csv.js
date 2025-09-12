import { getRedis } from '../../lib/redis';
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','no-store');
  const r = await getRedis();
  const csv = await r.get('live:csv');
  res.setHeader('Content-Type','text/csv; charset=utf-8');
  res.status(200).send(csv || '');
}
