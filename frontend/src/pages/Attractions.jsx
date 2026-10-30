import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';

const imageFor = (item) => {
  if (item?.image_url) return item.image_url;
  const category = item?.category;

  const key = (category || '').toLowerCase();
  if (key.includes('cach')) return '/images/cachoeira.jpg';
  if (key.includes('mir')) return '/images/mirante.jpg';
  if (key.includes('parque')) return '/images/cultura.jpg';
  return '/images/trilha.jpg';
};

export default function Attractions() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  useEffect(() => { api('/attractions').then(setItems).catch(() => {}); }, []);
  const categories = ['Todas', ...new Set(items.map((i) => i.category))];
  const filtered = useMemo(() => items.filter((i) => {
    const matchText = `${i.name} ${i.category} ${i.location}`.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === 'Todas' || i.category === category;
    return matchText && matchCategory;
  }), [items, query, category]);

  return <>
    <section className="page-hero attractions-hero"><div><span className="eyebrow light-eyebrow">Natureza e ecoturismo</span><h1>Explore as atrações</h1><p>Encontre trilhas, cachoeiras, parques e mirantes e confira a situação de cada local antes da visita.</p></div></section>
    <section className="section">
      <div className="filters-bar">
        <div className="search-wrap"><span>⌕</span><input className="search" placeholder="Buscar por nome ou local..." value={query} onChange={(e) => setQuery(e.target.value)} /></div>
        <select className="category-filter" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
      </div>
      <div className="destination-grid attractions-grid">
        {filtered.map((a) => <Link to={`/atracoes/${a.id}`} className="destination-card destination-link" key={a.id}>
          <div className="destination-image tall" style={{ backgroundImage: `url(${imageFor(a)})` }}><span className="category-chip">{a.category}</span></div>
          <div className="destination-body">
            <div className="destination-title-row"><h3>{a.name}</h3><StatusBadge status={a.status} /></div>
            <p>{a.description}</p>
            <div className="destination-meta"><span>⌖ {a.location}</span></div>
            {a.closure_reason && <div className="closure-box"><strong>Atenção</strong><span>{a.closure_reason}</span></div>}
          </div>
            <span className="event-details-link">Ver detalhes →</span>
        </Link>)}
        {!filtered.length && <div className="empty-state"><h3>Nenhuma atração encontrada</h3><p>Tente outro termo de busca ou categoria.</p></div>}
      </div>
    </section>
  </>;
}
