import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function NoticeDetails() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/notices/${id}`).then(setNotice).catch((err) => setError(err.message));
  }, [id]);

  if (error) return <section className="section detail-state"><h1>Aviso não encontrado</h1><p>{error}</p><Link className="button" to="/avisos">Voltar para avisos</Link></section>;
  if (!notice) return <section className="section detail-state"><p>Carregando aviso...</p></section>;

  const image = notice.image_url || '/images/hero.jpg';

  return <>
    <section className="event-detail-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="event-detail-overlay" />
      <div className="event-detail-hero-content"><span className="eyebrow light-eyebrow">Aviso · Terê Verde</span><h1>{notice.title}</h1><p>{notice.urgent ? 'Aviso urgente' : 'Aviso informativo'}</p></div>
    </section>
    <section className="section event-detail-layout">
      <article className="event-detail-main"><Link className="back-link" to="/avisos">← Voltar para avisos</Link><h2>Detalhes do aviso</h2><p className="event-detail-description">{notice.description}</p></article>
      <aside className="event-detail-card"><h3>Informações</h3><div><span>Tipo</span><strong>{notice.urgent ? 'Urgente' : 'Informativo'}</strong></div><div><span>Status</span><strong>{notice.active ? 'Ativo' : 'Inativo'}</strong></div>{notice.attraction_name && <div><span>Atração relacionada</span><strong>{notice.attraction_name}</strong></div>}<Link className="button full-button" to="/atracoes">Ver atrações</Link></aside>
    </section>
  </>;
}
