import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import authRoutes from './routes/auth.js';
import attractionRoutes from './routes/attractions.js';
import eventRoutes from './routes/events.js';
import noticeRoutes from './routes/notices.js';

export const app = express();

app.disable('x-powered-by');
// localhost e 127.0.0.1 são endereços diferentes para o navegador; aceitamos os dois.
const allowedOrigins = new Set([env.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173']);
app.use(cors({
  origin: (origin, callback) => callback(null, !origin || allowedOrigins.has(origin)),
  credentials: true
}));
app.use(express.json({ limit: '3mb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', application: 'Terê Verde API' }));
app.use('/api/auth', authRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notices', noticeRoutes);

app.use('/api', (_req, res) => res.status(404).json({ message: 'Rota da API não encontrada.' }));

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error?.type === 'entity.too.large') return res.status(413).json({ message: 'Conteúdo enviado excede o limite permitido.' });
  return res.status(500).json({ message: 'Erro interno do servidor.' });
});
