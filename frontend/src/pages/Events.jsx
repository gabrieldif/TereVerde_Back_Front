import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const eventImages = ['/images/evento-trilha.jpg', '/images/evento-gastro.jpg', '/images/evento-montanha.jpg'];

export default function Events() {
  const [items, setItems] = useState([]);
  useEffect(() => { api('/events').then(setItems).catch(() => {}); }, []);

  return <>
    <section className="page-hero events-hero"><div><span className="eyebrow light-eyebrow">Agenda local</span><h1>Eventos em Teresópolis</h1><p>Descubra experiências, encontros e atividades para aproveitar ainda mais a cidade.</p></div></section>
    <section className="section">
      <div className="section-heading-row"><div><span className="eyebrow">Próximos eventos</span><h2>Programe sua visita</h2><p>Clique em um evento para conferir todos os detalhes.</p></div></div>
      <div className="events-grid">
        {items.length ? items.map((e, index) => {
          const date = new Date(`${e.event_date}T00:00:00`);
          const day = String(date.getDate()).padStart(2, '0');
          const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase();
          const image = e.image_url || eventImages[index % eventImages.length];
          return <Link to={`/eventos/${e.id}`} className="event-card event-card-link" key={e.id}>
            <div className="event-image" style={{ backgroundImage: `url(${image})` }}><div className="date-tile"><strong>{day}</strong><span>{month}</span></div></div>
            <div className="event-body"><h3>{e.title}</h3><p>{e.description || 'Confira os detalhes e programe sua participação.'}</p><div className="event-meta"><span>⌖ {e.location}</span>{e.event_time && <span>◷ {e.event_time}</span>}</div><span className="event-details-link">Ver detalhes →</span></div>
          </Link>;
        }) : <div className="empty-state"><h3>Nenhum evento publicado</h3><p>Novos eventos aparecerão aqui assim que forem cadastrados.</p></div>}
      </div>
    </section>
  </>;
}
