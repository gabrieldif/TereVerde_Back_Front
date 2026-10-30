import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O navegador fala só com o Vite (mesma origem); o Vite encaminha /api para o Back-End.
// Assim não há problema de CORS/cookie, nem diferença entre "localhost" e "127.0.0.1".
const backend = process.env.VITE_PROXY_TARGET || 'http://127.0.0.1:3001';
const proxy = { '/api': { target: backend, changeOrigin: false } };

export default defineConfig({
  plugins: [react()],
  // host fixo em IPv4: no Windows "localhost" pode virar ::1 e o Vite ficar inacessível por 127.0.0.1.
  server: { host: '127.0.0.1', port: 5173, strictPort: true, proxy },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true, proxy }
});
