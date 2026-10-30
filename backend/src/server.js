import { app } from './app.js';
import { env } from './config/env.js';
import { initializeDatabase } from './database/init.js';

try {
  await initializeDatabase();
} catch (error) {
  console.error('[ERRO] Não foi possível preparar o banco de dados (backend/data/tereverde.db).');
  console.error(error);
  process.exit(1);
}

const server = app.listen(env.port, env.host, () => {
  console.log(`Terê Verde API disponível em http://${env.host}:${env.port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`[ERRO] A porta ${env.port} já está em uso. Execute PARAR_TERE_VERDE.vbs ou altere PORT em backend/.env.`);
  } else {
    console.error('[ERRO] Falha ao iniciar o servidor:', error);
  }
  process.exit(1);
});
