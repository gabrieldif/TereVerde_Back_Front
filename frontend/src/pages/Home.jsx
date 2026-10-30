import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';

const fallbackAttractions = [
  { id: 'f1', name: 'Cachoeiras de Teresópolis', category: 'Cachoeira', location: 'Teresópolis - RJ', status: 'ABERTA', description: 'Natureza, águas cristalinas e paisagens para um passeio inesquecível.', image_url: '/images/cachoeira.jpg' },
  { id: 'f2', name: 'Trilhas da Serra dos Órgãos', category: 'Trilha', location: 'Teresópolis - RJ', status: 'ABERTA', description: 'Rotas cercadas pela Mata Atlântica, com diferentes níveis de dificuldade.', image_url: '/images/trilha.jpg' },
  { id: 'f3', name: 'Mirantes da Serra', category: 'Mirante', location: 'Teresópolis - RJ', status: 'ABERTA', description: 'Vistas panorâmicas para as montanhas e cartões-postais da região.', image_url: '/images/mirante.jpg' }
];

const imageFor = (item) => {
  if (item?.image_url) return item.image_url;
  const key = (item?.category || '').toLowerCase();
  if (key.includes('cach')) return '/images/cachoeira.jpg';
  if (key.includes('mir')) return '/images/mirante.jpg';
  if (key.includes('parque')) return '/images/cultura.jpg';
  return '/images/trilha.jpg';
};

export default function Home() {
  const [attractions, setAttractions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([api('/attractions'), api('/notices'), api('/events')]).then(([a, n, e]) => {
      setAttractions(a.slice(0, 3));
      setNotices(n.slice(0, 3));
      setEvents(e.slice(0, 3));
    }).catch(() => {});
  }, []);

  const featured = attractions.length ? attractions : fallbackAttractions;

  return <>
    <section className="hero-modern">
      <div className="hero-photo" />
      <div className="hero-overlay" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-content entrance">
        <span className="hero-kicker">NATUREZA · AVENTURA · CULTURA</span>
        <h1>Descubra o melhor de <em>Teresópolis</em></h1>
        <p>Trilhas, cachoeiras, mirantes, eventos e informações atualizadas para você aproveitar a serra com mais segurança.</p>
        <div className="hero-actions">
          <Link className="button button-light" to="/atracoes">Explorar atrações <span aria-hidden="true">→</span></Link>
          <Link className="button button-outline" to="/avisos">Conferir avisos</Link>
        </div>
        <div className="hero-trust"><span><b>Atualizado</b><small>status e interdições</small></span><span><b>Simples</b><small>consulta sem login</small></span><span><b>Consciente</b><small>turismo responsável</small></span></div>
      </div>
      <div className="feature-strip">
        <Link to="/atracoes"><span className="feature-icon">↗</span><span><strong>Atrações naturais</strong><small>Trilhas, cachoeiras e mirantes</small></span></Link>
        <Link to="/eventos"><span className="feature-icon">◇</span><span><strong>Eventos</strong><small>Programação local atualizada</small></span></Link>
        <Link to="/avisos"><span className="feature-icon">!</span><span><strong>Avisos importantes</strong><small>Interdições e condições de visita</small></span></Link>
      </div>
    </section>

    <section className="section intro-section reveal-section">
      <div className="section-heading-row">
        <div><span className="eyebrow">Explore Teresópolis</span><h2>Atrações em destaque</h2><p>Conheça lugares que fazem da serra um destino especial e confira a situação antes de sair.</p></div>
        <Link className="text-link" to="/atracoes">Ver todas as atrações <span>→</span></Link>
      </div>
      <div className="destination-grid">
        {featured.map((a, index) => <Link to={String(a.id).startsWith('f') ? '/atracoes' : `/atracoes/${a.id}`} className="destination-card destination-link" style={{ '--delay': `${index * 80}ms` }} key={a.id}>
          <div className="destination-image" style={{ backgroundImage: `url(${imageFor(a)})` }}><span className="category-chip">{a.category}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
          <div className="destination-body">
            <div className="destination-title-row"><h3>{a.name}</h3><StatusBadge status={a.status} /></div>
            <p>{a.description}</p>
            <div className="destination-meta"><span>⌖ {a.location}</span></div>
            {a.closure_reason && <p className="warning">Motivo: {a.closure_reason}</p>}
          </div>
        </Link>)}
      </div>
    </section>

    <section className="notice-band reveal-section">
      <div className="section notice-section">
        <div className="section-heading-row light-heading">
          <div><span className="eyebrow">Antes de sair</span><h2>Avisos e condições atuais</h2><p>Informação rápida para evitar deslocamentos até locais indisponíveis.</p></div>
          <Link className="text-link text-link-light" to="/avisos">Ver todos os avisos →</Link>
        </div>
        <div className="notice-grid">
          {notices.length ? notices.map((n, index) => <Link to={`/avisos/${n.id}`} className={`notice-card notice-card-link ${n.urgent ? 'urgent' : ''}`} style={{ '--delay': `${index * 90}ms` }} key={n.id}>
            {n.image_url && <div className="notice-card-image" style={{ backgroundImage: `url(${n.image_url})` }} />}
            <span className="notice-type">{n.urgent ? 'Aviso urgente' : 'Informativo'}</span>
            <h3>{n.title}</h3><p>{n.description}</p>
            {n.attraction_name && <small>Relacionado a {n.attraction_name}</small>}
            <span className="event-details-link">Ver detalhes →</span>
          </Link>) : <article className="notice-card calm"><span className="notice-type">Tudo certo</span><h3>Nenhum aviso ativo no momento</h3><p>Não há alertas cadastrados para as atrações neste momento.</p></article>}
        </div>
      </div>
    </section>

    <section className="section reveal-section">
      <div className="section-heading-row"><div><span className="eyebrow">Agenda na serra</span><h2>Próximos eventos</h2><p>Inclua experiências locais no seu roteiro.</p></div><Link className="text-link" to="/eventos">Ver agenda completa →</Link></div>
      <div className="events-grid compact-events">
        {events.length ? events.map((e, index) => <Link to={`/eventos/${e.id}`} className="event-card event-card-link" style={{ '--delay': `${index * 80}ms` }} key={e.id}>
          <div className="event-image" style={{ backgroundImage: `url(${e.image_url || ['/images/evento-trilha.jpg','/images/evento-gastro.jpg','/images/evento-montanha.jpg'][index % 3]})` }} />
          <div className="event-body"><span className="mini-label">{new Date(`${e.event_date}T00:00:00`).toLocaleDateString('pt-BR')}</span><h3>{e.title}</h3><div className="event-meta"><span>⌖ {e.location}</span></div><span className="event-details-link">Ver detalhes →</span></div>
        </Link>) : <div className="empty-state"><h3>Nenhum evento publicado</h3><p>Novos eventos aparecerão aqui assim que forem cadastrados.</p></div>}
      </div>
    </section>

    <section className="section conscious-section reveal-section">
      <div className="conscious-copy"><span className="eyebrow">Turismo consciente</span><h2>Explore, respeite e preserve.</h2><p>Planeje sua visita, confira as condições das atrações e ajude a conservar a natureza de Teresópolis.</p><div className="check-list"><span>✓ Consulte o status antes de sair</span><span>✓ Respeite interdições e orientações</span><span>✓ Preserve trilhas e áreas naturais</span></div><Link className="button" to="/atracoes">Planejar minha visita</Link></div>
      <div className="conscious-photo" role="img" aria-label="Montanhas de Teresópolis"><span className="photo-caption">Serra dos Órgãos · Teresópolis</span></div>
    </section>
  </>;
}
