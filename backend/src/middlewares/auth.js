import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const COOKIE_NAME = 'tereverde_session';

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map((item) => item.trim());
  const prefix = `${name}=`;
  const cookie = cookies.find((item) => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}

export function requireAuth(req, res, next) {
  const token = readCookie(req.headers.cookie, COOKIE_NAME);
  if (!token) {
    return res.status(401).json({ message: 'Autenticação obrigatória.' });
  }

  try {
    req.admin = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ message: 'Sessão inválida ou expirada.' });
  }
}
