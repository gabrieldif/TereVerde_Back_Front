const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include'
  });

  if (response.status === 204) return null;
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || body.errors?.join(' ') || 'Erro na requisição.');
  return body;
}
