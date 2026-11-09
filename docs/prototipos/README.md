# Protótipos de telas — Terê Verde Online

**Disciplina:** MVP Back-End Development — UNIFESO  
**Projeto:** Terê Verde Online / Circuito Terê Verde

## Objetivo

Esta pasta reúne **protótipos ilustrativos de interface** do MVP para documentar a jornada de visitantes e administradores e atender ao item de telas de prototipação da entrega.

**Importante:** os arquivos PNG são representações esquemáticas criadas a partir dos requisitos e do escopo publicados no repositório, **não são capturas de tela nem reprodução visual exata do Front-End implementado**. Nomes e textos de atrações/eventos são exemplos, não dados reais de funcionamento.

## Telas e relação com a API

| Arquivo | Finalidade | Integração/rotas associadas |
| --- | --- | --- |
| `01-inicio.png` | Página inicial, acesso às seções e destaque urgente | `GET /api/notices`, `GET /api/attractions` |
| `02-lista-atracoes.png` | Listagem, pesquisa e filtro de atrações | `GET /api/attractions` |
| `03-detalhes-atracao.png` | Dados, imagem e situação atual de visitação | `GET /api/attractions/:id` |
| `04-eventos.png` | Eventos publicados e navegação para detalhes | `GET /api/events`, `GET /api/events/:id` |
| `05-avisos.png` | Avisos ativos e destaque para comunicados urgentes | `GET /api/notices`, `GET /api/notices/:id` |
| `06-login-administrativo.png` | Autenticação do administrador | `POST /api/auth/login` |
| `07-painel-administrativo.png` | Gestão de atrações, eventos e avisos | `GET /api/auth/me`; rotas CRUD protegidas de atrações, eventos e avisos |
| `08-formulario-atracao.png` | Exemplo de cadastro/edição com validação do motivo de fechamento | `POST /api/attractions`, `PUT /api/attractions/:id`, `PATCH /api/attractions/:id/status` |

## Jornada prevista

**Visitante:** Início → Atrações → Detalhes; ou Início → Eventos/Avisos → Detalhes. A consulta pública não exige login.

**Administrador:** Login → Painel → Gerenciar atrações/eventos/avisos → Salvar → Conteúdo apresentado ao visitante. As operações de manutenção requerem autenticação.

## Limites do MVP

Não foram prototipados pagamentos, reservas, login de visitantes, mapas externos ou relatórios avançados porque são itens explicitamente fora do escopo documentado no projeto.

## Observação acadêmica

As telas demonstram o planejamento visual e o vínculo entre a interface e a API REST. Para evidenciar a **interface efetivamente implementada**, sugere-se complementar esta pasta com capturas reais executadas localmente (por exemplo, em uma subpasta `capturas-reais/`).
