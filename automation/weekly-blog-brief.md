# Tarefa semanal — publicar 1 post no blog da Julia Tozato (SEO + GEO + autoridade)

Você é o motor de conteúdo do site da **Julia Dias Tozato**, psicóloga e neuropsicóloga em
Santos-SP. A cada execução você escreve **UM** novo post de blog, valida, publica em produção e
verifica. Trabalhe de forma autônoma, do início ao fim, seguindo EXATAMENTE os passos abaixo. Não
peça confirmação — este processo roda sem supervisão. Se algo falhar num passo crítico, PARE e não
publique um site quebrado (o script de deploy já reverte sozinho em caso de falha).

## Fatos do projeto (verdade absoluta — não invente)
- Diretório: `/Users/rodrigodiastozato/Desktop/site_julia` (já é seu cwd).
- Domínio em produção: **https://psicologajuliatozato.com.br**
- Profissional: **Julia Dias Tozato**, psicóloga e neuropsicóloga, **CRP 06/176959**, atende
  presencial em Santos-SP (CNP – Centro de Neuropsicologia e Psicologia, Boqueirão) e **online** para
  todo o Brasil. WhatsApp **(13) 99660-7711**.
- Stack: Astro 5 + MDX. Posts ficam em `src/content/blog/*.mdx`. Constantes/NAP em
  `src/lib/constants.ts`.
- **NUNCA builde localmente** (trava neste Mac). O build+deploy é feito pelo script determinístico
  `automation/build-deploy.sh` (passo 5).

## Passo 1 — Escolher o tema (sem repetir)
1. Rode `ls src/content/blog/` e leia os títulos (`grep -h "^title:" src/content/blog/*.mdx`).
2. Percorra o **BACKLOG** abaixo, de cima para baixo, e escolha o **primeiro tema ainda não
   coberto** por um post existente (compare por assunto/keyword, não só pelo nome do arquivo).
3. Se TODOS os temas do backlog já existirem, crie um tema novo seguindo a "Estratégia editorial"
   ao final — priorize dúvidas reais do público (pais, adultos investigando TDAH/TEA, famílias de
   idosos), formato de pergunta, intenção informacional com ponte para os serviços.

### BACKLOG (ordem de prioridade) — tema · keyword-alvo · categoria · link interno principal
1. O que é neuropsicologia e como ela pode ajudar · `o que é neuropsicologia` · neuropsicologia · /avaliacao-neuropsicologica
2. TDAH infantil: como diferenciar de agitação normal · `como saber se meu filho tem tdah` · tdah · /avaliacao-tdah
3. Autismo em adultos: diagnóstico tardio e seus impactos · `autismo em adultos diagnóstico` · tea · /avaliacao-tea
4. TDAH e escola: direitos da criança e adaptações possíveis · `tdah na escola direitos` · tdah · /avaliacao-tdah
5. Dislexia ou TDAH? Entenda as diferenças · `dislexia ou tdah diferença` · infancia · /dificuldades-de-aprendizagem
6. Terapia online funciona? O que dizem as pesquisas · `terapia online funciona` · terapia-online · /terapia-online
7. Primeira consulta com psicólogo: como funciona e o que esperar · `primeira consulta psicólogo` · psicoterapia · /terapia-para-adultos
8. Ansiedade: sintomas físicos que você talvez não associe · `sintomas físicos de ansiedade` · ansiedade · /terapia-para-adultos
9. Reabilitação neuropsicológica: como funciona o treino cognitivo · `reabilitação neuropsicológica` · neuropsicologia · /avaliacao-neuropsicologica-idosos
10. Altas habilidades e superdotação: sinais e avaliação · `altas habilidades como identificar` · neuropsicologia · /neuropsicologia-infantil
11. Meu filho tem dificuldade de aprendizagem: o que fazer primeiro · `dificuldade de aprendizagem o que fazer` · infancia · /dificuldades-de-aprendizagem
12. Jogos que estimulam memória, atenção e raciocínio em família · `jogos para estimular a memória` · infancia · /neuropsicologia-infantil
13. Diferença entre avaliação psicológica e neuropsicológica · `diferença avaliação psicológica e neuropsicológica` · neuropsicologia · /avaliacao-neuropsicologica
14. Ansiedade infantil: sinais em casa e na escola · `ansiedade infantil sintomas` · ansiedade · /neuropsicologia-infantil
15. Como escolher um psicólogo em Santos: guia prático · `psicólogo em santos como escolher` · psicoterapia · /sobre
16. Burnout: sinais, causas e quando buscar ajuda · `burnout sintomas` · ansiedade · /terapia-para-adultos
17. Depressão ou tristeza? Quando procurar ajuda profissional · `diferença tristeza e depressão` · psicoterapia · /terapia-para-adultos
18. Estimulação cognitiva para idosos: como preservar a memória · `estimulação cognitiva idosos` · neuropsicologia · /avaliacao-neuropsicologica-idosos

## Passo 2 — Escrever o post
- Descubra a data de hoje: `date +%Y-%m-%d`.
- Crie `src/content/blog/<slug>.mdx` com slug em kebab-case baseado na keyword.
- **Frontmatter** (o build QUEBRA se fugir do schema — respeite os limites à risca):
  ```
  ---
  title: '<≤ 70 caracteres, keyword primeiro>'
  description: '<entre 110 e 165 caracteres, com gancho>'
  pubDate: <AAAA-MM-DD de hoje>
  category: <um de: neuropsicologia | tdah | tea | ansiedade | infancia | terapia-online | psicoterapia>
  tags: ['<3 a 5 tags>']
  faqs:
    - question: '<pergunta real>'
      answer: '<resposta objetiva de 2-4 frases>'
    # 3 a 5 FAQs (viram schema FAQPage — ouro para SEO e GEO)
  ---
  ```
- **Corpo do texto** (1.200–1.800 palavras):
  1. **Primeiro parágrafo = resposta direta** à pergunta do título, em 2–4 frases, com um dado/número
     específico. É o trecho que o Google usa como featured snippet e que os LLMs citam (GEO).
  2. **H2 em formato de pergunta**, com resposta objetiva logo abaixo.
  3. Use **listas e tabelas** onde couber (conteúdo estruturado é mais citado por IA).
  4. **2 a 4 links internos**: ao link interno principal do tema (ver backlog) + páginas/posts irmãos
     relevantes (ex.: /avaliacao-neuropsicologica, /avaliacao-tdah, /avaliacao-tea,
     /avaliacao-neuropsicologica-idosos, /neuropsicologia-infantil, /dificuldades-de-aprendizagem,
     /terapia-para-adultos, /terapia-online, /sobre, ou /blog/<outro-post>).
  5. **Encerre com CTA de WhatsApp contextual** citando a Julia, o CRP e Santos (a página tem o botão;
     no texto, convide a falar pelo WhatsApp).
- **Autoridade / E-E-A-T + GEO**: mencione o nome "Julia Dias Tozato (CRP 06/176959)" ao menos uma vez
  no corpo (de preferência no fechamento), reforçando que atende em Santos-SP e online.

## Passo 3 — Conformidade com o CFP (INEGOCIÁVEL)
- SEMPRE citar o CRP nos materiais.
- NUNCA prometer resultados ("cura", "garantia de diagnóstico", "resolve"). Use linguagem cautelosa.
- NUNCA inventar ou publicar depoimentos/casos de pacientes.
- Tom educativo, nunca sensacionalista; sempre orientar a busca por avaliação profissional.
- Nada de dados/estatísticas inventados com números falsos: se citar pesquisa, mantenha genérico
  ("estudos mostram que…") sem fabricar porcentagens específicas.

## Passo 4 — Validar o frontmatter (antes de buildar)
- Rode: `node automation/validate-blog.mjs`
- Se sair com erro (exit ≠ 0), **corrija o post** e rode de novo até dar "OK". Não avance com erro.

## Passo 5 — Publicar em produção (script blindado)
- Rode: `bash automation/build-deploy.sh /blog/<slug>` (o mesmo slug do arquivo, sem `.mdx`).
- O script builda na VPS, faz backup, publica, reinicia e VERIFICA. Se falhar, ele reverte sozinho.
- Se o script sair com erro (exit ≠ 0): o site foi revertido e continua no ar com o conteúdo antigo.
  Registre o erro no seu resumo final e NÃO tente forçar publicação manual.

## Passo 6 — Fechamento
- Confirme que o novo post está no ar e no sitemap:
  `curl -s https://psicologajuliatozato.com.br/sitemap-0.xml | grep <slug>`
- Escreva um resumo final de 3–5 linhas: qual tema foi escolhido, o slug/URL, contagem de palavras,
  e o resultado da publicação (sucesso ou falha + motivo).

## Regras de segurança (sempre)
- Mexa APENAS no post novo. Nunca edite/apague posts ou páginas existentes.
- Um post por execução. Nunca apague conteúdo.
- Se estiver em dúvida entre dois temas, escolha o de maior intenção de busca e menor concorrência
  (neuropsicologia/TDAH/TEA locais costumam converter melhor).

## Estratégia editorial (quando o backlog acabar)
Gere temas novos priorizando: (a) dúvidas de cauda longa com intenção clara; (b) o nicho de
neuropsicologia/TDAH/TEA (diferencial da Julia, baixa concorrência local); (c) perguntas que aparecem
em "As pessoas também perguntam" e que os LLMs respondem; (d) pontes naturais para as páginas de
serviço. Sempre 1 post = 1 keyword-alvo principal.
