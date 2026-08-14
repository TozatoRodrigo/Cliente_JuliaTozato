# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Site institucional + blog (Astro, SSG) da psicóloga/neuropsicóloga Julia Dias Tozato, em Santos-SP.
Conteúdo 100% em português (pt-BR). O site é fortemente orientado a SEO local e GEO (respostas
citáveis por LLMs/answer engines) — quase toda decisão de arquitetura existe para servir isso.

## Comandos

```bash
npm run dev      # servidor local (astro dev)
npm run check    # astro check (tipos + diagnostics do Astro)
npm run build    # astro check && astro build — falha se check ou build falhar
npm run preview  # serve o build de dist/
npm run test     # vitest run (todos os testes)
```

Rodar um único arquivo/teste de vitest:

```bash
npx vitest run tests/seo.test.ts
npx vitest run tests/seo.test.ts -t "nome do teste"
```

Não há linter dedicado — `astro check` (TypeScript strict, via `astro/tsconfigs/strict`) é a
checagem de tipos e também roda como parte de `npm run build`.

## Arquitetura

### Fonte única de verdade para dados de negócio (NAP) e SEO

`src/lib/constants.ts` centraliza nome, CRP, endereço, telefone, WhatsApp, Instagram, categorias do
blog e config de analytics. **Nunca** hardcodar telefone/endereço/nome em componentes ou páginas —
sempre importar daqui. Consistência de NAP (Name/Address/Phone) entre páginas é o que sustenta o SEO
local, e `tests/seo.test.ts` valida formato/consistência desses dados (E.164 do telefone, formato do
CRP, endereço completo).

`src/lib/seo.ts` tem os builders tipados de JSON-LD (`personSchema`, `psychologistBusinessSchema`,
`websiteSchema`, `serviceSchema`, `faqSchema`, `breadcrumbSchema`, `blogPostingSchema`). Cada página
monta seu próprio array `schemas` combinando esses builders e passa para `BaseLayout`. Os schemas
`Person` e `Psychologist` compartilham `@id` (`${SITE_URL}/#julia`) para o Google linkar as entidades.

### Layouts

- `BaseLayout.astro` — shell HTML raiz: meta tags, OG/Twitter, canonical, JSON-LD (`schemas` prop),
  RSS link, script de analytics (Umami self-hosted, desativado se `ANALYTICS.websiteId` vazio).
  Toda página passa por ele, direta ou indiretamente.
- `ServiceLayout.astro` — usado pelas páginas de serviço (avaliação de TDAH, TEA, etc.). Já monta
  breadcrumbs, `serviceSchema`/`breadcrumbSchema`/`faqSchema` e renderiza `Faq` + `CtaWhatsApp`
  automaticamente a partir das props — as páginas de serviço só fornecem título, intro, FAQs e o
  corpo em HTML via slot.

### Conteúdo do blog

Posts em `src/content/blog/*.mdx`, schema validado em `src/content.config.ts`. **O build falha** se
um post sair da faixa: `title` até 70 chars, `description` entre 110–165 chars, `category` fora do
enum de `BLOG_CATEGORIES` (`src/lib/constants.ts`), etc. Isso é intencional — é o guard-rail de SEO
para novos posts. `faqs` no frontmatter viram schema `FAQPage` automaticamente.

Roteamento do blog é dinâmico: `src/pages/blog/[slug].astro` (`getStaticPaths` sobre a collection,
ignora `draft: true`) e `src/pages/blog/categoria/[categoria].astro`. Páginas institucionais/serviço
são arquivos `.astro` estáticos e individuais em `src/pages/`.

### Build de URLs limpas

`astro.config.mjs` usa `build: { format: 'file' }` (gera `/pagina.html`, não `/pagina/index.html`).
Isso é combinado com `try_files $uri $uri.html $uri/` no `deploy/nginx.conf` para servir URLs sem
barra final e sem redirect 301, batendo exatamente com as tags `<link rel="canonical">`. Se alterar
`build.format` ou `trailingSlash`, o nginx.conf precisa mudar junto.

`SITE_URL` existe em dois lugares que precisam ficar sincronizados: `astro.config.mjs` (`site`) e
`src/lib/constants.ts` (`SITE_URL`).

### Deploy

`.github/workflows/deploy.yml` builda (Linux runner — evita travar no Mac) em todo push a `main` que
toque `src/**`, `public/**`, `astro.config.mjs`, etc., depois `rsync --delete` do `dist/` para a VPS
via SSH e `docker compose restart`. Há um guard de sanidade: o job falha se menos de 35 HTML forem
gerados (evita publicar um build quebrado/incompleto). Verifica HTTP 200 em produção ao final.

### Estilo

Tailwind v4 via plugin Vite (`@tailwindcss/vite`), sem `tailwind.config.js` — tema (cores da marca,
fontes Inter/Lora) definido em `@theme` dentro de `src/styles/global.css`. A classe `.prose-site`
(também em `global.css`) é a tipografia padrão de conteúdo longo (posts e páginas de serviço) e é
usada em vez de `@tailwindcss/typography`.

### GEO (respostas citáveis por IA)

`public/llms.txt` é um índice manual de serviços/páginas no formato llms.txt, mantido à mão — ao
adicionar/remover uma página de serviço, atualizar este arquivo também. O primeiro parágrafo de cada
página de serviço (`intro` prop do `ServiceLayout`) é escrito como resposta direta e citável à
intenção de busca, não como texto de marketing solto.
