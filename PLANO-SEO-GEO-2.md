# Plano de Crescimento SEO + GEO — Atualização (14/08/2026)

> Complementa o `PLANO-SEO-GEO.md` (22-23/07/2026). Não o substitui: aquele documento continua
> válido como registro histórico do diagnóstico inicial e do que já foi executado. Este arquivo
> traz **dados de mercado atualizados** (Ubersuggest, conta paga, + SERPs reais do Google.com.br
> coletadas ao vivo em 14/08/2026), reavalia o que mudou desde então, e substitui o roadmap §8
> daquele documento por um novo, com foco explícito em **Santos e região (Baixada Santista)**,
> como pedido.

## 0. O que mudou desde 22/07 (recontagem rápida)

Quase tudo que dependia só de código foi resolvido — o diagnóstico do documento anterior
("o gargalo não é código, é existir fora do site") **se confirma e se aprofunda** com os dados de
hoje:

| Item do blocklist antigo (§1) | Status hoje |
|---|---|
| Domínio definitivo | ✅ Registrado e no ar, indexado pelo Google |
| CEP / horários reais | ✅ Preenchidos em `constants.ts` |
| Fotos profissionais | ✅ Em uso (hero, sobre, autor box, og:image) |
| Google Business Profile | 🟡 **Existe agora**, mas incompleto — sem horário de funcionamento, **zero avaliações**, não aparece no pacote local (3-pack) de nenhuma busca testada |
| Perfil Doctoralia | ❌ Continua inexistente — Doctoralia é #1 ou #2 em toda SERP testada hoje |
| Blog (4 posts em 23/07) | ✅ **16 posts publicados** — os 8 prioritários do roadmap antigo, todos no ar |
| Indexação Google | ✅ Confirmada — o site aparece para buscas com o nome da Julia; não aparece ainda para as keywords de cabeça (ver §2) |

**Novidade crítica não prevista no plano antigo:** o site tem hoje **Domain Authority 1, zero
backlinks, zero tráfego orgânico e apenas 1 keyword indexada** (Ubersuggest Traffic Analyzer,
14/08). Ou seja: conteúdo e técnica estão prontos e à frente do cronograma original, mas o site
ainda não acumulou nenhuma autoridade externa. Esse é o gargalo nº 1 agora, mais ainda do que em
julho — porque agora **é a única coisa que falta**.

---

## 1. Dados de mercado atualizados (Ubersuggest, conta paga, 14/08/2026)

### 1.1 Dificuldade e composição de SERP por keyword

| Keyword | SD | DA médio no top 10 | Backlinks médios | Leitura |
|---|---|---|---|---|
| avaliação neuropsicológica santos | **12** (baixa) | 24 | 9 | Confirma dado de julho. Site da Julia **não aparece** nos 10 primeiros nem no local pack hoje. |
| neuropsicóloga santos | **17** (baixa) | 31 | 10 | 9 SERP features ativos (rich results) — Google já entrega respostas estruturadas aqui. |
| psicóloga em santos | **12** (baixa) | 34 | 39 | SD baixo, mas backlinks médios (39) mais altos — SERP dominada por diretórios de alta DA (Doctoralia, LinkedIn, psicólogos SP). Confirma leitura antiga: frente de médio prazo. |
| psicóloga são vicente | **12** (baixa) | 36 | **0** | **Sem concorrente individual entrincheirado** — só diretórios/clínicas genéricas. Mesma dificuldade de Santos, autoridade zero exigida. |

*Nenhuma das 4 keywords tem volume de busca mensal detectável na base do Ubersuggest — mercado
hiperlocal de cauda longa, como já indicado em julho. Não é motivo para não atacar: é motivo para
não esperar volume de pesquisa como métrica de sucesso — tráfego virá de long-tail agregado.*

### 1.2 SERP real do Google.com.br para "avaliação neuropsicológica santos" (coletada ao vivo, 14/08)

**Anúncios pagos (4 concorrentes anunciando nesta keyword exata — não estava no radar em julho):**
solangepsicologa.com.br · neucog.com.br · mindneuropsicologia.com · brunarodriguespsi.com ·
cliapsicologia.com.br. Sinal de que o nicho está mais competitivo/ativo do que há 3 semanas.

**Pacote local (Google Maps, o "prêmio nº 1" da SERP):** Sandra Lia Rodrigues (47 avaliações) ·
uma clínica com 1 avaliação · Instituto Acesso NeuroPsi (28 avaliações). **A Julia não aparece
aqui.** Todos os 3 que aparecem têm avaliações no Google — nenhum tem zero.

**Orgânico (fora de anúncios/local pack):** Doctoralia → Instagram @cnpneuroepsicologia (6,3 mil
seguidores) → ibninstituto.com.br → jaquelineborgesneuropsicologia.com → solangepsicologa.com.br →
neurosantos.com.br → neucog.com.br → nivaldapdejesus.com.br → mundopsicologos.com.

**"As pessoas também perguntam" (alvos diretos de featured snippet / GEO):**
- "Qual o valor de uma avaliação neuropsicológica completa?" — já coberto pelo post
  `quanto-custa-avaliacao-neuropsicologica.mdx`.
- **"Tem como fazer uma avaliação neuropsicológica pelo SUS?"** — **gap de conteúdo real**, não
  coberto em nenhuma página do site hoje.
- "O que se descobre no teste neuropsicológico?" — coberto por `o-que-e-avaliacao-neuropsicologica`.
- "Onde fazer o teste neuropsicológico?" — intenção local; nenhuma página responde isso de forma
  direta e citável no primeiro parágrafo.

**"Outras pessoas pesquisaram":** inclui **"Neuropsicólogo unimed santos"** — confirma que
perguntas sobre convênio/reembolso específico (Unimed nomeada) têm demanda real, e
**"Avaliações sobre centro de neuropsicologia e psicologia cnp santos"** — as pessoas já procuram
ativamente avaliações da própria clínica da Julia no Google.

### 1.3 Prompts de IA reais para "avaliação neuropsicológica santos" (Ubersuggest AI Prompt Ideas)

Estas são as perguntas que o Ubersuggest identifica sendo feitas a assistentes de IA sobre este
tema — a evidência mais direta possível de intenção GEO:

- "Onde encontrar avaliação neuropsicológica em Santos?"
- "Quais clínicas oferecem avaliação neuropsicológica em Santos?"
- **"Preço médio de uma avaliação neuropsicológica na Baixada Santista"** — confirma que o termo
  regional "Baixada Santista" já é usado por quem pesquisa, validando a expansão pedida.
- "Quanto custa uma avaliação neuropsicológica em Santos?"
- "Clínicas especializadas em neuropsicologia para crianças em Santos"
- "Quais os benefícios da avaliação neuropsicológica realizada [precocemente]"
- **"Profissionais de neuropsicologia recomendados na região de [Santos]"**
- "Como agendar uma avaliação neuropsicológica em Santos?" / "...particular em Santos?"

**Leitura GEO:** o formato ideal de resposta citável muda pouco do que o plano de julho já
recomendava, mas agora há evidência de que "Baixada Santista" e "profissionais recomendados na
região" são formulações reais — vale usar essas frases quase literalmente em intros de página/post.

### 1.4 Situação do próprio domínio (Ubersuggest Traffic Analyzer, 14/08)

| Métrica | Valor |
|---|---|
| Domain Authority | **1** |
| Backlinks | **0** |
| Tráfego orgânico mensal | **0** |
| Keywords orgânicas indexadas | **1** (tendência: +1) |

Zero backlinks é a explicação técnica direta de por que o site — apesar de tecnicamente superior
aos concorrentes, como já constatado em julho — ainda não aparece em nenhuma SERP não-branded
testada hoje. Não é problema de indexação (o Google indexa o site normalmente para buscas pelo
nome da Julia — confirmado ao vivo) nem de conteúdo. É 100% autoridade externa.

---

## 2. Google Business Profile — de "não existe" para "existe e está perdendo"

Achado novo mais importante desta auditoria: **o GBP já foi criado** (nome, endereço e telefone
corretos aparecem no painel do Google). Isso muda a ação de "criar" para "otimizar e ganhar
avaliações" — mais barato e mais rápido de executar que criar do zero, mas **a lacuna de
avaliações é o que está custando a posição no pacote local hoje**:

| | Julia (GBP atual) | Concorrentes no pacote local |
|---|---|---|
| Avaliações | **0** | 28, 47, e outro com pelo menos 1 |
| Horário de funcionamento | **Ausente** ("Adicionar horário de funcionamento") | Preenchido em todos |
| Fotos | Parece ter só 1-2 | Múltiplas (galeria + vídeo em alguns) |

**Ações imediatas (a maior alavanca de ROI do plano inteiro, mantém a leitura de julho):**
1. Completar 100% do perfil: categoria secundária "Neuropsicólogo" além de "Psicólogo", horário de
   funcionamento real, descrição com a `entitySentence` já padronizada no código, fotos do
   consultório (quando disponíveis) e da Julia.
2. **Pedir avaliação a cada paciente atendido a partir de agora** — link direto de avaliação do
   GBP mandado por WhatsApp depois da sessão/devolutiva. Meta realista: 10 avaliações em 60 dias
   já teria colocado o perfil em patamar competitivo com o pior dos 3 concorrentes do pacote local
   hoje.
3. Publicar 1 post/semana no GBP (reaproveitando blog/Instagram) — o próprio Google recompensa
   perfis ativos no ranking do pacote local.

---

## 3. Ativos externos ainda não usados

### 3.1 Instagram da CNP — ainda o ativo mais forte fora do site

@cnpneuroepsicologia tem **6,3 mil seguidores** e aparece na posição 2 orgânica de
"avaliação neuropsicológica santos" hoje (subiu de posição 5 em julho). Não confirmei ao vivo se a
bio já linka para `psicologajuliatozato.com.br` — **verificar e, se não linkar, é a ação de maior
ROI/menor esforço de todo este plano** (5 minutos de trabalho, ativo que já tem audiência e
ranking).

### 3.2 Diretórios locais onde a CNP já aparece (novos, não listados em julho)

Busca no Google mostrou a CNP indexada nestes diretórios — nenhum tem o nome da Julia associado
ainda, o que são citações NAP grátis e rápidas de reivindicar/completar:
- AquiTemNegócios (aquitemnegocios.com.br)
- RankLevel (ranklevel.com.br)
- AgendarConsulta (guia.agendarconsulta.com)
- BoaConsulta (boaconsulta.com) — aparece nos "Os 10 Neuropsicologia mais indicados em Santos"

Somados ao Doctoralia e MundoPsicologos já previstos em julho, isso dá **6 diretórios locais** para
citação NAP consistente — reforça tanto SEO local quanto GEO (§6 do plano antigo: "consistência de
entidade fora do site é o que os LLMs cruzam").

### 3.3 Concorrentes novos identificados nesta rodada (mapa competitivo atualizado)

Não estavam no radar de julho: **Neuropsi** (Gonzaga), **IBN – Instituto Brasileiro de
Neuropsicologia**, neurosantos.com.br, andersonneuropsi.com, nivaldapdejesus.com.br,
brunarodriguespsi.com (novo, já anuncia no Google Ads), psicologalaryssaborges.com.br,
helenasantos.com.br. Nenhum muda a leitura estratégica (autoridade ainda baixa, DA médio 24-36),
mas confirma que o nicho está mais movimentado do que em julho — motivo a mais para não adiar as
ações de autoridade.

---

## 4. Auditoria técnica/on-page atual (código, 14/08)

Revisão direta do repositório — o que está excelente e o que ainda falta:

**Já excelente (não mexer):**
- JSON-LD completo e correto (`Person`, `Psychologist`, `WebSite`, `Service`, `FAQPage`,
  `BreadcrumbList`, `BlogPosting`) com `@id` compartilhado entre entidades — `src/lib/seo.ts`.
- Schema Zod do blog impede publicar post fora da faixa ideal de SEO (title/description) —
  `src/content.config.ts`.
- `robots.txt` liberado (`Allow: /`) e sitemap referenciado corretamente.
- 16 posts de blog cobrindo exatamente as keywords de menor dificuldade identificadas em julho.
- `og:image`/`twitter:image`, foco visível, skip-link e página 404 — implementados nesta sessão
  (ver commit `1e4e18f`).
- NAP centralizado em `constants.ts`, testado em `tests/seo.test.ts`.

**Gaps encontrados agora:**
1. **Nenhuma página responde "SUS cobre avaliação neuropsicológica?"** — pergunta real do "As
   pessoas também perguntam". Post novo ou seção na FAQ de `/duvidas-frequentes`.
2. **Nenhuma menção a convênios específicos por nome** (Unimed apareceu em "outras pessoas
   pesquisaram") — hoje o site só fala em "reembolso mediante recibo" de forma genérica. Uma FAQ
   dizendo explicitamente que não há atendimento direto por convênio, mas que planos como Unimed
   costumam reembolsar mediante recibo, captura essa busca sem prometer o que não é verdade.
2. **Zero menção à Baixada Santista** em qualquer página — nem para SEO nem para GEO. Ver §5.
4. **Sem prova social no site** (nenhuma avaliação/depoimento, nem contagem de avaliações do
   Google embutida) — depois que o GBP acumular avaliações (§2), considerar exibir
   "X avaliações, nota Y no Google" com link, reforço de E-E-A-T que custa zero manutenção.
5. **`/consultorio` sem nenhuma imagem real do espaço físico** (achado já registrado na conversa
   anterior) — reforça aqui porque também é sinal de autoridade local (Google valoriza fotos
   geolocalizadas de estabelecimento).

---

## 5. Expansão regional — Santos e Baixada Santista

Dado novo que responde diretamente ao pedido do usuário: testei "psicóloga são vicente" no
Ubersuggest — **mesma dificuldade (SD 12) que Santos, e média de backlinks dos concorrentes
igual a zero**. Ou seja, expandir para a região não é uma aposta — é uma keyword tão fácil quanto
Santos, só que sem concorrente pessoal nenhum entrincheirado ainda.

**Como expandir sem diluir o foco em Santos (que continua sendo a prioridade nº 1):**

1. **Não criar páginas dedicadas por cidade agora** (`/psicologa-sao-vicente`,
   `/psicologa-praia-grande` etc.) — com autoridade zero, multiplicar páginas finas por cidade
   dilui o pouco link equity que existe. É tática de médio prazo (mês 4-6), depois que Santos
   estiver rankeando.
2. **Ação imediata e barata: ampliar o `areaServed` do schema `Psychologist`** em
   `src/lib/seo.ts` (`psychologistBusinessSchema`) para incluir São Vicente, Praia Grande, Guarujá
   e Cubatão além de Santos — sinal estruturado de área de atuação sem criar conteúdo novo.
3. **Nas páginas de serviço e no `/terapia-online`**, adicionar uma frase natural mencionando
   atendimento presencial em Santos e "fácil acesso para quem vem de São Vicente, Praia Grande e
   Guarujá" (a Av. Conselheiro Nébias é via de ligação regional — já mencionado em
   `/consultorio`). Reforça relevância regional sem criar página nova.
4. **1-2 posts de blog com enquadramento regional** (não por cidade individual): ex. "Avaliação
   neuropsicológica na Baixada Santista: como escolher onde fazer" — keyword-alvo confirmada pelo
   AI Prompt Ideas do Ubersuggest (§1.3), e serve de hub linkando para as páginas de serviço.
5. **No GBP**, adicionar as cidades vizinhas em "área de atendimento" (campo nativo do Google
   Business Profile para isso, sem custo).

---

## 6. Roadmap priorizado (substitui o §8 do plano antigo)

> **Nota sobre autoria:** os itens desta seção que dependem só de código/conteúdo foram
> implementados diretamente nesta sessão (marcados ✅ com link para o commit/arquivo). Os que
> exigem login em contas de terceiros (Google Business Profile, Doctoralia, Instagram, diretórios)
> ou relacionamento humano (pedir avaliação a pacientes, parcerias locais) **não podem ser feitos
> por mim** — criar contas ou autenticar em nome de terceiros é uma ação vedada por segurança, e
> pedir avaliação/parceria exige a Julia ou o Rodrigo pessoalmente. Ficam como checklist para
> vocês, sem marcação.

### Agora (esta semana) — maior ROI, menor esforço

- [ ] **Verificar/adicionar link para o site na bio do Instagram @cnpneuroepsicologia** (§3.1) —
  5 minutos, ativo com 6,3 mil seguidores e ranking já conquistado.
- [ ] **Completar 100% o Google Business Profile**: horário de funcionamento, categoria
  "Neuropsicólogo", fotos, descrição com a `entitySentence` (§2).
- [ ] **Começar a pedir avaliação no Google** a cada paciente, via link direto por WhatsApp.
- [ ] Reivindicar/completar a Julia nos 6 diretórios locais mapeados (Doctoralia, MundoPsicologos,
  BoaConsulta, AquiTemNegócios, RankLevel, AgendarConsulta) com a `entitySentence` idêntica em
  todos — reforça SEO local **e** GEO (consistência de entidade entre fontes).

### Semanas 2-4 — conteúdo e schema

- [x] **Ampliar `areaServed`** em `psychologistBusinessSchema()` **e** `serviceSchema()` para
  Santos + São Vicente + Praia Grande + Guarujá + Cubatão (§5.2) — implementado via
  `SERVICE_AREA_CITIES` em `constants.ts`, reaproveitado nos dois schemas. Verificado no HTML
  gerado (`dist/*.html`).
- [x] Post novo: [`avaliacao-neuropsicologica-pelo-sus.mdx`](src/content/blog/avaliacao-neuropsicologica-pelo-sus.mdx)
  — responde com honestidade a "tem como fazer avaliação neuropsicológica pelo SUS?", sem
  inventar nomes de unidades específicas (só o que dá para afirmar com segurança). Publica
  17/09.
- [x] FAQ sobre Unimed nomeada adicionada em `/duvidas-frequentes` e em `/avaliacao-neuropsicologica`.
- [x] Post regional: [`avaliacao-neuropsicologica-baixada-santista.mdx`](src/content/blog/avaliacao-neuropsicologica-baixada-santista.mdx)
  — "como escolher", alvo do AI Prompt Idea do Ubersuggest. Publica 24/09.
- [x] Intro de `/avaliacao-neuropsicologica` reescrita para responder "onde fazer o teste
  neuropsicológico" na primeira frase; primeiro parágrafo de `/consultorio` ajustado com o mesmo
  objetivo + menção explícita a São Vicente/Praia Grande/Guarujá/Cubatão.

Todas as mudanças acima foram implementadas em código nesta sessão (commit pendente — ver nota no
fim do arquivo). `npm run check`, `npm run build` (42 páginas, antes 40) e `npm run test` (24/24)
passaram depois das mudanças.

### Mês 2-3 — autoridade e medição

- [ ] 2-3 parcerias locais para backlink (pediatras, escolas, associações) — meta de julho mantida:
  15-20 referring domains em 6 meses já supera o teto do nicho (DA 18).
- [ ] Reavaliar posição no pacote local depois de 10+ avaliações no GBP.
- [ ] Rodar de novo o Ubersuggest Traffic Analyzer no domínio próprio — comparar DA/backlinks/
  keywords indexadas contra a linha de base desta auditoria (DA 1, 0 backlinks, 1 keyword).
- [ ] 1º teste mensal de citação em LLMs (ChatGPT/Perplexity/Gemini), como já previsto em julho.
- [ ] Se o orçamento permitir, considerar um teste pequeno de Google Ads na keyword de cabeça —
  5 concorrentes diretos já anunciam nela (§1.2); isso não é SEO, é uma decisão à parte, só
  registrando o dado competitivo encontrado.

**Meta atualizada (mais mensurável que a de julho):** sair de DA 1 / 0 backlinks / 0 tráfego hoje
para aparecer no pacote local de pelo menos 1 keyword de Santos em 90 dias, com 10+ avaliações no
GBP — essa combinação, pelos dados desta auditoria, é o que efetivamente diferencia quem aparece
no pacote local de quem não aparece no nicho.
