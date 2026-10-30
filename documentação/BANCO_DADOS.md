# Banco de dados — Terê Verde Online

## Modelo entidade-relacionamento simplificado

```text
ADMIN
┌───────────────┐
│ id (PK)       │
│ name          │
│ email         │
│ password_hash │
│ active        │
└───────────────┘

ATTRACTION                         NOTICE
┌────────────────┐              ┌────────────────┐
│ id (PK)        │ 1          N │ id (PK)        │
│ name           │──────────────│ attraction_id  │
│ description    │              │ title          │
│ category       │              │ description    │
│ location       │              │ urgent         │
│ status         │              │ active         │
│ closure_reason │              │ image_url      │
│ image_url      │              └────────────────┘
└────────────────┘

EVENT
┌────────────────┐
│ id (PK)        │
│ title          │
│ description    │
│ event_date     │
│ event_time     │
│ location       │
│ image_url      │
│ published      │
└────────────────┘
```

## Integridade

- e-mail do administrador é único;
- status da atração possui `CHECK` com valores permitidos;
- `notices.attraction_id` referencia `attractions.id`;
- ao excluir atração, o vínculo do aviso é definido como `NULL` (`ON DELETE SET NULL`).

## Índices

- `idx_attractions_status`;
- `idx_attractions_category`;
- `idx_events_date`;
- `idx_events_published`;
- `idx_notices_active_urgent`.

## Persistência

O arquivo padrão é `backend/data/tereverde.db`. A variável `DB_PATH` pode ser utilizada em testes para apontar para outro arquivo SQLite.
