# Relatório da importação — base PETE Reativação 2027

Executado em 30/09/2026 contra <https://crm20.bdntecnologia.com.br>.
Decisões aplicadas: as seis recomendações de `decisoes_importacao.md`, autorizadas com "toca do seu jeito".

---

## 1. Status do e-mail e do convite do Ângelo

**O envio de e-mail continua fora do ar.** Não fechou nesta sessão.

- **Convite para `angelo@bdntecnologia.com.br`: não enviado.** A API devolveu `Forbidden resource`. Convidar membro exige sessão de usuário; uma API key não tem essa permissão. **Você precisa fazer pela interface:** Settings → Members → Invite.
- **Teste do pipeline:** disparei um reset de senha para `gustavo@bdntecnologia.com.br` às 18:48:33 (endpoint público, mesma fila do convite). A mutation devolveu `success: true`, mas **nem o `worker-v2`, nem o worker antigo, nem o server registraram qualquer linha de envio**. O job entra na fila e ninguém consome.

O `worker-v2` está de pé e estável (725 MB, horas sem reinício), mas silencioso. A causa raiz do crash loop original está resolvida e documentada — o `entrypoint.sh` executava `psql` sob `set -e` com `PG_DATABASE_URL` vazio, derrubando o container antes de a aplicação subir. O elo que falta agora é o consumo da fila de e-mail.

**Consequência:** mesmo depois de você convidar o Ângelo pela interface, ele não vai receber o e-mail enquanto isso não for resolvido.

---

## 2. Contagens: esperado × gravado

### Onda 1 — Clientes (41 linhas)

| Objeto | Esperado | Gravado | Observação |
|---|---|---|---|
| Company | 41 | 41 | todas novas |
| Person | 47 | 47 | 41 contatos + 3 pessoas de células com "/" + 3 donos de e-mail entre parênteses |
| Opportunity | 41 | 41 | 28 em "Contato feito", 13 em "Novo" |
| Note | 28 | 28 | só onde houve e-mail em 30/09/2026 |
| Task | 41 | 41 | 33 para Gustavo, 8 para Queiroga |
| Vínculos de nota | 56 | 56 | cada nota ligada à empresa e à oportunidade |
| Vínculos de tarefa | 82 | 82 | cada tarefa ligada à empresa e à oportunidade |

### Onda 2 — Leads com decisor (553 linhas)

| Objeto | Esperado | Gravado | Observação |
|---|---|---|---|
| Company | 552 | 552 | 553 escolas menos 1 fusão (Decisão 3) |
| Person | 553 | 553 | 552 novas + 1 já existente |

Sem oportunidades, notas ou tarefas, conforme pedido.

### Estado final do CRM

| Objeto | Total | Composição |
|---|---|---|
| Companies | 595 | 592 importadas + 3 que já existiam |
| People | 603 | 599 importadas + 4 que já existiam |
| Opportunities | 44 | 41 importadas + 3 que já existiam |
| Notes | 30 | 28 importadas + 2 anteriores |
| Tasks | 42 | 41 importadas + 1 anterior |

**Conferências que passaram:**

- 595 de 595 empresas com `Unidades = PETE`
- 592 com `Origem = Base antiga` (as 3 anteriores não recebem origem, conforme o combinado de não alterar o que já existia)
- 41 empresas com `Histórico anterior` preenchido (só Onda 1)
- Tipos: 583 Escola particular, 7 Rede de escolas, 2 ONG/Instituto, 3 sem tipo (as 3 anteriores, intocadas)
- 44 de 44 oportunidades com `Unidade = PETE`; 41 com `Campanha = Reativação 2027`
- As 3 oportunidades anteriores seguem em "Proposta enviada", sem alteração

---

## 3. Registros ignorados por duplicidade

| Objeto | Registro | Motivo |
|---|---|---|
| Company | Sistema Piaget de Ensino | já existia no CRM; a pessoa da Onda 2 foi ligada a ela |
| Person | Sérgio Caldas (`diretoria@sistemapiaget.com.br`) | e-mail já existia |
| Company | Rede N. Sra. das Dores (Onda 2) | fundida com "Rede Nossa Senhora das Dores" (Onda 1), por Decisão 3 |

**14 pessoas sem e-mail** foram deduplicadas por `empresa + nome normalizado` (Decisão 5). Rodar a importação de novo não as duplica.

---

## 4. Linhas rejeitadas

**Nenhuma.** `rejeitados.csv` contém apenas o cabeçalho.

Todas as 41 linhas da Onda 1 e as 553 da Onda 2 foram processadas. A aba "Fora desta rodada" (14 linhas) não foi importada, conforme instruído.

---

## 5. Percalços durante a gravação

Registro do que deu errado e como foi corrigido, porque afeta futuras importações:

**Telefones no formato brasileiro foram rejeitados.** O Twenty recusa `(83) 3337-1902` e exige dígitos puros com código de país explícito: `{primaryPhoneNumber: "8333371902", primaryPhoneCallingCode: "+55", primaryPhoneCountryCode: "BR"}`. Isso derrubou a primeira tentativa de gravar pessoas.

**A API tem limite de 100 requisições por minuto.** Ao tentar isolar os erros item a item, o script estourou o limite e derrubou em cascata oportunidades, notas e tarefas. A segunda passada usa lotes de 40 com pausa de 1,2s.

A importação foi retomada de onde parou, sem duplicar nada, porque os identificadores são gerados antes da gravação e conferidos contra o que já está no CRM.

---

## 6. O que você precisa fazer na mão

1. **Convidar o Ângelo** em Settings → Members → Invite. Enquanto o e-mail não voltar, ele não recebe o convite.
2. **Resolver o consumo da fila de e-mail.** É o que destrava convite e reset de senha.
3. **14 escolas estão sem responsável** porque o vendedor da linha é o Ângelo, que ainda não é membro do workspace. Depois que ele aceitar o convite, atribua o Account Owner dessas empresas e das oportunidades correspondentes. As tarefas dessas linhas foram para você, com `[Ângelo]` no título quando a ação era WhatsApp do vendedor.
4. **Revisar possíveis escolas duplicadas.** Uma varredura de similaridade apontou pares que eu deliberadamente **não** fundi, porque fusão automática estragaria casos legítimos. Os mais prováveis de serem a mesma escola:
   - Colégio Inter Ação × Colégio Interação
   - Escola Santa Marina × Escola Sta Marina
   - Colégio Nossa Senhora das Dores × Colégio Nossa Senhora das Dores - BH
   - Colégio Sagrado Coração de Maria × Colégio Sagrado Coração de Maria (UBÁ)
   
   Casos como "Colégio Rodrigues Dias Fund. I" e "Fund. II" são unidades distintas e devem continuar separados.
5. **9 pessoas ficaram sem Papel na decisão** — cargos como "resp projeto", "Consultor FTD", "Responsável Robótica", e 6 sem cargo na planilha.
6. **Revogar a API key** usada nesta sessão.

---

## 7. Como reexecutar com segurança

A importação é idempotente. Rodar de novo:

- não duplica empresas (chave: nome normalizado, com a fusão da Decisão 3 aplicada)
- não duplica pessoas (chave: e-mail; ou `empresa + nome` para as 14 sem e-mail)
- não duplica oportunidades, notas e tarefas (identificadores fixos, conferidos antes de gravar)

Os arquivos de trabalho (planilha, prévia e rejeitados) estão fora do versionamento de propósito: contêm dados pessoais de cerca de 600 pessoas e não devem viver num repositório de código.
