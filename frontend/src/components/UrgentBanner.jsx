import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function UrgentBanner() {
  const [notice, setNotice] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    api('/notices')
      .then((items) => setNotice(items.find((item) => Boolean(item.urgent)) || null))
      .catch(() => {});
  }, []);

  if (!notice || hidden) return null;

  return <div className="urgent-banner" role="alert">
    <div className="urgent-banner-inner">
      <span className="urgent-dot" aria-hidden="true" />
      <div className="urgent-copy">
        <strong>Aviso importante</strong>
        <span>{notice.title}{notice.attraction_name ? ` · ${notice.attraction_name}` : ''}</span>
      </div>
      <Link to={`/avisos/${notice.id}`} className="urgent-link">Ver detalhes <span aria-hidden="true">→</span></Link>
      <button type="button" className="urgent-close" onClick={() => setHidden(true)} aria-label="Fechar aviso">×</button>
    </div>
  </div>;
}
