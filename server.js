
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Estado live en memoria
const LIVE = { json: {}, csv: '', updatedAt: 0 };

// Recibe el estado desde el acta
app.post('/live', (req, res) => {
  const { json, csv, title } = req.body || {};
  if (json) LIVE.json = json;
  if (csv != null) LIVE.csv = String(csv);
  if (title) LIVE.json = { ...(LIVE.json||{}), title };
  LIVE.updatedAt = Date.now();
  res.json({ ok: true, updatedAt: LIVE.updatedAt });
});

// Endpoints para overlay/externos
app.get('/live.json', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.type('application/json').send(LIVE.json || {});
});
app.get('/live.csv', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.type('text/csv').send(LIVE.csv || '');
});

// Estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Home -> acta
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'acta.html'));
});

app.listen(PORT, () => {
  console.log(`✔ Live acta server on http://localhost:${PORT}`);
  console.log(`  GET /live.json  |  GET /live.csv`);
});
