export default function StatusBadge({ status }) {
  const label = status === 'EM_MANUTENCAO' ? 'Em manutenção' : status === 'FECHADA' ? 'Fechada' : 'Aberta';
  return <span className={`status ${status.toLowerCase()}`}>{label}</span>;
}
