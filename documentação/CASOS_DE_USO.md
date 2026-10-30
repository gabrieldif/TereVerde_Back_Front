# Casos de uso — Terê Verde Online

## UC01 — Realizar login administrativo

**Ator:** Administrador  
**Pré-condição:** possuir credenciais válidas.  
**Fluxo principal:** acessar Área administrativa → informar e-mail e senha → sistema valida → painel é exibido.  
**Fluxo alternativo:** credenciais inválidas → sistema mantém o usuário no login e exibe mensagem.  
**Resultado:** sessão administrativa criada em cookie HTTP-only.

## UC02 — Cadastrar atração

**Ator:** Administrador  
**Pré-condição:** estar autenticado.  
**Fluxo principal:** abrir Atrações → preencher campos → incluir foto opcional → salvar → API valida e persiste.  
**Fluxo alternativo:** campo inválido ou atração fechada sem motivo → API rejeita com `400`.  
**Resultado:** atração disponível para consulta pública.

## UC03 — Alterar status de atração

**Ator:** Administrador  
**Pré-condição:** atração existente e administrador autenticado.  
**Fluxo principal:** editar atração → escolher status → salvar.  
**Fluxo alternativo:** status Fechada sem motivo → sistema solicita o motivo.  
**Resultado:** novo status exibido aos visitantes.

## UC04 — Consultar atração

**Ator:** Visitante  
**Pré-condição:** nenhuma.  
**Fluxo principal:** acessar Atrações → pesquisar/filtrar → clicar no card → visualizar foto, descrição, local e status.  
**Resultado:** visitante conhece a condição atual antes de se deslocar.

## UC05 — Publicar aviso urgente

**Ator:** Administrador  
**Pré-condição:** estar autenticado.  
**Fluxo principal:** abrir Avisos → informar título e descrição → marcar Urgente e Ativo → relacionar atração opcionalmente → salvar.  
**Resultado:** aviso aparece na área pública e na faixa superior do site.

## UC06 — Consultar evento

**Ator:** Visitante  
**Pré-condição:** evento publicado.  
**Fluxo principal:** abrir Eventos → clicar no evento → visualizar data, horário, local, foto e descrição.  
**Resultado:** visitante obtém as informações necessárias para programar a visita.
