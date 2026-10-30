import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/events/${id}`).then(setEvent).catch((err) => setError(err.message));
  }, [id]);

  if (error) return <section className="section detail-state"><h1>Evento não encontrado</h1><p>{error}</p><Link className="button" to="/eventos">Voltar para eventos</Link></section>;
  if (!event) return <section className="section detail-state"><p>Carregando evento...</p></section>;

  const date = new Date(`${event.event_date}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const image = event.image_url || '/images/evento-montanha.jpg';

  return <>
    <section className="event-detail-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="event-detail-overlay" />
      <div className="event-detail-hero-content"><span className="eyebrow light-eyebrow">Evento · Terê Verde</span><h1>{event.title}</h1><p>{date}{event.event_time ? ` · ${event.event_time}` : ''}</p></div>
    </section>
    <section className="section event-detail-layout">
      <article className="event-detail-main"><Link className="back-link" to="/eventos">← Voltar para eventos</Link><h2>Sobre o evento</h2><p className="event-detail-description">{event.description || 'Evento da programação turística de Teresópolis.'}</p></article>
      <aside className="event-detail-card"><h3>Informações</h3><div><span>Data</span><strong>{date}</strong></div>{event.event_time && <div><span>Horário</span><strong>{event.event_time}</strong></div>}<div><span>Local</span><strong>{event.location}</strong></div><Link className="button full-button" to="/eventos">Ver outros eventos</Link></aside>
    </section>
  </>;
}
