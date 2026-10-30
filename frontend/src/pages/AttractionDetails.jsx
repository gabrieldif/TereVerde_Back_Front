import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';

const fallbackImage = (category) => {
  const key = (category || '').toLowerCase();
  if (key.includes('cach')) return '/images/cachoeira.jpg';
  if (key.includes('mir')) return '/images/mirante.jpg';
  if (key.includes('parque')) return '/images/cultura.jpg';
  return '/images/trilha.jpg';
};

export default function AttractionDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/attractions/${id}`).then(setItem).catch((err) => setError(err.message));
  }, [id]);

  if (error) return <section className="section detail-state"><h1>Atração não encontrada</h1><p>{error}</p><Link className="button" to="/atracoes">Voltar para atrações</Link></section>;
  if (!item) return <section className="section detail-state"><p>Carregando atração...</p></section>;

  const image = item.image_url || fallbackImage(item.category);

  return <>
    <section className="event-detail-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="event-detail-overlay" />
      <div className="event-detail-hero-content"><span className="eyebrow light-eyebrow">Atração · Terê Verde</span><h1>{item.name}</h1><p>{item.location}</p></div>
    </section>
    <section className="section event-detail-layout">
      <article className="event-detail-main"><Link className="back-link" to="/atracoes">← Voltar para atrações</Link><div className="detail-header-row"><h2>Sobre a atração</h2><StatusBadge status={item.status} /></div><p className="event-detail-description">{item.description}</p>{item.closure_reason && <div className="closure-box detail-closure"><strong>Motivo do fechamento</strong><span>{item.closure_reason}</span></div>}</article>
      <aside className="event-detail-card"><h3>Informações</h3><div><span>Categoria</span><strong>{item.category}</strong></div><div><span>Local</span><strong>{item.location}</strong></div><div><span>Status</span><strong>{item.status.replace('_', ' ')}</strong></div><Link className="button full-button" to="/avisos">Ver avisos</Link></aside>
    </section>
  </>;
}
