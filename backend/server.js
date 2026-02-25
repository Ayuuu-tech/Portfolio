/* ═══════════════════════════════════════════
   EXPRESS SERVER – Portfolio Backend
   ═══════════════════════════════════════════ */

const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();

/* ── Middleware ── */
app.use(cors({
    origin: config.frontendUrl,
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

/* ── Serve frontend static files ── */
app.use(express.static(path.join(__dirname, '..', 'frontend')));

/* ── API Routes ── */
app.use('/api/contact', require('./routes/contact'));
app.use('/api/data', require('./routes/data'));

/* ── Health check ── */
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── Catch-all: serve frontend ── */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

/* ── Start ── */
app.listen(config.port, () => {
    console.log(`
  ╔════════════════════════════════════════╗
  ║   🚀 Portfolio Server Running         ║
  ║   → http://localhost:${config.port}             ║
  ║   → API: /api/health, /api/contact    ║
  ╚════════════════════════════════════════╝
  `);
});
