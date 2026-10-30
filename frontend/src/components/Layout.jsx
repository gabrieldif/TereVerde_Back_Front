import { Link, NavLink } from 'react-router-dom';
import UrgentBanner from './UrgentBanner';

function MountainMark() {
  return <svg viewBox="0 0 56 44" aria-hidden="true" className="brand-svg">
    <path d="M4 38 19 12l8 13 6-9 19 22H4Z" fill="currentColor" opacity=".22" />
    <path d="M4 38 19 12l8 13M23 38l10-22 19 22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export default function Layout({ children }) {
  return <>
    <UrgentBanner />
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/" aria-label="Terê Verde - início">
          <span className="brand-mark"><MountainMark /></span>
          <span><strong>Terê Verde</strong><small>Descubra Teresópolis</small></span>
        </Link>
        <nav aria-label="Navegação principal">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/atracoes">Atrações</NavLink>
          <NavLink to="/eventos">Eventos</NavLink>
          <NavLink to="/avisos">Avisos</NavLink>
          <NavLink className="admin-link" to="/admin">Área administrativa</NavLink>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer>
      <div className="footer-inner">
        <div className="footer-brand"><MountainMark /><div><strong>Terê Verde Online</strong><p>Informação para explorar Teresópolis com segurança e consciência.</p></div></div>
        <div className="footer-links"><Link to="/atracoes">Atrações</Link><Link to="/eventos">Eventos</Link><Link to="/avisos">Avisos</Link></div>
        <span>Projeto acadêmico · UNIFESO</span>
      </div>
    </footer>
  </>;
}
