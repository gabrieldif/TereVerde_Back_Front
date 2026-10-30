# Análise e correções — Terê Verde Online

## Por que o `.vbs` não abria o projeto

O `ABRIR_TERE_VERDE.vbs` original executava, para cada servidor:

```text
cmd /c if not exist node_modules call npm install ... && npm run dev ...
```

No `cmd`, o `&&` faz parte do `if`. Ou seja, o `npm run dev` **só rodava quando a pasta `node_modules` não existia**. Como o projeto já vem com `backend\node_modules` e `frontend\node_modules`, o resultado era:

1. nenhum servidor era iniciado;
2. o script esperava, **em silêncio e com tudo oculto, até 90 segundos** pelo endereço `localhost:5173`;
3. depois abria o navegador numa página que não existia (`ERR_CONNECTION_REFUSED`).

Os logs do projeto confirmam: só existia o registro de uma execução (instalação + início). Nas seguintes, nada subia.

## O que foi corrigido

| # | Problema | Correção | Arquivos |
|---|---|---|---|
| 1 | `&&` dentro do `if` impedia o início dos servidores | Lógica movida para scripts `.cmd` com fluxo explícito (instala só se precisar, **sempre** inicia) | `scripts/iniciar-*.cmd`, `ABRIR_TERE_VERDE.vbs` |
| 2 | Falhas silenciosas (janelas ocultas, espera cega) | O `.vbs` detecta falha na hora, mostra as últimas linhas do log e oferece abri-lo; verifica o Node.js antes de começar | `ABRIR_TERE_VERDE.vbs` |
| 3 | Abrir duas vezes subia servidores duplicados | Se o sistema já estiver no ar, só abre o navegador | `ABRIR_TERE_VERDE.vbs` |
| 4 | Não havia como encerrar os processos ocultos | Novo `PARAR_TERE_VERDE.vbs` (independe do idioma do Windows) | `PARAR_TERE_VERDE.vbs`, `scripts/parar.cmd` |
| 5 | `node_modules` com binário nativo incompatível (`sqlite3`, `rollup`, `esbuild`) derrubava tudo | Os scripts testam se os módulos carregam e, se não, reinstalam sozinhos | `scripts/iniciar-*.cmd` |
| 6 | Erros de caminho com espaço/acento e de `localhost` (IPv6 `::1` × IPv4) no Windows | Chamadas `cmd /s /c` com aspas corretas; Vite fixado em `127.0.0.1` com `strictPort` | `vite.config.js`, `.vbs` |
| 7 | CORS/cookie dependiam de abrir exatamente `localhost:5173` | O front chama `/api` (mesma origem) e o Vite encaminha ao Back-End; CORS aceita `localhost` e `127.0.0.1` | `vite.config.js`, `api.js`, `app.js` |
| 8 | Projeto clonado do Git quebrava (`backend/data` não existe, pois o `.db` é ignorado) | A pasta do banco é criada automaticamente | `backend/src/database/db.js`, `backend/data/.gitkeep` |
| 9 | Chaves estrangeiras desligadas (padrão do SQLite) | `PRAGMA foreign_keys = ON`: excluir uma atração agora limpa o vínculo dos avisos | `db.js` |
| 10 | Aviso podia apontar para atração inexistente | Retorna `400` com mensagem clara | `routes/notices.js` |
| 11 | Porta ocupada gerava erro confuso; a API ficava aberta na rede (e pedia permissão no Firewall) | Mensagem amigável; API escuta só em `127.0.0.1` (configurável com `HOST`) | `server.js`, `env.js` |
| 12 | Documentação citava `docs/` e um `.docx` em local diferente do real | Caminhos e estrutura corrigidos | `Readme.md`, `documentação/*.md` |

Observação: o iniciador usa `npm start` (e não `--watch`) no Back-End para que o encerramento não deixe processos "vigias" órfãos. Para desenvolver com reinício automático, use `npm run dev` manualmente.

## Testes adicionados

Dois testes de integração em `backend/tests/integration.test.js`:

* aviso com atração relacionada inexistente retorna `400`;
* excluir uma atração mantém o aviso e remove apenas o vínculo.

## O que foi verificado e o que não foi

**Verificado (ambiente Linux de análise):**

* sintaxe de todos os arquivos `.js` e `.jsx`; imports e imagens referenciadas existem;
* testes do Back-End: **16 de 16 passando**. Como os binários do `node_modules` são de Windows, os testes rodaram com um substituto temporário do módulo `sqlite3`; a lógica da API foi validada, o binário do `sqlite3` não;
* inicialização do servidor, aviso de porta ocupada e criação automática da pasta do banco;
* análise estática dos `.vbs`, `.cmd` e `.bat` (blocos balanceados, aspas, rótulos de `goto`, codificação).

**Não verificado:** a execução real dos `.vbs`/`.cmd` e do Vite no Windows, pois não há Windows neste ambiente. Se algo falhar na sua máquina, `ABRIR_TERE_VERDE_COM_JANELA.bat` mostra o erro exato.

## Pontos de atenção (não alterados)

* O evento de exemplo ("Caminhada guiada na Serra") tem data `2026-10-18`, que já passou; edite-o ou crie um novo no painel.
* Credenciais de teste (`admin@tereverde.local` / `admin123`) e a chave JWT padrão servem apenas para uso acadêmico/local.
