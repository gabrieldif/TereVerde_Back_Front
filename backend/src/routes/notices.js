import { Router } from 'express';
import { all, get, run } from '../database/db.js';
import { requireAuth } from '../middlewares/auth.js';
import { validateNotice } from '../utils/validation.js';

const router = Router();

async function relatedAttractionError(attractionId) {
  if (!attractionId) return null;
  const attraction = await get('SELECT id FROM attractions WHERE id = ?', [attractionId]);
  return attraction ? null : 'Atração relacionada não encontrada.';
}

router.get('/', async (_req, res, next) => {
  try {
    res.json(await all(`SELECT n.*, a.name AS attraction_name FROM notices n
      LEFT JOIN attractions a ON a.id = n.attraction_id
      WHERE n.active = 1 ORDER BY n.urgent DESC, n.created_at DESC`));
  } catch (error) { next(error); }
});

router.get('/admin/all', requireAuth, async (_req, res, next) => {
  try {
    res.json(await all(`SELECT n.*, a.name AS attraction_name FROM notices n
      LEFT JOIN attractions a ON a.id = n.attraction_id ORDER BY n.created_at DESC`));
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const notice = await get(`SELECT n.*, a.name AS attraction_name FROM notices n
      LEFT JOIN attractions a ON a.id = n.attraction_id
      WHERE n.id = ? AND n.active = 1`, [req.params.id]);
    if (!notice) return res.status(404).json({ message: 'Aviso não encontrado.' });
    return res.json(notice);
  } catch (error) { return next(error); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const errors = validateNotice(req.body);
    const relatedError = await relatedAttractionError(req.body.attraction_id);
    if (relatedError) errors.push(relatedError);
    if (errors.length) return res.status(400).json({ errors });
    const result = await run(`INSERT INTO notices (title, description, urgent, active, attraction_id, image_url)
      VALUES (?, ?, ?, ?, ?, ?)`, [
      req.body.title.trim(), req.body.description.trim(), req.body.urgent ? 1 : 0,
      req.body.active === false ? 0 : 1, req.body.attraction_id || null, req.body.image_url?.trim() || null
    ]);
    return res.status(201).json(await get('SELECT * FROM notices WHERE id = ?', [result.id]));
  } catch (error) { return next(error); }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const errors = validateNotice(req.body);
    const relatedError = await relatedAttractionError(req.body.attraction_id);
    if (relatedError) errors.push(relatedError);
    if (errors.length) return res.status(400).json({ errors });
    const result = await run(`UPDATE notices SET title=?, description=?, urgent=?, active=?, attraction_id=?, image_url=?,
      updated_at=CURRENT_TIMESTAMP WHERE id=?`, [
      req.body.title.trim(), req.body.description.trim(), req.body.urgent ? 1 : 0,
      req.body.active === false ? 0 : 1, req.body.attraction_id || null, req.body.image_url?.trim() || null, req.params.id
    ]);
    if (!result.changes) return res.status(404).json({ message: 'Aviso não encontrado.' });
    return res.json(await get('SELECT * FROM notices WHERE id = ?', [req.params.id]));
  } catch (error) { return next(error); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const result = await run('DELETE FROM notices WHERE id = ?', [req.params.id]);
    if (!result.changes) return res.status(404).json({ message: 'Aviso não encontrado.' });
    return res.status(204).end();
  } catch (error) { return next(error); }
});

export default router;
