# Plano de Crescimento SEO + GEO — Julia Dias Tozato
> Elaborado em 22/07/2026 com dados reais do Ubersuggest (SERPs Brasil, pt-BR, locId 2076).
> Complementa o `PLANO.md` original: aqui entram os dados de mercado coletados, a análise
> competitiva quantificada, o funil de leads e o roadmap de execução priorizado.

## Status de implementação (23/07/2026)

Tudo que dependia só de código/conteúdo foi implementado nesta sessão:

- ✅ **§4 Estrutura**: nova página `/avaliacao-neuropsicologica-idosos` (título, H1, intro, 6 seções
  de conteúdo, 7 FAQs, schema); title de `/neuropsicologia-infantil` ajustado para incluir
  "Avaliação Neuropsicológica Infantil"; seção "Quanto custa?" adicionada nas 8 páginas de serviço;
  todas as páginas de serviço agora com 6+ FAQs.
- ✅ **§5 Funil**: tracking `data-umami-event="whatsapp-click"` (+ página de origem) em todos os
  links de WhatsApp (Header desktop/mobile, Footer, CtaWhatsApp).
- ✅ **§7 Blog**: os 8 próximos posts priorizados foram escritos e publicados (ver lista abaixo),
  todos linkando entre si e para as páginas de serviço.
- ✅ Nova página e novos posts integrados em: home (grid de serviços), Footer, `llms.txt`.

**Pendências que continuam dependendo da Julia/Rodrigo** (não são código): domínio definitivo, CEP,
horários reais, fotos profissionais, Google Business Profile, Doctoralia — ver roadmap §8.

**Nota sobre validação**: o ambiente desta sessão não conseguiu executar `astro check`/`astro
build`/`vitest` (processos travavam indefinidamente, mesmo sem sandbox e com telemetria desligada —
provável restrição de rede do ambiente, não do código). Todo o conteúdo novo foi revisado manualmente
contra o schema Zod de `content.config.ts` (title ≤70 caracteres, description 110-165 caracteres,
categoria válida) — dois erros de limite de caracteres foram encontrados e corrigidos nessa revisão.
**Antes de publicar, rode `npm run build` e `npm test` localmente para confirmar.**

---

## 1. Diagnóstico do site atual

**O que já está pronto (e bem feito):**
- 26 páginas estáticas no ar em preview (https://julia.servidortozato.cloud, noindex proposital).
- Arquitetura correta: 8 páginas de serviço, consultório, FAQ, blog com 4 posts, categorias, RSS.
- JSON-LD completo, llms.txt, sitemap, frase de entidade padronizada, testes de metadados.
- NAP centralizado em `src/lib/constants.ts`.

**Bloqueadores de lançamento (nenhum é técnico):**
| # | Pendência | Impacto SEO |
|---|---|---|
| 1 | **Domínio definitivo** não registrado | Bloqueia tudo: indexação, GBP, diretórios |
| 2 | CEP do consultório (TODO em constants.ts) | Schema `PostalAddress` incompleto → sinal local mais fraco |
| 3 | Horários reais de atendimento (TODO) | `openingHours` no schema + GBP |
| 4 | Fotos profissionais (hero/autor usam monograma) | E-E-A-T, CTR no GBP e nas SERPs, GEO (entidade com rosto) |
| 5 | Google Business Profile inexistente | O local pack é a posição nº 1 em TODAS as SERPs locais coletadas |
| 6 | Perfil Doctoralia inexistente | Doctoralia (DA 59) aparece no top 4 de todas as SERPs analisadas |

**Conclusão do diagnóstico:** o site é tecnicamente superior a todos os concorrentes analisados.
O gargalo não é código — é lançar (domínio + indexação) e existir fora do site (GBP + diretórios + fotos).

---

## 2. Dados de mercado (Ubersuggest, 22/07/2026)

### 2.1 Dificuldade das palavras-chave (SD = SEO difficulty, 0-100)

| Keyword | SD | Leitura |
|---|---|---|
| avaliação neuropsicológica santos | **12** | Muito fácil — alvo primário confirmado |
| avaliação neuropsicológica (nacional) | 17 | Fácil para conteúdo informacional |
| tdah avaliação | 17 | Fácil — cluster TDAH viável |
| neuropsicóloga (nacional) | 30 | Média — ganhável via long-tail |
| avaliação tdah santos | sem dados | Volume tão baixo que não é rastreado = **zero concorrência**; a página `/avaliacao-tdah` pode dominar sozinha |

*Nota: volumes de busca exatos indisponíveis no tier free (limite diário de 3 relatórios de keyword). Para volumes precisos, rodar `keyword_overview` amanhã ou conectar o Google Keyword Planner. A dificuldade + composição da SERP já bastam para priorizar.*

### 2.2 SERP "avaliação neuropsicológica santos" (keyword nº 1 do projeto)

| Pos | Quem | DA | Tipo |
|---|---|---|---|
| 1-3 | Local pack (Gabriela Keller, Sandra Lia, NeuroIntegra) | — | Google Maps |
| 4 | Doctoralia | 59 | Diretório |
| 5 | **Instagram da CNP (@cnpneuroepsicologia)** | 94* | A clínica da Julia! |
| 6 | jaquelineborgesneuropsicologia.com | **3** | Site pessoal |
| 8 | neucog.com.br | **3** | Clínica |
| 9 | solangepsicologa.com.br | **1** | Site pessoal (one-page) |
| 10 | denianeuropsicologa.com | **8** | Site pessoal |

*\*DA do instagram.com, não do perfil.*

**Leituras estratégicas:**
1. Os concorrentes orgânicos diretos têm **DA entre 1 e 8**. Um site novo com ~15 backlinks de qualidade os supera em autoridade.
2. O IG da CNP já rankeia na posição 5 aqui e **na posição 1 orgânica para "neuropsicóloga santos"**. A CNP é um ativo de SEO pronto: link no site da clínica + bio do IG apontando para o site da Julia transfere relevância imediata.
3. Local pack no topo → **GBP é a ação de maior ROI do projeto inteiro.**

### 2.3 SERP "psicóloga em santos" (frente nº 2)

| Pos | Quem | DA |
|---|---|---|
| 1-3 | Local pack (Carla Ribeiro, Maria José, Natália Dantas) | — |
| 4 | Doctoralia | 59 |
| 5 | psicologajoycemello.com.br | 5 |
| 6 | psicologossaopaulo.com.br | 32 |
| 7 | psicologacarlazanetti.com.br | 1 |
| 8 | psitto.com.br | 39 |
| 9 | nossospsicologos.com.br | 28 |

**Leitura:** aqui a página 1 é dominada por diretórios (DA 28-59). Sites pessoais que entram (Joyce DA 5, Zanetti DA 1) rankeiam por title exato + sinais locais + idade. É frente de médio prazo, como o PLANO.md já previa — a via de entrada é local pack + long-tail ("psicóloga para adolescentes santos", "psicóloga boqueirão"), não a keyword de cabeça.

### 2.4 SERP "quanto custa avaliação neuropsicológica" (informacional, nacional)

- **Posição 1 = AI Overview** (Google já responde com IA → quem é citado leva o clique restante).
- Orgânicos: Doctoralia Q&A (DA 59), depois sites DA 1-16 — inclusive um blogspot de 2020 na posição 9.
- **Leitura GEO:** conteúdo bem estruturado (resposta direta + faixas de preço + fatores) tem chance real de ser citado no AI Overview. O post `quanto-custa-avaliacao-neuropsicologica.mdx` já existe — é o candidato nº 1 a tráfego nacional. Enriquecer com tabela de faixas de valores por região/formato e FAQ com schema.

### 2.5 Backlinks dos concorrentes (o teto de autoridade do nicho)

| Domínio | DA | Backlinks | Ref. domains | Follow |
|---|---|---|---|---|
| psicologacarla.com (blog 20+ posts) | **18** | 541 | 60 | 0 |
| psicologajoycemello.com.br | 5 | 10 | 8 | 0 |
| jaquelineborgesneuropsicologia.com | 3 | 23 | 20 | 0 |
| psicologacarlazanetti.com.br | 1 | 10 | 9 | 0 |
| solangepsicologa.com.br | 1 | 14 | 13 | 0 |

**Leituras:**
1. O "teto" do nicho é DA 18 (Carla Ribeiro) — e é exatamente quem tem blog ativo. Blog → links → autoridade: a tese do projeto confirmada com números.
2. **Nenhum concorrente tem sequer 1 backlink follow.** Meta realista: 15-20 referring domains de qualidade em 6 meses (diretórios + CNP + parcerias locais) já torna o site da Julia o mais autoritativo entre os sites pessoais de Santos.

---

## 3. Estratégia de palavras-chave em 3 camadas

**Camada 1 — Transacional local (converte agora), SD ≤ 12:**
`avaliação neuropsicológica santos` · `neuropsicóloga santos` · `avaliação tdah santos` ·
`avaliação autismo santos` · `neuropsicóloga infantil santos` · `psicóloga boqueirão santos`
→ Atacadas pelas páginas de serviço existentes. Ação: GBP + diretórios + 2-3 backlinks locais.

**Camada 2 — Informacional nacional com intenção forte (alimenta a camada 1):**
`quanto custa avaliação neuropsicológica` · `como é feita avaliação neuropsicológica` ·
`laudo neuropsicológico` · `diferença psicólogo neuropsicólogo` · `avaliação neuropsicológica infantil`
→ Blog. SD 17, concorrentes DA ≤ 16, AI Overview ativo = tráfego + citações de IA.

**Camada 3 — Informacional de volume (TDAH/TEA/ansiedade), médio prazo:**
`tdah em adultos sintomas` · `autismo leve sinais` · `sintomas físicos de ansiedade`
→ Blog meses 3-6. Concorrência nacional maior (portais de saúde), mas cauda longa infinita;
cada post pergunta-resposta é isca de featured snippet/AI Overview.

---

## 4. Estrutura do site — ajustes sobre o que existe

A arquitetura atual está correta. Adicionar apenas:

1. **`/avaliacao-neuropsicologica-infantil` já coberta por `/neuropsicologia-infantil`** — manter, mas garantir que o title contenha "Avaliação Neuropsicológica Infantil em Santos" (busca real de pais).
2. **Nova página `/avaliacao-neuropsicologica-idosos`** — keyword `avaliação neuropsicológica idosos` (demência/Alzheimer). Nenhum concorrente local tem página dedicada; Sandra Lia anuncia "declínio cognitivo idosos" só no title do GBP. Público pagante (filhos adultos decidindo pelo pai/mãe).
3. **Bloco "Quanto custa?" em toda página de serviço** — seção honesta (fatores que influenciam + convite a chamar no WhatsApp). É a pergunta nº 1 (AI Overview comprova) e ninguém local responde on-page.
4. **Breadcrumbs + FAQ schema já existem** — conferir que TODAS as páginas de serviço têm FAQ de 6+ perguntas (a Solange tem FAQ com schema; precisamos superar, não empatar).
5. **Página `/consultorio`**: incorporar mapa + fotos reais do CNP quando disponíveis + CEP; mencionar "Boqueirão" e pontos de referência (captura hiperlocal, tática da Patrícia Abreu).

---

## 5. Funil de leads (jornada completa)

```
TOFU (descoberta)          MOFU (consideração)              BOFU (decisão)
Blog camadas 2-3     →     Página de serviço +         →    WhatsApp (CTA único)
AI Overviews/LLMs          FAQ + "quanto custa" +           Google Business Profile
Instagram da CNP           página /sobre (E-E-A-T)          Doctoralia
```

**Regras do funil:**
1. **Todo post de blog** linka para exatamente 1 página de serviço (CTA contextual no meio + fim) e 2-3 posts irmãos. Nunca deixar o leitor sem próximo passo.
2. **Toda página de serviço** responde: o que é → para quem → como funciona → quanto custa (fatores) → FAQ → CTA WhatsApp. O leitor que chega do blog precisa decidir na página.
3. **CTA único** (WhatsApp) em todo o site — já implementado. Medir como evento no Umami (`data-umami-event="whatsapp-click"` com atributo de página) para atribuir leads a conteúdo.
4. **Lead magnet (mês 2-3):** PDF "Guia para pais — como preparar seu filho para a avaliação neuropsicológica" oferecido nos posts infantis/TDAH em troca de e-mail... **somente se** a Julia quiser operar e-mail; caso contrário, manter WhatsApp como conversão única (mais simples e adequado ao comportamento local). Decisão dela.
5. **Remarketing orgânico:** pipeline IG→blog já previsto (post da CNP vira artigo expandido). O caminho inverso também: todo post novo vira card no IG e post no GBP.

---

## 6. GEO — posicionamento em buscadores de IA

Evidência coletada: AI Overview presente na SERP de "quanto custa avaliação neuropsicológica".
O que fazer (além do que o site já tem — llms.txt, frase de entidade, FAQ schema):

1. **Formato citável em todo post:** resposta de 2-4 frases logo abaixo do H1, com número/fato específico ("Uma avaliação neuropsicológica completa leva, em média, de 4 a 8 sessões...").
2. **Consistência de entidade fora do site** (é o que os LLMs cruzam): mesma descrição-base + CRP + endereço no GBP, Doctoralia, MundoPsicologos, BoaConsulta, IG e LinkedIn.
3. **Doctoralia é fonte primária dos LLMs** (top 4 em todas as SERPs coletadas): perfil 100% completo lá é ação GEO, não só SEO.
4. **Teste mensal de citação:** perguntar a ChatGPT/Perplexity/Gemini "neuropsicóloga em Santos" e "quanto custa avaliação neuropsicológica em Santos" e registrar se/como a Julia aparece (planilha simples; a métrica GEO do projeto).
5. **Wikidata/entidade:** quando o domínio definitivo estiver no ar, garantir `sameAs` bidirecional (site ↔ IG ↔ Doctoralia ↔ LinkedIn ↔ Lattes).

---

## 7. Blog — calendário priorizado por dados

Os 24 posts do `PLANO.md` §8.2 continuam válidos. Repriorização com base nas SERPs:

**Já publicados (4):** o que é avaliação · quanto custa · diferença psicólogo/neuropsicólogo/psiquiatra · TDAH adultos sinais. ✔ Cobrem exatamente as keywords de menor dificuldade — ordem certa.

**Próximos 8, em ordem de prioridade (dados → decisão):**
| # | Post | Keyword-alvo | Por quê agora |
|---|---|---|---|
| 5 | Como é feita a avaliação neuropsicológica: etapas e testes | como é feita avaliação neuropsicológica | SD 17, PAA presente na SERP local |
| 6 | Laudo neuropsicológico: o que contém, validade e para que serve | laudo neuropsicológico | Complementa a página-pilar; concorrência fraca |
| 7 | Avaliação neuropsicológica infantil: como preparar seu filho | avaliação neuropsicológica infantil | Alimenta /neuropsicologia-infantil |
| 8 | Avaliação neuropsicológica em idosos: memória, demência e diagnóstico precoce | avaliação neuropsicológica idosos | Sustenta a nova página /avaliacao-neuropsicologica-idosos (§4.2) |
| 9 | Plano de saúde cobre avaliação neuropsicológica? (reembolso e direitos) | avaliação neuropsicológica plano de saúde | Pergunta recorrente no Doctoralia Q&A (SERP §2.4); ninguém responde bem |
| 10 | Avaliação de TDAH: como o diagnóstico é feito | diagnóstico tdah como é feito | Ponte camada 3 → /avaliacao-tdah |
| 11 | Autismo nível 1 em crianças: sinais precoces | autismo leve sinais | Idem para /avaliacao-tea |
| 12 | Esquecimento: quando é normal e quando investigar | esquecimento excessivo quando se preocupar | Porta de entrada do público idoso/família |

Depois, seguir meses 3-6 do calendário original. Cadência: 1/semana; refresh trimestral dos posts com impressões no GSC em posição 5-15.

**Template obrigatório** (já validado pelo schema Zod): resposta direta no 1º parágrafo · H2 em pergunta · FAQ final com schema · autor box com CRP · 2-4 links internos · CTA WhatsApp contextual.

---

## 8. Roadmap 90 dias

**Semana 1-2 — Destravar (decisões da Julia):**
- [ ] Registrar domínio (recomendação mantida: `psicologajuliatozato.com.br`)
- [ ] Confirmar CEP + horários reais → preencher TODOs em `constants.ts`
- [ ] Fotos profissionais (retrato hero + consultório + autor box)
- [ ] Migrar: SITE_URL + astro.config + robots.txt Allow + remover X-Robots-Tag + DNS

**Semana 2-3 — Existir para o Google:**
- [ ] Google Search Console + sitemap; Google Business Profile completo (categoria Psicólogo + Neuropsicólogo, fotos, horários, link)
- [ ] Doctoralia + MundoPsicologos + BoaConsulta com descrição-base idêntica
- [ ] Link da CNP → site da Julia (site da clínica + bio do IG) — o backlink mais valioso disponível
- [ ] Evento `whatsapp-click` no Umami

**Mês 2 — Conteúdo e autoridade:**
- [ ] Posts 5-8 · página /avaliacao-neuropsicologica-idosos · bloco "quanto custa" nas páginas de serviço
- [ ] 1 post/semana no GBP (reaproveitando blog/IG)
- [ ] 2-3 parcerias locais para backlinks (escolas, pediatras, associações)

**Mês 3 — Medir e ajustar:**
- [ ] Posts 9-12 · revisão GSC (keywords em posição 5-15 → reforçar)
- [ ] 1º teste mensal de citação em LLMs (planilha GEO)
- [ ] Rodar novamente Ubersuggest (volumes de keywords + rank tracking com projeto criado)

**Metas (inalteradas do PLANO.md §11):** mês 1 indexado + GBP ativo · mês 3 top 3 marca + 8 posts ·
mês 6 top 10 "avaliação neuropsicológica santos" · mês 12 top 3 no nicho neuro + citações em LLMs.

---

## 9. Limitações desta análise e próxima coleta

Tier free do Ubersuggest: volumes de busca exatos e keywords por domínio ficaram indisponíveis
(limite de 3 relatórios/dia, já consumidos). Na próxima sessão vale coletar:
- `keyword_overview` de: psicóloga em santos · avaliação neuropsicológica · tdah teste (3/dia)
- `domain_keywords` de psicologacarla.com (quais posts do blog dela trazem tráfego = atalho editorial)
- Criar projeto no Ubersuggest com o domínio definitivo → rank tracking + site audit contínuos
