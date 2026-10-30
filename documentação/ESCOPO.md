# Escopo — Terê Verde Online

## Situação-problema

O Circuito Terê Verde precisa disponibilizar informações atualizadas sobre atrações naturais, trilhas, cachoeiras, eventos e condições de visitação em Teresópolis. O problema central do MVP é reduzir deslocamentos desnecessários até atrações que estejam fechadas, interditadas ou em manutenção.

## Objetivo

Disponibilizar uma aplicação web em que administradores autenticados mantenham atrações, eventos e avisos atualizados e visitantes consultem essas informações publicamente, sem necessidade de login.

## Público-alvo

- **Administrador:** mantém atrações, eventos, avisos, imagens e status atualizados.
- **Visitante:** consulta informações públicas, condições de visitação e detalhes das atrações e eventos.

## Dentro do escopo

- autenticação administrativa;
- CRUD de atrações;
- status de atração: Aberta, Fechada ou Em manutenção;
- motivo obrigatório para atração fechada;
- foto opcional em atrações, com inclusão, troca e remoção;
- CRUD de eventos;
- foto opcional em eventos, com inclusão, troca e remoção;
- publicação/rascunho de eventos;
- CRUD de avisos;
- foto opcional em avisos, com inclusão, troca e remoção;
- avisos ativos/inativos e marcação de urgência;
- faixa de aviso urgente no topo do site;
- consulta pública e página de detalhes de atrações, eventos e avisos;
- persistência em SQLite;
- validação centralizada no Back-End;
- autenticação com JWT em cookie HTTP-only;
- interface responsiva.

## Fora do escopo

- pagamentos e venda de ingressos;
- reservas;
- aplicativo mobile nativo;
- login de visitantes;
- favoritos;
- recomendações por inteligência artificial;
- integração automática com redes sociais;
- envio automático de e-mails;
- integração com mapas ou calendários externos;
- relatórios e gráficos avançados;
- monitoramento de produção com Prometheus/Grafana;
- MFA e gestão complexa de papéis de usuário.

## Evoluções futuras possíveis

- mapa interativo de atrações;
- reservas e ingressos;
- favoritos e perfil de visitante;
- histórico/auditoria de alterações;
- soft delete;
- publicação online e pipeline de CI/CD.
