import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAttraction, validateEvent, validateNotice } from '../src/utils/validation.js';

test('atração válida não gera erros', () => {
  assert.deepEqual(validateAttraction({
    name: 'Pedra do Sino', description: 'Trilha', category: 'Trilha',
    location: 'PARNASO', status: 'ABERTA'
  }), []);
});

test('atração fechada exige motivo', () => {
  const errors = validateAttraction({
    name: 'Pedra do Sino', description: 'Trilha', category: 'Trilha',
    location: 'PARNASO', status: 'FECHADA'
  });
  assert.ok(errors.some((item) => item.includes('motivo')));
});

test('evento exige título, data e local', () => {
  assert.equal(validateEvent({}).length, 3);
});

test('aviso exige título e descrição', () => {
  assert.equal(validateNotice({}).length, 2);
});

test('imagem acima de 2 MB é rejeitada', async () => {
  const { validateImage } = await import('../src/utils/validation.js');
  const fake = `data:image/png;base64,${'A'.repeat(2_900_000)}`;
  assert.match(validateImage(fake), /2 MB/);
});

test('categoria fora da lista é rejeitada', () => {
  const errors = validateAttraction({
    name: 'Local', description: 'Descrição', category: 'Praia', location: 'Teresópolis', status: 'ABERTA'
  });
  assert.ok(errors.some((item) => item.includes('Categoria')));
});
