# Arquitetura — Terê Verde Online

## Visão geral

```text
┌─────────────────────────┐
│ Navegador do visitante  │
│ ou administrador        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Front-End               │
│ React + Vite            │
│ telas, formulários, UX  │
└───────────┬─────────────┘
            │ HTTP / JSON
            │ credentials: include
            ▼
┌─────────────────────────┐
│ API REST                │
│ Node.js + Express       │
│ rotas, validações, RN   │
└───────┬─────────┬───────┘
        │         │
        │         └── JWT em cookie HTTP-only
        ▼
┌─────────────────────────┐
│ SQLite                  │
│ persistência local      │
└─────────────────────────┘
```

## Responsabilidades

### Front-End
- apresenta conteúdo público;
- disponibiliza formulários administrativos;
- trata mensagens de erro da API;
- envia e recebe JSON via HTTP;
- possui animações CSS leves e responsivas.

### Back-End
- autentica administrador;
- autoriza rotas protegidas;
- aplica regras de negócio;
- valida campos e imagens;
- executa CRUD;
- retorna códigos HTTP e JSON padronizados.

### Banco de dados
- persiste administradores, atrações, eventos e avisos;
- usa chave estrangeira de aviso para atração;
- possui índices para consultas frequentes.

## Segurança aplicada

- senha com bcrypt;
- JWT com expiração;
- cookie HTTP-only;
- consultas SQLite parametrizadas;
- CORS limitado ao Front-End configurado;
- validação de entradas no Back-End;
- cabeçalho `X-Powered-By` desabilitado.
