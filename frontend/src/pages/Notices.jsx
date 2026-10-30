import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Notices() {
  const [items, setItems] = useState([]);
  useEffect(() => { api('/notices').then(setItems).catch(() => {}); }, []);

  return <>
    <section className="page-hero notices-hero"><div><span className="eyebrow light-eyebrow">Informações em tempo real</span><h1>Avisos importantes</h1><p>Acompanhe interdições, orientações e atualizações antes da sua visita.</p></div></section>
    <section className="section">
      <div className="section-heading-row"><div><span className="eyebrow">Condições atuais</span><h2>Alertas e orientações</h2><p>Clique em um aviso para ver os detalhes completos.</p></div></div>
      <div className="notice-grid">
        {items.length ? items.map((n) => <Link to={`/avisos/${n.id}`} className={`notice-card notice-card-link ${n.urgent ? 'urgent' : ''}`} key={n.id}>
          {n.image_url && <div className="notice-card-image" style={{ backgroundImage: `url(${n.image_url})` }} />}
          <span className="notice-type">{n.urgent ? 'Aviso urgente' : 'Informativo'}</span>
          <h3>{n.title}</h3>
          <p>{n.description}</p>
          {n.attraction_name && <small>Relacionado a {n.attraction_name}</small>}
          <span className="event-details-link">Ver detalhes →</span>
        </Link>) : <article className="notice-card calm"><span className="notice-type">Tudo certo</span><h3>Nenhum aviso ativo no momento</h3><p>Não há alertas cadastrados para as atrações neste momento.</p></article>}
      </div>
    </section>
  </>;
}
