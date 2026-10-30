import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get } from '../database/db.js';
import { env } from '../config/env.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();
const COOKIE_NAME = 'tereverde_session';

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Informe e-mail e senha.' });
    }
    const admin = await get('SELECT * FROM admins WHERE email = ? AND active = 1', [email.trim().toLowerCase()]);
    if (!admin || !(await bcrypt.compare(password || '', admin.password_hash))) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: admin.id, name: admin.name, email: admin.email },
      env.jwtSecret,
      { expiresIn: '8h' }
    );

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 8 * 60 * 60 * 1000
    });

    return res.json({ admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: false });
  return res.status(204).end();
});

router.get('/me', requireAuth, (req, res) => {
  return res.json({ admin: req.admin });
});

export default router;
