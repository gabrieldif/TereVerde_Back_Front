export const allowedStatuses = ['ABERTA', 'FECHADA', 'EM_MANUTENCAO'];
export const allowedCategories = ['Trilha', 'Cachoeira', 'Parque', 'Mirante'];

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX = { name: 120, title: 120, description: 2000, location: 200, reason: 300 };

export function requiredText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function textTooLong(value, max) {
  return typeof value === 'string' && value.trim().length > max;
}

export function validateImage(value) {
  if (!value) return null;
  if (typeof value !== 'string') return 'Imagem inválida.';
  if (value.startsWith('/images/')) return null;
  const match = value.match(/^data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)$/i);
  if (!match) return 'A imagem deve ser JPG, PNG ou WEBP.';
  const bytes = Math.floor((match[2].length * 3) / 4) - (match[2].endsWith('==') ? 2 : match[2].endsWith('=') ? 1 : 0);
  if (bytes > MAX_IMAGE_BYTES) return 'A imagem deve ter no máximo 2 MB.';
  return null;
}

export function validateAttraction(payload) {
  const errors = [];
  if (!requiredText(payload.name)) errors.push('Nome é obrigatório.');
  if (textTooLong(payload.name, MAX.name)) errors.push(`Nome deve ter no máximo ${MAX.name} caracteres.`);
  if (!requiredText(payload.description)) errors.push('Descrição é obrigatória.');
  if (textTooLong(payload.description, MAX.description)) errors.push(`Descrição deve ter no máximo ${MAX.description} caracteres.`);
  if (!allowedCategories.includes(payload.category)) errors.push('Categoria inválida.');
  if (!requiredText(payload.location)) errors.push('Localização é obrigatória.');
  if (textTooLong(payload.location, MAX.location)) errors.push(`Localização deve ter no máximo ${MAX.location} caracteres.`);
  if (!allowedStatuses.includes(payload.status)) errors.push('Status inválido.');
  if (payload.status === 'FECHADA' && !requiredText(payload.closure_reason)) errors.push('Informe o motivo quando a atração estiver fechada.');
  if (textTooLong(payload.closure_reason, MAX.reason)) errors.push(`Motivo deve ter no máximo ${MAX.reason} caracteres.`);
  const imageError = validateImage(payload.image_url);
  if (imageError) errors.push(imageError);
  return errors;
}

export function validateEvent(payload) {
  const errors = [];
  if (!requiredText(payload.title)) errors.push('Título é obrigatório.');
  if (textTooLong(payload.title, MAX.title)) errors.push(`Título deve ter no máximo ${MAX.title} caracteres.`);
  if (!requiredText(payload.event_date)) errors.push('Data é obrigatória.');
  if (!requiredText(payload.location)) errors.push('Local é obrigatório.');
  if (textTooLong(payload.location, MAX.location)) errors.push(`Local deve ter no máximo ${MAX.location} caracteres.`);
  if (textTooLong(payload.description, MAX.description)) errors.push(`Descrição deve ter no máximo ${MAX.description} caracteres.`);
  const imageError = validateImage(payload.image_url);
  if (imageError) errors.push(imageError);
  return errors;
}

export function validateNotice(payload) {
  const errors = [];
  if (!requiredText(payload.title)) errors.push('Título é obrigatório.');
  if (textTooLong(payload.title, MAX.title)) errors.push(`Título deve ter no máximo ${MAX.title} caracteres.`);
  if (!requiredText(payload.description)) errors.push('Descrição é obrigatória.');
  if (textTooLong(payload.description, MAX.description)) errors.push(`Descrição deve ter no máximo ${MAX.description} caracteres.`);
  const imageError = validateImage(payload.image_url);
  if (imageError) errors.push(imageError);
  return errors;
}
