import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tereverde-test-'));
process.env.DB_PATH = path.join(tempDir, 'test.db');
process.env.JWT_SECRET = 'integration-test-secret';
process.env.FRONTEND_URL = 'http://localhost:5173';

const [{ app }, { initializeDatabase }, { closeDb }] = await Promise.all([
  import('../src/app.js'),
  import('../src/database/init.js'),
  import('../src/database/db.js')
]);

await initializeDatabase();
const server = app.listen(0);
await new Promise((resolve) => server.once('listening', resolve));
const port = server.address().port;
const base = `http://127.0.0.1:${port}/api`;

async function request(pathname, options = {}) {
  const response = await fetch(`${base}${pathname}`, options);
  const body = response.status === 204 ? null : await response.json().catch(() => ({}));
  return { response, body };
}

let cookie = '';

test('health responde 200', async () => {
  const { response, body } = await request('/health');
  assert.equal(response.status, 200);
  assert.equal(body.status, 'ok');
});

test('login inválido retorna 401', async () => {
  const { response } = await request('/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@tereverde.local', password: 'errada' })
  });
  assert.equal(response.status, 401);
});

test('login válido cria sessão', async () => {
  const { response, body } = await request('/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@tereverde.local', password: 'admin123' })
  });
  assert.equal(response.status, 200);
  assert.equal(body.admin.email, 'admin@tereverde.local');
  cookie = response.headers.get('set-cookie')?.split(';')[0] || '';
  assert.ok(cookie.includes('tereverde_session='));
});

test('rota administrativa sem sessão retorna 401', async () => {
  const { response } = await request('/events/admin/all');
  assert.equal(response.status, 401);
});

test('criar atração autenticado retorna 201', async () => {
  const { response, body } = await request('/attractions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({
      name: 'Mirante de Teste', description: 'Atração criada pelo teste de integração.',
      category: 'Mirante', location: 'Teresópolis - RJ', status: 'ABERTA', image_url: ''
    })
  });
  assert.equal(response.status, 201);
  assert.equal(body.name, 'Mirante de Teste');
});

test('evento sem campos obrigatórios retorna 400', async () => {
  const { response, body } = await request('/events', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({})
  });
  assert.equal(response.status, 400);
  assert.ok(Array.isArray(body.errors));
});

test('atração inexistente retorna 404', async () => {
  const { response } = await request('/attractions/999999');
  assert.equal(response.status, 404);
});

test('rota inexistente retorna 404 padronizado', async () => {
  const { response, body } = await request('/nao-existe');
  assert.equal(response.status, 404);
  assert.match(body.message, /não encontrada/i);
});

test('aviso com atração relacionada inexistente retorna 400', async () => {
  const { response, body } = await request('/notices', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ title: 'Aviso inválido', description: 'Atração não existe.', attraction_id: 999999 })
  });
  assert.equal(response.status, 400);
  assert.match(body.errors.join(' '), /atração relacionada/i);
});

test('excluir atração mantém o aviso e remove apenas o vínculo', async () => {
  const headers = { 'Content-Type': 'application/json', Cookie: cookie };
  const created = await request('/attractions', {
    method: 'POST', headers,
    body: JSON.stringify({ name: 'Atração temporária', description: 'Será excluída.', category: 'Trilha', location: 'Teresópolis - RJ', status: 'ABERTA' })
  });
  const notice = await request('/notices', {
    method: 'POST', headers,
    body: JSON.stringify({ title: 'Aviso vinculado', description: 'Vinculado à atração temporária.', attraction_id: created.body.id })
  });
  assert.equal(notice.response.status, 201);
  assert.equal((await request(`/attractions/${created.body.id}`, { method: 'DELETE', headers })).response.status, 204);
  const after = await request(`/notices/${notice.body.id}`);
  assert.equal(after.response.status, 200);
  assert.equal(after.body.attraction_id, null);
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await closeDb();
  await fs.rm(tempDir, { recursive: true, force: true });
});
