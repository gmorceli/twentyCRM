# Estrutura do CRM — Twenty self-hosted

Instância: <https://crm20.bdntecnologia.com.br>  
Gerado em 30/09/2026. Escopo desta etapa: **apenas estrutura**. Nenhum dado foi importado.

## Versão do Twenty

**2.38.0**

A API não expõe a versão em nenhum campo consultável (`currentWorkspace.version` não existe, e `/rest/open-api/core` devolve `v0.1`, que é a versão da API, não do produto). A versão acima vem da constante `TWENTY_CURRENT_VERSION` do código, e é corroborada pela instância em execução, que registra comandos de upgrade até `2.39.0`.

## Campos criados

17 campos novos. Nenhum campo existente foi removido ou renomeado.

### Companies

**Tipo** — `tipo` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `ESCOLA_PARTICULAR` | Escola particular |
| `REDE_DE_ESCOLAS` | Rede de escolas |
| `PREFEITURA_SME` | Prefeitura/SME |
| `SECRETARIA_ESTADUAL` | Secretaria estadual |
| `OUTRO_ORGAO_PUBLICO` | Outro órgão público |
| `ONG_INSTITUTO` | ONG/Instituto |
| `EMPRESA_PRIVADA` | Empresa privada |
| `PARCEIRO_DISTRIBUIDOR` | Parceiro/distribuidor |
| `FORNECEDOR` | Fornecedor |
| `CONCORRENTE` | Concorrente |

**Unidades** — `unidades` · `MULTI_SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PETE` | PETE |
| `HEXA_CLIMA` | Hexa Clima |
| `FAGULHA` | Fagulha |
| `BDN` | BDN |

**Cliente de** — `clienteDe` · `MULTI_SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PETE` | PETE |
| `HEXA_CLIMA` | Hexa Clima |
| `FAGULHA` | Fagulha |
| `BDN` | BDN |

**Etapas atendidas** — `etapasAtendidas` · `MULTI_SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `EDUCACAO_INFANTIL` | Educação Infantil |
| `FUNDAMENTAL_I` | Fundamental I |
| `FUNDAMENTAL_II` | Fundamental II |
| `ENSINO_MEDIO` | Ensino Médio |

**Produtos que possui** — `produtosQuePossui` · `MULTI_SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PETE_ROB` | PETE Rob |
| `PETE_ALPHA` | PETE Alpha |
| `LEGAL` | LEGAL |
| `ESTACAO_HEXA_CLIMA` | Estação Hexa Clima |
| `MONITORAMENTO_E_ALERTAS_HEXA_CLIMA` | Monitoramento e alertas Hexa Clima |

**Nº de alunos** — `numeroDeAlunos` · `NUMBER` · opcional

**CNPJ** — `cnpj` · `TEXT` · opcional

**Origem** — `origem` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `BASE_ANTIGA` | Base antiga |
| `SITE` | Site |
| `INDICACAO` | Indicação |
| `EVENTO` | Evento |
| `PROSPECCAO` | Prospecção |
| `ANUNCIO` | Anúncio |
| `RADAR_B2G` | Radar B2G |

### People

**WhatsApp** — `whatsapp` · `PHONES` · opcional

**Papel na decisão** — `papelNaDecisao` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `DECISOR` | Decisor |
| `INFLUENCIADOR` | Influenciador |
| `USUARIO_PROFESSOR` | Usuário/professor |

### Opportunities

**Unidade** — `unidade` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PETE` | PETE |
| `HEXA_CLIMA` | Hexa Clima |
| `FAGULHA` | Fagulha |
| `BDN` | BDN |

**Produto** — `produto` · `MULTI_SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PETE_ROB` | PETE Rob |
| `PETE_ALPHA` | PETE Alpha |
| `LEGAL` | LEGAL |
| `ESTACAO_HEXA_CLIMA` | Estação Hexa Clima |
| `MONITORAMENTO_E_ALERTAS_HEXA_CLIMA` | Monitoramento e alertas Hexa Clima |

**Modelo** — `modelo` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `VENDA` | Venda |
| `ASSINATURA` | Assinatura |
| `SERVICO_RECORRENTE` | Serviço recorrente |
| `PROJETO` | Projeto |

**Via de contratação** — `viaDeContratacao` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PARTICULAR_COMPRA_DIRETA` | Particular/compra direta |
| `PREGAO` | Pregão |
| `INEXIGIBILIDADE` | Inexigibilidade |
| `DISPENSA` | Dispensa |
| `ADESAO_A_ATA` | Adesão a ata |

**Campanha** — `campanha` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `REATIVACAO_2027` | Reativação 2027 |
| `SITE` | Site |
| `INDICACAO` | Indicação |
| `PROSPECCAO` | Prospecção |
| `RADAR_B2G` | Radar B2G |

**Motivo de perda** — `motivoDePerda` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PRECO` | Preço |
| `SEM_ORCAMENTO` | Sem orçamento |
| `ESCOLHEU_CONCORRENTE` | Escolheu concorrente |
| `SEM_RESPOSTA` | Sem resposta |
| `ADIOU` | Adiou |
| `OUTRO` | Outro |

### Tasks

**Unidade** — `unidade` · `SELECT` · opcional

| valor interno | rótulo |
|---|---|
| `PETE` | PETE |
| `HEXA_CLIMA` | Hexa Clima |
| `FAGULHA` | Fagulha |
| `BDN` | BDN |

### Campos nativos reaproveitados (não recriados)

| Objeto | Campo nativo | Uso |
|---|---|---|
| Companies | `address` (ADDRESS) | Endereço |
| Companies | `accountOwner` (RELATION) | Responsável |
| People | `phones` (PHONES) | Telefone principal — o WhatsApp é campo separado |
| Tasks | `status`, `dueAt`, `assignee` | Usados pelas visões de tarefas |
| Notes | todos | Nativo, sem campos novos, conforme pedido |

## Etapas do Opportunity (Stage)

| ordem | valor interno | rótulo |
|---|---|---|
| 0 | `NOVO` | Novo |
| 1 | `CONTATO_FEITO` | Contato feito |
| 2 | `RESPONDEU` | Respondeu |
| 3 | `REUNIAO_MARCADA` | Reunião marcada |
| 4 | `PROPOSAL` | Proposta enviada |
| 5 | `NEGOCIACAO` | Negociação |
| 6 | `GANHO` | Ganho |
| 7 | `PERDIDO` | Perdido |

> **Atenção ao valor `PROPOSAL`.** Sete das oito etapas têm valor interno limpo. "Proposta enviada" manteve o valor legado `PROPOSAL` de propósito: era onde estavam as 3 oportunidades existentes, e preservá-lo evitou perder o histórico. Isso só importa se você exportar dados ou usar a API — na tela aparece o rótulo correto.

## Visões criadas

| Visão | Objeto | Tipo | Filtro | Link |
|---|---|---|---|---|
| Pipeline PETE | Opportunities | KANBAN por Stage | Unidade = PETE | [abrir](https://crm20.bdntecnologia.com.br/objects/opportunities?viewId=9f69a832-604d-4b95-9ba7-ef25560f570c) |
| Pipeline Hexa Clima | Opportunities | KANBAN por Stage | Unidade = Hexa Clima | [abrir](https://crm20.bdntecnologia.com.br/objects/opportunities?viewId=8b7ba6e2-1e0a-4fce-80fa-ed58b7353913) |
| Pipeline Fagulha | Opportunities | KANBAN por Stage | Unidade = Fagulha | [abrir](https://crm20.bdntecnologia.com.br/objects/opportunities?viewId=d06e0853-b76f-480b-8ea3-9a1ee317b676) |
| Pipeline BDN | Opportunities | KANBAN por Stage | Unidade = BDN | [abrir](https://crm20.bdntecnologia.com.br/objects/opportunities?viewId=4cd803d5-414e-41a1-b37c-5531f5eb2f50) |
| Reativação 2027 | Opportunities | KANBAN por Stage | Campanha = Reativação 2027 | [abrir](https://crm20.bdntecnologia.com.br/objects/opportunities?viewId=47e1a9a2-b1eb-438f-9394-cfe48fc44f7e) |
| Empresas PETE | Companies | TABELA | Unidades contém PETE | [abrir](https://crm20.bdntecnologia.com.br/objects/companies?viewId=ea19bcd3-dbff-4baa-8c07-dd42245fce8f) |
| Empresas Hexa Clima | Companies | TABELA | Unidades contém Hexa Clima | [abrir](https://crm20.bdntecnologia.com.br/objects/companies?viewId=747e179b-50e9-45d8-86ea-6f8a9e599b84) |
| Empresas Fagulha | Companies | TABELA | Unidades contém Fagulha | [abrir](https://crm20.bdntecnologia.com.br/objects/companies?viewId=b3a1d09f-8088-457e-99cf-500fbfa652b5) |
| Empresas BDN | Companies | TABELA | Unidades contém BDN | [abrir](https://crm20.bdntecnologia.com.br/objects/companies?viewId=ae986dab-0817-4c7c-b715-3ba17309c8ae) |
| Tarefas vencidas | Tasks | TABELA | Status ≠ Done **e** Vencimento no passado | [abrir](https://crm20.bdntecnologia.com.br/objects/tasks?viewId=f3721068-c5db-478d-bfa0-6f91f62b2635) |
| Tarefas por pessoa | Tasks | TABELA agrupada por Responsável | Status ≠ Done | [abrir](https://crm20.bdntecnologia.com.br/objects/tasks?viewId=d5b300dc-b011-404c-a3e6-21a6caa9bdfd) |

## Usuários do workspace

| Nome | E-mail | Papel |
|---|---|---|
| Gustavo Morceli | gustavo@bdntecnologia.com.br | Admin |
| Alexandre Queiroga | queiroga@bdntecnologia.com.br | Member |

## Permissões por papel

**Sim, esta versão suporta — e vai além do que você pediu.**

Papéis existentes hoje: `Admin` (não editável), `Member` (editável) e um papel interno de função.

A API de metadados expõe:

- `createOneRole`, `updateOneRole`, `deleteOneRole` — criar papéis próprios
- `upsertObjectPermissions` — permissão de leitura/escrita por objeto
- `upsertFieldPermissions` — permissão por campo
- **`upsertRowLevelPermissionPredicates`** — filtro em nível de linha

O último é o que interessa para o seu objetivo de limitar quem vê cada unidade: dá para criar um papel por unidade e amarrar um predicado do tipo `unidades contém PETE`, de modo que a pessoa só enxergue os registros da unidade dela. Não implementei agora porque não foi pedido nesta etapa — a estrutura de campos necessária (`Unidades` em Companies, `Unidade` em Opportunities e Tasks) já está pronta para isso.

## Decisões que tomei

**Unidade em Opportunities ficou opcional.** Você pediu obrigatória e depois autorizou deixar opcional por ora. Está como opcional. Consequência prática: as visões Pipeline filtram por unidade, então oportunidade sem unidade preenchida **não aparece em nenhum dos quatro pipelines**. Quando quiser torná-la obrigatória, é uma alteração no campo, mas exige valor padrão — o que significa que todo registro novo nasceria com uma unidade pré-selecionada.

**Tarefas vencidas** usa o operando `IS_IN_PAST` no vencimento, combinado com status diferente de Done. É dinâmico: não tem data fixa e não exige manutenção. Eu havia sinalizado risco de precisar de data fixa; o operando existe nesta versão e resolveu.

**Tarefas por pessoa** ficou como **tabela agrupada** por responsável, não kanban. O Twenty suporta agrupamento em visão de tabela (a visão nativa "Assigned to Me" faz isso), e tabela é mais legível para uma lista de pendências do que um kanban por pessoa.

## O que você precisa fazer na mão

1. **Preencher `Unidades` nas 3 empresas existentes.** Sem isso elas não aparecem em nenhuma visão "Empresas <unidade>". As empresas são: Centro de Excelência Educacional Crescer e Aprender, Colégio Objetivo - Vinhedo, Sistema Piaget de Ensino.
2. **Preencher `Unidade` nas 3 oportunidades existentes.** Mesma lógica: sem unidade, elas não aparecem em nenhum pipeline. Todas as três estão em "Proposta enviada" e pertencem ao Alexandre.
3. **Revogar a API key** que você me passou, conforme combinado.
4. **Conferir a ordem dos campos nas telas.** Campos novos entram no fim do formulário; reordenar é arrastar em Settings → Data model, ou direto no registro.

## Pendência de infraestrutura (fora do escopo desta etapa)

O envio de e-mail está fora do ar desde 09/09. Causa raiz identificada: o `entrypoint.sh` da imagem roda `psql` antes de iniciar a aplicação, sob `set -e`, e falhava com `PG_DATABASE_URL` vazio, derrubando o container em loop. Um serviço `worker-v2` foi criado e sobe corretamente, mas ainda falta confirmar se ele está rodando o worker de fila ou uma segunda cópia do server. **Enquanto isso não fechar, convite de colaborador e reset de senha não funcionam.**

## Registro de segurança

As 3 oportunidades foram lidas e salvas antes de qualquer alteração. Ao reescrever as opções de Stage, o Twenty migrou os 3 registros para o valor padrão (`NOVO`) mesmo com o valor `PROPOSAL` preservado na lista — comportamento que eu não previa. Os três foram restaurados para "Proposta enviada" a partir do backup, com valores, empresas e responsáveis intactos. Nenhum registro foi apagado.
