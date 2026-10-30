# API REST — Terê Verde Online

Base local: `http://127.0.0.1:3001/api`

A autenticação administrativa usa JWT em cookie HTTP-only. O navegador envia `credentials: include` nas requisições.

## Padrão de respostas

- `200 OK` — consulta ou atualização bem-sucedida;
- `201 Created` — cadastro realizado;
- `204 No Content` — exclusão ou logout concluído;
- `400 Bad Request` — dados inválidos;
- `401 Unauthorized` — sessão ausente/inválida;
- `404 Not Found` — recurso ou rota inexistente;
- `413 Payload Too Large` — conteúdo enviado excede o limite;
- `500 Internal Server Error` — erro não previsto.

Erros são retornados em JSON, por exemplo:

```json
{ "message": "Atração não encontrada." }
```

ou:

```json
{ "errors": ["Nome é obrigatório.", "Status inválido."] }
```

## Autenticação

### `POST /auth/login`

Entrada:

```json
{
  "email": "admin@tereverde.local",
  "password": "admin123"
}
```

Sucesso: `200` e criação do cookie de sessão.

### `GET /auth/me`

Protegido. Retorna o administrador autenticado.

### `POST /auth/logout`

Encerra a sessão. Retorna `204`.

## Atrações

### `GET /attractions`
Lista pública das atrações.

### `GET /attractions/:id`
Retorna detalhes de uma atração. `404` se não existir.

### `POST /attractions`
Protegido. Exemplo:

```json
{
  "name": "Pedra do Sino",
  "description": "Trilha no Parque Nacional da Serra dos Órgãos.",
  "category": "Trilha",
  "location": "Parque Nacional da Serra dos Órgãos",
  "status": "ABERTA",
  "closure_reason": "",
  "image_url": "/images/trilha.jpg"
}
```

Categorias: `Trilha`, `Cachoeira`, `Parque`, `Mirante`.  
Status: `ABERTA`, `FECHADA`, `EM_MANUTENCAO`.

### `PUT /attractions/:id`
Protegido. Atualiza a atração.

### `PATCH /attractions/:id/status`
Protegido. Atualiza apenas status e motivo.

### `DELETE /attractions/:id`
Protegido. Retorna `204`.

## Eventos

### `GET /events`
Lista apenas eventos publicados.

### `GET /events/:id`
Retorna detalhes de evento publicado.

### `GET /events/admin/all`
Protegido. Lista publicados e rascunhos.

### `POST /events`
Protegido. Campos principais: `title`, `event_date`, `event_time`, `location`, `description`, `image_url`, `published`.

### `PUT /events/:id`
Protegido. Atualiza evento.

### `DELETE /events/:id`
Protegido. Exclui evento.

## Avisos

### `GET /notices`
Lista apenas avisos ativos, priorizando os urgentes.

### `GET /notices/:id`
Retorna detalhes de aviso ativo.

### `GET /notices/admin/all`
Protegido. Lista todos.

### `POST /notices`
Protegido. Campos: `title`, `description`, `urgent`, `active`, `attraction_id`, `image_url`.

### `PUT /notices/:id`
Protegido. Atualiza aviso.

### `DELETE /notices/:id`
Protegido. Exclui aviso.

## Imagens

O MVP armazena imagens enviadas pelo painel como Data URL no próprio registro, solução simples adequada ao ambiente local do trabalho. O Back-End valida:

- tipo JPG/JPEG, PNG ou WEBP;
- tamanho máximo de 2 MB;
- formato da Data URL.

Em um sistema de produção, o recomendado seria armazenar arquivos em serviço próprio/objeto e manter apenas a URL no banco.
