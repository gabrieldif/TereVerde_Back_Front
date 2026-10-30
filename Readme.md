# Terê Verde Online

MVP acadêmico desenvolvido para a disciplina de **MVP BACK-END DEVELOPMENT**, do curso de **Análise e Desenvolvimento de Sistemas — UNIFESO**.

Github - https://github.com/gabrieldif/TereVerde_Back_Front

## 1\. Identificação

|Informação|Dados|
|-|-|
|Aluno|Gabriel Silva Carvalho|
|Matrícula|06015152|
|Modalidade|Trabalho individual|
|Situação-problema|Circuito Terê Verde — Teresópolis|

## 2\. Situação-problema

O Circuito Terê Verde precisa disponibilizar informações atualizadas sobre atrações naturais, trilhas, cachoeiras, eventos e condições de visitação em Teresópolis.

O problema central do MVP é evitar que visitantes se desloquem até uma atração sem saber que ela está **fechada, interditada ou em manutenção**.

## 3\. Objetivo do MVP

Desenvolver uma aplicação web simples, segura e intuitiva em que:

* administradores autenticados mantenham atrações, eventos e avisos atualizados;
* visitantes consultem essas informações publicamente, sem login;
* avisos urgentes e alterações de status sejam apresentados com destaque.

## 4\. Público-alvo

* **Administradores:** responsáveis pelo cadastro e manutenção das informações.
* **Visitantes:** pessoas que desejam consultar atrações, eventos, avisos e condições de visitação.

## 5\. Escopo

O MVP contempla:

* login e logout administrativo;
* CRUD de atrações;
* status: Aberta, Fechada ou Em manutenção;
* motivo obrigatório para atração fechada;
* CRUD de eventos;
* publicação/rascunho de eventos;
* CRUD de avisos;
* marcação de avisos urgentes;
* faixa de aviso urgente no topo da interface;
* fotos opcionais em atrações, eventos e avisos, com inclusão, troca e remoção;
* páginas públicas de detalhes;
* busca e filtro de atrações no Front-End;
* persistência em SQLite;
* validações no Back-End;
* autenticação com JWT em cookie HTTP-only;
* interface responsiva com animações CSS leves.

## 6\. Fora do escopo

* pagamentos e venda de ingressos;
* reservas;
* aplicativo mobile nativo;
* login de visitantes e favoritos;
* recomendações por inteligência artificial;
* integração automática com redes sociais;
* envio automático de e-mails;
* integração com mapas/calendários externos;
* relatórios e gráficos avançados.

## 7\. Tecnologias utilizadas

### Front-End

* React 18
* Vite
* React Router
* CSS responsivo com animações leves e suporte a `prefers-reduced-motion`

### Back-End

* Node.js
* Express
* SQLite
* JWT
* bcryptjs
* Cookie HTTP-only

## 8\. Arquitetura

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

## 9\. Estrutura do projeto

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

## 10\. Como executar

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

## 11\. Credenciais de teste

> Utilizar somente no ambiente acadêmico/local.

```text
E-mail: admin@tereverde.local
Senha: admin123
```

## 12\. Requisitos Funcionais

RF01 — O sistema deve permitir que o administrador realize login com usuário e senha.

RF02 — O administrador deve cadastrar atrações com nome, descrição, categoria, localização, status e foto opcional.

RF03 — O administrador deve editar atrações existentes, incluindo adicionar, trocar ou remover a foto.

RF04 — O administrador deve excluir atrações.

RF05 — O administrador deve alterar o status da atração entre: Aberta, Fechada, Em manutenção

RF06 — O visitante deve visualizar a lista de atrações cadastradas.

RF07 — O visitante deve visualizar os detalhes de uma atração ao clicar nela, incluindo descrição, localização, categoria, foto e status atual.

RF08 — O administrador deve cadastrar eventos com título, descrição, data, horário, local, foto opcional e status de publicação.

RF09 — O administrador deve editar e excluir eventos, incluindo adicionar, trocar ou remover a foto.

RF10 — O visitante deve visualizar os eventos publicados e acessar a página de detalhes de cada evento.

RF11 — O administrador deve cadastrar avisos com título, descrição, indicação de urgência, atração relacionada opcionalmente e foto opcional.

RF12 — O administrador deve editar e excluir avisos, incluindo adicionar, trocar ou remover a foto.

RF13 — O visitante deve visualizar os avisos ativos e acessar a página de detalhes de cada aviso.

RF14 — O sistema deve destacar avisos urgentes na área pública.

RF15 — O sistema deve exibir uma faixa de alerta no topo da interface quando existir aviso urgente ativo.

RF16 — O visitante deve poder pesquisar atrações por nome ou localização.

RF17 — O visitante deve poder filtrar atrações por categoria.

RF18 — O sistema deve permitir que o administrador encerre sua sessão por meio da função de logout.

## 13\. Requisitos Não Funcionais

RNF01 — As senhas dos administradores devem ser armazenadas utilizando hash, nunca em texto puro.

RNF02 — As rotas de cadastro, edição e exclusão devem exigir autenticação administrativa.

RNF03 — A autenticação deve utilizar JWT armazenado em cookie HTTP-only.

RNF04 — O Back-End deve validar os dados recebidos antes de gravá-los no banco de dados.

RNF05 — Os dados devem permanecer persistidos em banco SQLite após o encerramento da aplicação.

RNF06 — A interface deve funcionar adequadamente em computadores, tablets e celulares.

RNF07 — O Front-End deve exibir mensagens claras quando ocorrerem erros de autenticação, validação ou comunicação com a API.

RNF08 — As consultas públicas principais devem responder em tempo adequado para uso local e em ambiente de laboratório.

RNF09 — A listagem de atrações deve carregar em até 2 segundos em condições normais de uso local.

RNF10 — As imagens enviadas pelo administrador devem aceitar apenas formatos de imagem suportados pelo sistema, como JPG, PNG e WEBP.

RNF11 — As imagens enviadas devem possuir tamanho máximo de 2 MB.

RNF12 — O sistema deve utilizar consultas parametrizadas no banco de dados para reduzir riscos de injeção de SQL.

RNF13 — A API deve retornar respostas em formato JSON e utilizar códigos HTTP adequados para sucesso e erro.

RNF14 — O código-fonte deve ser organizado em diretórios separados para Front-End, Back-End, testes, dados e documentação.

RNF15 — O sistema deve possuir documentação suficiente para permitir que outro desenvolvedor compreenda e execute o projeto.

RNF16 — O projeto deve ser versionado com Git e preparado para publicação no GitHub.

RNF17 — As animações da interface devem ser leves e não devem comprometer a navegação ou o desempenho.

RNF18 — A interface deve respeitar a preferência prefers-reduced-motion, reduzindo animações para usuários que tenham essa configuração ativada.

## 14\. Rotas principais da API

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

## 15\. Banco de dados

O sistema utiliza SQLite e cria automaticamente o arquivo:

```text
backend/data/tereverde.db
```

Entidades principais:

* administradores;
* atrações;
* eventos;
* avisos.

Modelo e índices: `documentação/BANCO\_DADOS.md`.

## 16\. Testes

O projeto possui testes unitários e de integração.

```bash
cd backend
npm test
```

Os testes cobrem validação, autenticação, proteção de rota, criação de atração, erros `400/401/404` e resposta da API.

## 17\. Documentação complementar

* `documentação/ESCOPO.md` — problema, objetivo e fronteira do MVP;
* `documentação/REQUISITOS.md` — RF, RNF, prioridades e critérios de aceite;
* `documentação/REGRAS\_NEGOCIO.md` — regras aplicadas pelo sistema;
* `documentação/CASOS\_DE\_USO.md` — fluxos principais e alternativos;
* `documentação/API.md` — endpoints, exemplos e códigos HTTP;
* `documentação/BANCO\_DADOS.md` — modelo de dados, integridade e índices;
* `documentação/ARQUITETURA.md` — visão cliente-servidor e responsabilidades;
* `Tere Verde Apresentação.docx` (na raiz do projeto) — material de apresentação do projeto.

## 18\. Versionamento no GitHub

Exemplo de fluxo:

```bash
git init
git add .
git commit -m "Initial Terê Verde MVP"
git branch -M main
git remote add origin URL\_DO\_REPOSITORIO
git push -u origin main
```

Durante o desenvolvimento, utilizei commits descritivos para registrar evolução do projeto.

## 19\. Resumo

O **Terê Verde Online** é um MVP focado em um problema simples e real: permitir que visitantes verifiquem atrações, eventos, avisos e condições de visitação antes de se deslocarem.

A solução utiliza uma arquitetura cliente-servidor com Front-End React, API Express, autenticação administrativa e persistência SQLite, mantendo o escopo pequeno e coerente com a proposta acadêmica.

