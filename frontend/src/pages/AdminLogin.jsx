import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@tereverde.local');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      navigate('/admin/painel');
    } catch (err) {
      setError(err.message);
    }
  }

  return <section className="auth-wrap"><form className="panel auth" onSubmit={submit}>
    <span className="eyebrow">Área restrita</span><h1>Administração</h1><p>Entre para manter atrações, eventos e avisos atualizados.</p>
    <label>E-mail<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></label>
    <label>Senha<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required /></label>
    {error && <p className="error">{error}</p>}
    <button className="button" type="submit">Entrar</button>
  </form></section>;
}
