# Requisitos — Terê Verde Online

## Requisitos funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF01 | O administrador deve realizar login e logout no sistema. | Obrigatório |
| RF02 | O administrador deve cadastrar atrações com nome, descrição, categoria, localização, status e foto opcional. | Obrigatório |
| RF03 | O administrador deve editar e excluir atrações, incluindo alterar, adicionar ou remover foto. | Obrigatório |
| RF04 | O administrador deve alterar o status da atração entre aberta, fechada e em manutenção. | Obrigatório |
| RF05 | O visitante deve listar e filtrar atrações por texto e categoria. | Obrigatório |
| RF06 | O visitante deve abrir a página de detalhes de uma atração e visualizar foto, descrição, local e status. | Obrigatório |
| RF07 | O administrador deve cadastrar eventos com título, data, horário, local, descrição, publicação e foto opcional. | Obrigatório |
| RF08 | O administrador deve editar e excluir eventos, incluindo adicionar, trocar ou remover foto. | Obrigatório |
| RF09 | O visitante deve visualizar apenas eventos publicados e abrir a página de detalhes. | Obrigatório |
| RF10 | O administrador deve cadastrar avisos com título, descrição, atração relacionada, urgência, situação e foto opcional. | Obrigatório |
| RF11 | O administrador deve editar e excluir avisos, incluindo adicionar, trocar ou remover foto. | Obrigatório |
| RF12 | O visitante deve visualizar avisos ativos e abrir seus detalhes. | Obrigatório |
| RF13 | O sistema deve exibir no topo da interface um aviso urgente ativo, quando houver. | Obrigatório |

## Critérios de aceite

### RF01 — Autenticação
- credenciais válidas iniciam uma sessão administrativa;
- credenciais inválidas retornam mensagem clara;
- rotas administrativas não podem ser acessadas sem autenticação;
- logout encerra a sessão.

### RF02 a RF06 — Atrações
- nome, descrição, categoria, localização e status são obrigatórios;
- foto é opcional e deve respeitar o limite de 2 MB;
- atração fechada exige motivo;
- cadastro válido persiste no SQLite;
- visitante consegue abrir detalhes ao clicar no card;
- status é visível na listagem e no detalhe.

### RF07 a RF09 — Eventos
- título, data e local são obrigatórios;
- foto é opcional e pode ser trocada ou removida;
- evento em rascunho não aparece publicamente;
- evento publicado possui página de detalhes.

### RF10 a RF13 — Avisos
- título e descrição são obrigatórios;
- foto é opcional e pode ser trocada ou removida;
- aviso inativo não aparece publicamente;
- aviso urgente ativo recebe destaque e aparece na faixa superior do site;
- card de aviso abre a página de detalhes.

## Requisitos não funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RNF01 | Senhas administrativas devem ser armazenadas com hash. | Obrigatório |
| RNF02 | Rotas administrativas devem exigir autenticação. | Obrigatório |
| RNF03 | A sessão deve utilizar JWT armazenado em cookie HTTP-only. | Obrigatório |
| RNF04 | O Back-End deve validar campos, categorias, status, tamanhos de texto e imagens antes da persistência. | Obrigatório |
| RNF05 | Os dados devem permanecer persistidos em SQLite após reinicialização da aplicação. | Obrigatório |
| RNF06 | Consultas públicas principais devem responder em até 2 segundos em condições normais de laboratório/local. | Obrigatório |
| RNF07 | A interface deve ser responsiva em computador, tablet e celular. | Obrigatório |
| RNF08 | Avisos de segurança e condições de visitação devem ser acessíveis em no máximo dois cliques a partir da página inicial. | Obrigatório |
| RNF09 | O Front-End deve apresentar mensagens claras para erros esperados da API. | Obrigatório |
| RNF10 | O sistema deve respeitar a preferência `prefers-reduced-motion`, reduzindo animações quando solicitado pelo usuário. | Desejável |
| RNF11 | O código deve estar organizado em diretórios, documentado e versionado no GitHub. | Obrigatório |
