# Decisões pendentes — importação da base PETE

Gerado em 30/09/2026. **Nada foi gravado no CRM.** A simulação está em `previa_importacao.csv`.

Responda os 6 itens (ou diga "toca do seu jeito" e eu sigo as recomendações). Cada um mostra o impacto em número de registros.

---

## Status do Passo 0 — e-mail

**Não fechou.** Dois achados:

1. **O convite para `angelo@bdntecnologia.com.br` não pode ser enviado por mim.** A API devolve `Forbidden resource` — convidar membro exige sessão de usuário, não API key. **Você precisa fazer pela interface:** Settings → Members → Invite.

2. **O envio de e-mail continua quebrado.** Disparei um reset de senha para `gustavo@bdntecnologia.com.br` às 18:48:33 (endpoint público, mesmo caminho de fila que o convite). A mutation devolveu `success: true`, mas **nenhum dos dois workers nem o server registrou uma única linha de envio**. O job entra na fila e ninguém consome.

O `worker-v2` está vivo (725 MB, estável há horas) mas silencioso. A causa raiz do crash loop original está identificada e documentada (`entrypoint.sh` rodando `psql` sob `set -e` com `PG_DATABASE_URL` vazio), mas o worker ainda não está processando a fila de e-mail.

**Consequência prática:** convite de colaborador e reset de senha não funcionam. Isso não bloqueia a importação.

---

## Decisão 1 — Campo "Histórico anterior" não existe

Você pediu para preencher "Histórico anterior" nas empresas da Onda 1, com a frase padrão mais as colunas *Último contato*, *O que aconteceu (abr/2026)* e *Próximo passo anotado*. **Esse campo não existe** — não está em `estrutura_crm.md` e eu não o criei.

| Opção | Efeito |
|---|---|
| **A (recomendada)** | Criar `historicoAnterior` (TEXT) em Companies e preencher nas 41 empresas da Onda 1 |
| B | Não criar; o histórico das 41 escolas se perde |
| C | Jogar o conteúdo numa Note por empresa em vez de campo |

**Recomendo A.** É um campo a mais no schema, mas o histórico é justamente o que dá contexto para a reativação. A opção C espalha a informação em notas e dificulta ver na tabela.

**Sua resposta:**

---

## Decisão 2 — "Gestor(a)" ficou sem Papel na decisão

Sua regra manda mapear *Diretor, Diretora, Mantenedor(a), Direção ou Gerente* para **Decisor**. Segui ao pé da letra, e "Gestor" não é "Gerente" — então **11 pessoas ficaram sem papel**.

Cargos afetados: Gestor (3), Gestora (2), Gestora de Makerspaces, Gestora Infantil e Fundamental, Gestor Administrativo Financeiro, Gestor de TI, Gestora Pedagógica, Gestora (1).

| Opção | Efeito |
|---|---|
| **A (recomendada)** | Tratar "Gestor(a)" como **Decisor** → 11 pessoas passam de vazio para Decisor |
| B | Manter vazio, como está na simulação |

**Recomendo A.** No vocabulário de escola, gestor e gerente ocupam o mesmo lugar na decisão. Mas é sua regra, então confirmo antes de esticá-la.

Sobram 8 pessoas sem papel de qualquer forma (cargos como "resp projeto", "Consultor FTD", "Responsável Robótica", e 6 sem cargo nenhum).

**Sua resposta:**

---

## Decisão 3 — Possível escola duplicada entre as ondas

- Onda 1: **"Rede Nossa Senhora das Dores"**
- Onda 2: **"Rede N. Sra. das Dores"**

Normalizadas, os nomes não batem — então virariam **duas empresas separadas**.

Fiz uma varredura de similaridade em todas as 594 empresas e **não apliquei fusão automática de propósito**: a varredura devolve pares como "Colégio Rodrigues Dias Fund. I" e "Fund. II", que são unidades distintas. Fundir por semelhança estragaria dados legítimos.

| Opção | Efeito |
|---|---|
| **A (recomendada)** | Tratar as duas como a mesma empresa (a da Onda 1 vence, a pessoa da Onda 2 entra nela) |
| B | Deixar como duas empresas e você resolve depois na interface |

**Recomendo A** para esse par específico, porque a abreviação é evidente. Os demais pares eu listo no relatório final para revisão manual, sem tocar.

**Sua resposta:**

---

## Decisão 4 — "(e-mail do CRM: X)"

Três linhas da Onda 1 trazem o contato e, entre parênteses, o dono real do e-mail:

| Escola | Contato | E-mail pertence a |
|---|---|---|
| Coeducar - Araraquara | Larissa | Andreia |
| Colégio Adventista de BH | Rafael | Eliezer |
| Colégio São José - PE | Wellington | Tânia |

Na simulação criei **duas pessoas** em cada caso: o contato nomeado (sem e-mail) e o dono do e-mail (só com o e-mail). A pessoa principal da oportunidade é o contato nomeado.

| Opção | Efeito |
|---|---|
| **A (recomendada)** | Manter as duas pessoas → 3 pessoas a mais |
| B | Criar só o contato nomeado e descartar o e-mail → perde 3 e-mails válidos |
| C | Atribuir o e-mail ao contato nomeado → contraria o que a planilha diz |

**Recomendo A.** São pessoas reais da escola e o e-mail é dado aproveitável. C seria gravar informação errada de propósito.

**Sua resposta:**

---

## Decisão 5 — 14 pessoas sem e-mail

Sua regra de deduplicação é "pessoa por e-mail". **14 pessoas da Onda 1 não têm e-mail**, então não têm chave — rodar a importação duas vezes as duplicaria.

Usei `empresa + nome normalizado` como chave alternativa para essas 14.

| Opção | Efeito |
|---|---|
| **A (recomendada)** | Manter a chave alternativa → idempotência garantida para todos |
| B | Só e-mail como chave → as 14 duplicam se rodar de novo |

**Recomendo A.** Sem isso, a exigência de idempotência que você colocou nas regras não se sustenta.

**Sua resposta:**

---

## Decisão 6 — "Telefone escola" da Onda 1

A Onda 1 tem a coluna *Telefone escola*, e você não disse onde ela entra. Hoje **não está sendo importada** — 33 telefones ficariam de fora.

| Opção | Efeito |
|---|---|
| **A (recomendada)** | Gravar no campo nativo `phones` da pessoa principal de cada escola |
| B | Não importar |

**Recomendo A.** É o telefone da escola, útil para o vendedor, e o campo nativo já existe. Na Onda 2 o telefone já vai para `phones`.

**Sua resposta:**

---

## O que acontece depois das respostas

1. Passo 1: `Unidades = PETE` nas 3 empresas existentes e `Unidade = PETE` nas 3 oportunidades
2. Criação do campo `historicoAnterior`, se a Decisão 1 for A
3. Gravação: 593 empresas, 599 pessoas, 41 oportunidades, 28 notas, 41 tarefas
4. Verificação por releitura e geração de `relatorio_importacao.md`

A importação é idempotente: rodar de novo não duplica nada.
