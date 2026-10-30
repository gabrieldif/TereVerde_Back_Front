# Terê Verde Online

MVP acadêmico desenvolvido para a disciplina de **Desenvolvimento de Back-End para MVP**, do curso de **Análise e Desenvolvimento de Sistemas — UNIFESO**.

## 1. Identificação

| Informação | Dados |
|---|---|
| Aluno | Gabriel Silva Carvalho |
| Matrícula | 06015152 |
| Modalidade | Trabalho individual |
| Situação-problema | Circuito Terê Verde — Teresópolis |

## 2. Situação-problema

O Circuito Terê Verde precisa disponibilizar informações atualizadas sobre atrações naturais, trilhas, cachoeiras, eventos e condições de visitação em Teresópolis.

O problema central do MVP é evitar que visitantes se desloquem até uma atração sem saber que ela está **fechada, interditada ou em manutenção**.

## 3. Objetivo do MVP

Desenvolver uma aplicação web simples, segura e intuitiva em que:

- administradores autenticados mantenham atrações, eventos e avisos atualizados;
- visitantes consultem essas informações publicamente, sem login;
- avisos urgentes e alterações de status sejam apresentados com destaque.

## 4. Público-alvo

- **Administradores:** responsáveis pelo cadastro e manutenção das informações.
- **Visitantes:** pessoas que desejam consultar atrações, eventos, avisos e condições de visitação.

## 5. Escopo

O MVP contempla:

- login e logout administrativo;
- CRUD de atrações;
- status: Aberta, Fechada ou Em manutenção;
- motivo obrigatório para atração fechada;
- CRUD de eventos;
- publicação/rascunho de eventos;
- CRUD de avisos;
- marcação de avisos urgentes;
- faixa de aviso urgente no topo da interface;
- fotos opcionais em atrações, eventos e avisos, com inclusão, troca e remoção;
- páginas públicas de detalhes;
- busca e filtro de atrações no Front-End;
- persistência em SQLite;
- validações no Back-End;
- autenticação com JWT em cookie HTTP-only;
- interface responsiva com animações CSS leves.

## 6. Fora do escopo

- pagamentos e venda de ingressos;
- reservas;
- aplicativo mobile nativo;
- login de visitantes e favoritos;
- recomendações por inteligência artificial;
- integração automática com redes sociais;
- envio automático de e-mails;
- integração com mapas/calendários externos;
- relatórios e gráficos avançados.

## 7. Tecnologias utilizadas

### Front-End

- React 18
- Vite
- React Router
- CSS responsivo com animações leves e suporte a `prefers-reduced-motion`

### Back-End

- Node.js
- Express
- SQLite
- JWT
- bcryptjs
- Cookie HTTP-only

## 8. Arquitetura

```text
Navegador
   │
   ▼
React + Vite
   │ HTTP / JSON
   ▼
Node.js + Express
   │
   ├── JWT + cookie HTTP-only
   │
   ▼
SQLite
```

Documentação detalhada: `documentação/ARQUITETURA.md`.

## 9. Estrutura do projeto

```text
TereVerde/
├── ABRIR_TERE_VERDE.vbs              <- duplo clique: inicia tudo e abre o navegador
├── PARAR_TERE_VERDE.vbs              <- encerra Back-End e Front-End
├── ABRIR_TERE_VERDE_COM_JANELA.bat   <- alternativa que mostra as janelas (diagnóstico)
├── Readme.md
├── Tere Verde Apresentação.docx
├── .gitignore
│
├── scripts/                          <- usados pelos .vbs (não precisa abrir)
│   ├── iniciar-backend.cmd
│   ├── iniciar-frontend.cmd
│   └── parar.cmd
│
├── documentação/
│   ├── API.md
│   ├── ARQUITETURA.md
│   ├── BANCO_DADOS.md
│   ├── CASOS_DE_USO.md
│   ├── CHECKLIST_ENTREGA.md
│   ├── ESCOPO.md
│   ├── REGRAS_NEGOCIO.md
│   ├── REQUISITOS.md
│   └── ANALISE_E_CORRECOES.md
│
├── backend/
│   ├── data/                         <- banco SQLite (criado automaticamente)
│   ├── src/
│   ├── tests/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/images/
│   ├── src/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── logs/                             <- criada ao iniciar (backend.log / frontend.log)
```

## 10. Como executar

### Forma mais simples — Windows

**Pré-requisito:** [Node.js](https://nodejs.org) versão LTS (18.12 ou mais nova). O iniciador avisa se ele não estiver instalado.

1. **Extraia o projeto inteiro** do `.zip` (botão direito → *Extrair tudo*). Não execute o arquivo de dentro do `.zip`.
2. Dê dois cliques em:

```text
ABRIR_TERE_VERDE.vbs
```

3. Aguarde. Uma mensagem informa que o sistema está iniciando e o navegador abre sozinho quando o site estiver pronto. Na **primeira execução** pode levar alguns minutos, pois as dependências podem precisar ser baixadas (é preciso internet).

Para **encerrar**, dê dois cliques em `PARAR_TERE_VERDE.vbs`.

Endereços:

```text
Site:  http://127.0.0.1:5173
API:   http://127.0.0.1:3001/api/health
```

O iniciador é seguro para abrir mais de uma vez: se o sistema já estiver no ar, apenas abre o navegador.

### Se não abrir

* **Veja a mensagem de erro:** em caso de falha, o iniciador mostra as últimas linhas do log e oferece abrir o arquivo completo (`logs\backend.log` ou `logs\frontend.log`).
* **Use o modo com janelas:** dê dois cliques em `ABRIR_TERE_VERDE_COM_JANELA.bat`. Duas janelas mostram tudo o que o Back-End e o Front-End estão fazendo.
* **Porta ocupada (3001 ou 5173):** execute `PARAR_TERE_VERDE.vbs` e tente de novo.
* **"O Windows Script Host está desabilitado":** use `ABRIR_TERE_VERDE_COM_JANELA.bat`, que não depende do WSH.
* **Dependências com problema:** apague as pastas `backend\node_modules` e `frontend\node_modules` e abra de novo; elas serão reinstaladas automaticamente.

### Execução manual (CMD)

Back-End:

```bash
cd backend
npm install
npm start          # ou: npm run dev  (reinicia ao salvar arquivos)
```

Front-End, em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Em seguida acesse `http://127.0.0.1:5173`. O Vite encaminha as chamadas `/api` para o Back-End (porta 3001), por isso não há configuração de CORS a fazer.

## 11. Credenciais de teste

> Utilizar somente no ambiente acadêmico/local.

```text
E-mail: admin@tereverde.local
Senha: admin123
```

## 12. Principais requisitos funcionais

- RF01 — Autenticar administrador.
- RF02 a RF06 — Gerenciar e consultar atrações.
- RF07 a RF09 — Gerenciar e consultar eventos.
- RF10 a RF13 — Gerenciar e consultar avisos, incluindo destaque urgente.

Critérios de aceite e prioridades estão em `documentação/REQUISITOS.md`.

## 13. Requisitos não funcionais

Entre os principais:

- senhas armazenadas com hash;
- rotas administrativas protegidas;
- JWT em cookie HTTP-only;
- validação centralizada no Back-End;
- persistência em SQLite;
- consultas públicas adequadas ao uso local/laboratório;
- interface responsiva;
- erros claros para o usuário;
- código organizado e versionado.

## 14. Rotas principais da API

### Autenticação

```text
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Atrações

```text
GET    /api/attractions
GET    /api/attractions/:id
POST   /api/attractions
PUT    /api/attractions/:id
PATCH  /api/attractions/:id/status
DELETE /api/attractions/:id
```

### Eventos

```text
GET    /api/events
GET    /api/events/:id
GET    /api/events/admin/all
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Avisos

```text
GET    /api/notices
GET    /api/notices/:id
GET    /api/notices/admin/all
POST   /api/notices
PUT    /api/notices/:id
DELETE /api/notices/:id
```

Exemplos de entrada, respostas e códigos HTTP: `documentação/API.md`.

## 15. Banco de dados

O sistema utiliza SQLite e cria automaticamente o arquivo:

```text
backend/data/tereverde.db
```

Entidades principais:

- administradores;
- atrações;
- eventos;
- avisos.

Modelo e índices: `documentação/BANCO_DADOS.md`.

## 16. Testes

O projeto possui testes unitários e de integração.

```bash
cd backend
npm test
```

Os testes cobrem validação, autenticação, proteção de rota, criação de atração, erros `400/401/404` e resposta da API.

## 17. Documentação complementar

- `documentação/ESCOPO.md` — problema, objetivo e fronteira do MVP;
- `documentação/REQUISITOS.md` — RF, RNF, prioridades e critérios de aceite;
- `documentação/REGRAS_NEGOCIO.md` — regras aplicadas pelo sistema;
- `documentação/CASOS_DE_USO.md` — fluxos principais e alternativos;
- `documentação/API.md` — endpoints, exemplos e códigos HTTP;
- `documentação/BANCO_DADOS.md` — modelo de dados, integridade e índices;
- `documentação/ARQUITETURA.md` — visão cliente-servidor e responsabilidades;
- `Tere Verde Apresentação.docx` (na raiz do projeto) — material de apresentação do projeto.

## 18. Versionamento no GitHub

Exemplo de fluxo:

```bash
git init
git add .
git commit -m "Initial Terê Verde MVP"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```

Durante o desenvolvimento, utilize commits descritivos para registrar evolução do projeto.

## 19. Resumo

O **Terê Verde Online** é um MVP focado em um problema simples e real: permitir que visitantes verifiquem atrações, eventos, avisos e condições de visitação antes de se deslocarem.

A solução utiliza uma arquitetura cliente-servidor com Front-End React, API Express, autenticação administrativa e persistência SQLite, mantendo o escopo pequeno e coerente com a proposta acadêmica.
