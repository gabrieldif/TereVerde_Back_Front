import { Router } from 'express';
import { all, get, run } from '../database/db.js';
import { requireAuth } from '../middlewares/auth.js';
import { allowedStatuses, validateAttraction } from '../utils/validation.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    res.json(await all('SELECT * FROM attractions ORDER BY name'));
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await get('SELECT * FROM attractions WHERE id = ?', [req.params.id]);
    if (!item) return res.status(404).json({ message: 'Atração não encontrada.' });
    return res.json(item);
  } catch (error) { return next(error); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const errors = validateAttraction(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const result = await run(`INSERT INTO attractions
      (name, description, category, location, status, closure_reason, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
      req.body.name.trim(), req.body.description.trim(), req.body.category.trim(), req.body.location.trim(),
      req.body.status, req.body.closure_reason?.trim() || null, req.body.image_url?.trim() || null
    ]);
    return res.status(201).json(await get('SELECT * FROM attractions WHERE id = ?', [result.id]));
  } catch (error) { return next(error); }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const errors = validateAttraction(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const result = await run(`UPDATE attractions SET name=?, description=?, category=?, location=?, status=?,
      closure_reason=?, image_url=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`, [
      req.body.name.trim(), req.body.description.trim(), req.body.category.trim(), req.body.location.trim(),
      req.body.status, req.body.closure_reason?.trim() || null, req.body.image_url?.trim() || null, req.params.id
    ]);
    if (!result.changes) return res.status(404).json({ message: 'Atração não encontrada.' });
    return res.json(await get('SELECT * FROM attractions WHERE id = ?', [req.params.id]));
  } catch (error) { return next(error); }
});

router.patch('/:id/status', requireAuth, async (req, res, next) => {
  try {
    const { status, closure_reason } = req.body;
    if (!allowedStatuses.includes(status)) return res.status(400).json({ message: 'Status inválido.' });
    if (status === 'FECHADA' && !closure_reason?.trim()) return res.status(400).json({ message: 'Informe o motivo do fechamento.' });
    const result = await run(`UPDATE attractions SET status=?, closure_reason=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`, [
      status, status === 'FECHADA' ? closure_reason.trim() : null, req.params.id
    ]);
    if (!result.changes) return res.status(404).json({ message: 'Atração não encontrada.' });
    return res.json(await get('SELECT * FROM attractions WHERE id = ?', [req.params.id]));
  } catch (error) { return next(error); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const result = await run('DELETE FROM attractions WHERE id = ?', [req.params.id]);
    if (!result.changes) return res.status(404).json({ message: 'Atração não encontrada.' });
    return res.status(204).end();
  } catch (error) { return next(error); }
});

export default router;
