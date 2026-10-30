import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const emptyAttraction = { name: '', description: '', category: 'Trilha', location: '', status: 'ABERTA', closure_reason: '', image_url: '' };
const emptyEvent = { title: '', description: '', event_date: '', event_time: '', location: '', image_url: '', published: true };
const emptyNotice = { title: '', description: '', urgent: false, active: true, attraction_id: '', image_url: '' };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('atracoes');
  const [attractions, setAttractions] = useState([]); const [events, setEvents] = useState([]); const [notices, setNotices] = useState([]);
  const [attraction, setAttraction] = useState(emptyAttraction); const [event, setEvent] = useState(emptyEvent); const [notice, setNotice] = useState(emptyNotice);
  const [editingId, setEditingId] = useState(null); const [message, setMessage] = useState('');

  async function load() {
    try {
      const [a, e, n] = await Promise.all([api('/attractions'), api('/events/admin/all'), api('/notices/admin/all')]);
      setAttractions(a); setEvents(e); setNotices(n);
    } catch (err) {
      const text = err.message.toLowerCase();
      if (text.includes('sessão') || text.includes('autenticação')) navigate('/admin');
    }
  }

  useEffect(() => { load(); }, []);
  async function logout() {
    try { await api('/auth/logout', { method: 'POST' }); } catch {}
    navigate('/admin');
  }
  function notify(text) { setMessage(text); setTimeout(() => setMessage(''), 2200); }


  function handleAttractionImage(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { notify('Selecione um arquivo de imagem.'); return; }
    if (file.size > 2 * 1024 * 1024) { notify('A imagem deve ter no máximo 2 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => setAttraction((current) => ({ ...current, image_url: reader.result }));
    reader.readAsDataURL(file);
  }

  function handleEventImage(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { notify('Selecione um arquivo de imagem.'); return; }
    if (file.size > 2 * 1024 * 1024) { notify('A imagem deve ter no máximo 2 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => setEvent((current) => ({ ...current, image_url: reader.result }));
    reader.readAsDataURL(file);
  }

  function handleNoticeImage(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { notify('Selecione um arquivo de imagem.'); return; }
    if (file.size > 2 * 1024 * 1024) { notify('A imagem deve ter no máximo 2 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => setNotice((current) => ({ ...current, image_url: reader.result }));
    reader.readAsDataURL(file);
  }

  async function saveAttraction(e) {
    e.preventDefault();
    try {
      await api(editingId ? `/attractions/${editingId}` : '/attractions', { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(attraction) });
      setAttraction(emptyAttraction); setEditingId(null); await load(); notify('Atração salva com sucesso.');
    } catch (err) { notify(err.message); }
  }
  async function saveEvent(e) {
    e.preventDefault();
    try {
      await api(editingId ? `/events/${editingId}` : '/events', { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(event) });
      setEvent(emptyEvent); setEditingId(null); await load(); notify('Evento salvo com sucesso.');
    } catch (err) { notify(err.message); }
  }
  async function saveNotice(e) {
    e.preventDefault();
    const payload = { ...notice, attraction_id: notice.attraction_id ? Number(notice.attraction_id) : null };
    try {
      await api(editingId ? `/notices/${editingId}` : '/notices', { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      setNotice(emptyNotice); setEditingId(null); await load(); notify('Aviso salvo com sucesso.');
    } catch (err) { notify(err.message); }
  }
  async function remove(type, id) {
    if (!confirm('Deseja realmente excluir este registro?')) return;
    try { await api(`/${type}/${id}`, { method: 'DELETE' }); await load(); notify('Registro excluído.'); }
    catch (err) { notify(err.message); }
  }

  function beginEdit(type, item) {
    setEditingId(item.id);
    if (type === 'attractions') setAttraction({ ...item, closure_reason: item.closure_reason || '', image_url: item.image_url || '' });
    if (type === 'events') setEvent({ ...item, published: Boolean(item.published), description: item.description || '', event_time: item.event_time || '', image_url: item.image_url || '' });
    if (type === 'notices') setNotice({ ...item, urgent: Boolean(item.urgent), active: Boolean(item.active), attraction_id: item.attraction_id || '', image_url: item.image_url || '' });
  }

  return <section className="section admin-page">
    <div className="admin-head"><div><span className="eyebrow">Painel administrativo</span><h1>Gerenciar conteúdo</h1><p className="admin-subtitle">Atualize rapidamente as informações que aparecem para os visitantes.</p></div><button className="ghost" onClick={logout}>Sair</button></div>
    {message && <div className="success">{message}</div>}
    <div className="admin-summary">
      <div><span>Atrações</span><strong>{attractions.length}</strong><small>{attractions.filter((i) => i.status === 'ABERTA').length} abertas</small></div>
      <div><span>Eventos</span><strong>{events.length}</strong><small>{events.filter((i) => Boolean(i.published)).length} publicados</small></div>
      <div><span>Avisos</span><strong>{notices.length}</strong><small>{notices.filter((i) => Boolean(i.urgent) && Boolean(i.active)).length} urgentes ativos</small></div>
    </div>
    <div className="tabs">
      <button className={tab === 'atracoes' ? 'active' : ''} onClick={() => { setTab('atracoes'); setEditingId(null); }}>Atrações</button>
      <button className={tab === 'eventos' ? 'active' : ''} onClick={() => { setTab('eventos'); setEditingId(null); }}>Eventos</button>
      <button className={tab === 'avisos' ? 'active' : ''} onClick={() => { setTab('avisos'); setEditingId(null); }}>Avisos</button>
    </div>

    {tab === 'atracoes' && <div className="admin-grid"><form className="panel" onSubmit={saveAttraction}><h2>{editingId ? 'Editar atração' : 'Nova atração'}</h2>
      <label>Nome<input value={attraction.name} onChange={(e) => setAttraction({ ...attraction, name: e.target.value })} required /></label>
      <label>Categoria<select value={attraction.category} onChange={(e) => setAttraction({ ...attraction, category: e.target.value })}><option>Trilha</option><option>Cachoeira</option><option>Parque</option><option>Mirante</option></select></label>
      <label>Localização<input value={attraction.location} onChange={(e) => setAttraction({ ...attraction, location: e.target.value })} required /></label>
      <label>Status<select value={attraction.status} onChange={(e) => setAttraction({ ...attraction, status: e.target.value })}><option value="ABERTA">Aberta</option><option value="FECHADA">Fechada</option><option value="EM_MANUTENCAO">Em manutenção</option></select></label>
      {attraction.status === 'FECHADA' && <label>Motivo do fechamento<input value={attraction.closure_reason} onChange={(e) => setAttraction({ ...attraction, closure_reason: e.target.value })} required /></label>}
      <label>Descrição<textarea value={attraction.description} onChange={(e) => setAttraction({ ...attraction, description: e.target.value })} required /></label>
      <div className="image-field"><span className="field-title">Foto da atração</span>{attraction.image_url ? <><img className="event-image-preview" src={attraction.image_url} alt="Pré-visualização da atração" /><div className="image-actions"><label className="upload-button">Trocar foto<input type="file" accept="image/*" onChange={(e) => handleAttractionImage(e.target.files?.[0])} /></label><button type="button" className="danger-outline" onClick={() => setAttraction({ ...attraction, image_url: '' })}>Excluir foto</button></div></> : <label className="upload-drop">Adicionar foto<input type="file" accept="image/*" onChange={(e) => handleAttractionImage(e.target.files?.[0])} /><small>JPG, PNG ou WEBP · máximo 2 MB</small></label>}</div>
      <button className="button">Salvar</button>
    </form><div className="list-panel">{attractions.map((i) => <div className="list-item event-admin-item" key={i.id}><div className="admin-item-main">{i.image_url && <img src={i.image_url} alt="" />}<div><strong>{i.name}</strong><small>{i.category} · {i.status.replace('_', ' ')}</small></div></div><div><button onClick={() => beginEdit('attractions', i)}>Editar</button><button className="danger" onClick={() => remove('attractions', i.id)}>Excluir</button></div></div>)}</div></div>}

    {tab === 'eventos' && <div className="admin-grid"><form className="panel" onSubmit={saveEvent}><h2>{editingId ? 'Editar evento' : 'Novo evento'}</h2>
      <label>Título<input value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} required /></label>
      <div className="form-row"><label>Data<input type="date" value={event.event_date} onChange={(e) => setEvent({ ...event, event_date: e.target.value })} required /></label><label>Horário<input type="time" value={event.event_time} onChange={(e) => setEvent({ ...event, event_time: e.target.value })} /></label></div>
      <label>Local<input value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} required /></label>
      <label>Descrição<textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} /></label>
      <div className="image-field"><span className="field-title">Foto do evento</span>{event.image_url ? <><img className="event-image-preview" src={event.image_url} alt="Pré-visualização do evento" /><div className="image-actions"><label className="upload-button">Trocar foto<input type="file" accept="image/*" onChange={(e) => handleEventImage(e.target.files?.[0])} /></label><button type="button" className="danger-outline" onClick={() => setEvent({ ...event, image_url: '' })}>Excluir foto</button></div></> : <label className="upload-drop">Adicionar foto<input type="file" accept="image/*" onChange={(e) => handleEventImage(e.target.files?.[0])} /><small>JPG, PNG ou WEBP · máximo 2 MB</small></label>}</div>
      <label className="check"><input type="checkbox" checked={event.published} onChange={(e) => setEvent({ ...event, published: e.target.checked })} /> Publicado</label>
      <button className="button">Salvar evento</button>
    </form><div className="list-panel">{events.map((i) => <div className="list-item event-admin-item" key={i.id}><div className="admin-item-main">{i.image_url && <img src={i.image_url} alt="" />}<div><strong>{i.title}</strong><small>{i.event_date} · {i.location} · {i.published ? 'Publicado' : 'Rascunho'}</small></div></div><div><button onClick={() => beginEdit('events', i)}>Editar</button><button className="danger" onClick={() => remove('events', i.id)}>Excluir</button></div></div>)}</div></div>}

    {tab === 'avisos' && <div className="admin-grid"><form className="panel" onSubmit={saveNotice}><h2>{editingId ? 'Editar aviso' : 'Novo aviso'}</h2>
      <label>Título<input value={notice.title} onChange={(e) => setNotice({ ...notice, title: e.target.value })} required /></label>
      <label>Atração relacionada<select value={notice.attraction_id} onChange={(e) => setNotice({ ...notice, attraction_id: e.target.value })}><option value="">Nenhuma</option>{attractions.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}</select></label>
      <label>Descrição<textarea value={notice.description} onChange={(e) => setNotice({ ...notice, description: e.target.value })} required /></label>
      <div className="image-field"><span className="field-title">Foto do aviso</span>{notice.image_url ? <><img className="event-image-preview" src={notice.image_url} alt="Pré-visualização do aviso" /><div className="image-actions"><label className="upload-button">Trocar foto<input type="file" accept="image/*" onChange={(e) => handleNoticeImage(e.target.files?.[0])} /></label><button type="button" className="danger-outline" onClick={() => setNotice({ ...notice, image_url: '' })}>Excluir foto</button></div></> : <label className="upload-drop">Adicionar foto<input type="file" accept="image/*" onChange={(e) => handleNoticeImage(e.target.files?.[0])} /><small>JPG, PNG ou WEBP · máximo 2 MB</small></label>}</div>
      <label className="check"><input type="checkbox" checked={notice.urgent} onChange={(e) => setNotice({ ...notice, urgent: e.target.checked })} /> Aviso urgente</label>
      <label className="check"><input type="checkbox" checked={notice.active} onChange={(e) => setNotice({ ...notice, active: e.target.checked })} /> Ativo</label>
      <button className="button">Salvar</button>
    </form><div className="list-panel">{notices.map((i) => <div className="list-item event-admin-item" key={i.id}><div className="admin-item-main">{i.image_url && <img src={i.image_url} alt="" />}<div><strong>{i.title}</strong><small>{i.urgent ? 'Urgente' : 'Normal'} · {i.active ? 'Ativo' : 'Inativo'}</small></div></div><div><button onClick={() => beginEdit('notices', i)}>Editar</button><button className="danger" onClick={() => remove('notices', i.id)}>Excluir</button></div></div>)}</div></div>}
  </section>;
}
