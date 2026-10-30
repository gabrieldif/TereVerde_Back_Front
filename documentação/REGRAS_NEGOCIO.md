# Regras de negócio — Terê Verde Online

- **RN01** — Somente administradores autenticados podem criar, editar ou excluir dados.
- **RN02** — Visitantes não precisam realizar login para consultar informações públicas.
- **RN03** — Toda atração deve possuir um dos status: `ABERTA`, `FECHADA` ou `EM_MANUTENCAO`.
- **RN04** — Uma atração `FECHADA` deve possuir motivo do fechamento.
- **RN05** — Categorias permitidas para atrações: Trilha, Cachoeira, Parque e Mirante.
- **RN06** — Um evento deve possuir título, data e local.
- **RN07** — Apenas eventos publicados aparecem na área pública e podem ter detalhes consultados.
- **RN08** — Um aviso deve possuir título e descrição.
- **RN09** — Apenas avisos ativos aparecem na área pública e podem ter detalhes consultados.
- **RN10** — Avisos marcados como urgentes devem receber destaque visual e o primeiro aviso urgente ativo deve aparecer no topo do site.
- **RN11** — Fotos são opcionais em atrações, eventos e avisos.
- **RN12** — O administrador pode incluir, substituir ou remover fotos.
- **RN13** — Imagens devem ser JPG, PNG ou WEBP e ter no máximo 2 MB.
- **RN14** — Campos de texto possuem limites de tamanho validados no Back-End.
- **RN15** — Registros inexistentes não podem ser editados ou excluídos; a API deve retornar `404`.
- **RN16** — Rotas administrativas sem sessão válida devem retornar `401`.
- **RN17** — Entradas inválidas devem retornar `400` com mensagem clara.
