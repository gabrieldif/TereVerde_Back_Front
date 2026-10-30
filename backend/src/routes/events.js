import { Router } from 'express';
import { all, get, run } from '../database/db.js';
import { requireAuth } from '../middlewares/auth.js';
import { validateEvent } from '../utils/validation.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try { res.json(await all('SELECT * FROM events WHERE published = 1 ORDER BY event_date, event_time')); }
  catch (error) { next(error); }
});

router.get('/admin/all', requireAuth, async (_req, res, next) => {
  try { res.json(await all('SELECT * FROM events ORDER BY event_date, event_time')); }
  catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const event = await get('SELECT * FROM events WHERE id = ? AND published = 1', [req.params.id]);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado.' });
    return res.json(event);
  } catch (error) { return next(error); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const errors = validateEvent(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const result = await run(`INSERT INTO events (title, description, event_date, event_time, location, image_url, published)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
      req.body.title.trim(), req.body.description?.trim() || null, req.body.event_date,
      req.body.event_time || null, req.body.location.trim(), req.body.image_url || null,
      req.body.published === false ? 0 : 1
    ]);
    return res.status(201).json(await get('SELECT * FROM events WHERE id = ?', [result.id]));
  } catch (error) { return next(error); }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const errors = validateEvent(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const result = await run(`UPDATE events SET title=?, description=?, event_date=?, event_time=?, location=?, image_url=?, published=?,
      updated_at=CURRENT_TIMESTAMP WHERE id=?`, [
      req.body.title.trim(), req.body.description?.trim() || null, req.body.event_date,
      req.body.event_time || null, req.body.location.trim(), req.body.image_url || null,
      req.body.published === false ? 0 : 1, req.params.id
    ]);
    if (!result.changes) return res.status(404).json({ message: 'Evento não encontrado.' });
    return res.json(await get('SELECT * FROM events WHERE id = ?', [req.params.id]));
  } catch (error) { return next(error); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const result = await run('DELETE FROM events WHERE id = ?', [req.params.id]);
    if (!result.changes) return res.status(404).json({ message: 'Evento não encontrado.' });
    return res.status(204).end();
  } catch (error) { return next(error); }
});

export default router;
