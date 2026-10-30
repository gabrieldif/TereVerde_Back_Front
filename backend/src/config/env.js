import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 3001),
  // 127.0.0.1 = só este computador acessa a API (evita o aviso do Firewall do Windows).
  // Para liberar na rede local, use HOST=0.0.0.0 no arquivo backend/.env
  host: process.env.HOST || '127.0.0.1',
  jwtSecret: process.env.JWT_SECRET || 'tereverde-dev-secret',
  frontendUrl: process.env.FRONTEND_URL || 'http://127.0.0.1:5173',
  dbPath: process.env.DB_PATH || ''
};
