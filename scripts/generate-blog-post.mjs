// Gera 1 novo post de blog via API da Claude (roda no GitHub Actions, semanal).
// Escolhe o próximo tema do backlog ainda não coberto, chama o modelo, escreve
// o .mdx e sinaliza (GITHUB_OUTPUT) se criou algo. A validação de schema e o
// build/deploy ficam a cargo do workflow.
import { readdirSync, writeFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(HERE, '..', 'src', 'content', 'blog');

// Provedor de LLM — agnóstico. Por padrão usa a API da Anthropic; para usar um
// provedor compatível (ex.: GLM/Z.ai), defina as variáveis LLM_BASE_URL e
// LLM_MODEL. A chave vai sempre em ANTHROPIC_API_KEY.
//   Anthropic:  (nada) → claude-opus-4-8
//   GLM/Z.ai:   LLM_BASE_URL=https://api.z.ai/api/anthropic  LLM_MODEL=glm-4.7
const API_KEY = process.env.ANTHROPIC_API_KEY;
const BASE_URL = (process.env.LLM_BASE_URL || 'https://api.anthropic.com').replace(/\/+$/, '');
const MODEL = process.env.LLM_MODEL || 'claude-opus-4-8';
const USE_BEARER = !!process.env.LLM_BASE_URL; // provedores compatíveis usam Authorization: Bearer

// Backlog priorizado — tema · slug · keyword-alvo · categoria · link interno principal.
const BACKLOG = [
  { slug: 'o-que-e-neuropsicologia', title: 'O que é neuropsicologia e como ela pode ajudar', keyword: 'o que é neuropsicologia', category: 'neuropsicologia', link: '/avaliacao-neuropsicologica' },
  { slug: 'como-saber-se-meu-filho-tem-tdah', title: 'TDAH infantil: como diferenciar de agitação normal', keyword: 'como saber se meu filho tem tdah', category: 'tdah', link: '/avaliacao-tdah' },
  { slug: 'autismo-em-adultos-diagnostico-tardio', title: 'Autismo em adultos: diagnóstico tardio e seus impactos', keyword: 'autismo em adultos diagnóstico', category: 'tea', link: '/avaliacao-tea' },
  { slug: 'tdah-na-escola-direitos', title: 'TDAH e escola: direitos da criança e adaptações possíveis', keyword: 'tdah na escola direitos', category: 'tdah', link: '/avaliacao-tdah' },
  { slug: 'dislexia-ou-tdah-diferenca', title: 'Dislexia ou TDAH? Entenda as diferenças', keyword: 'dislexia ou tdah diferença', category: 'infancia', link: '/dificuldades-de-aprendizagem' },
  { slug: 'terapia-online-funciona', title: 'Terapia online funciona? O que dizem as pesquisas', keyword: 'terapia online funciona', category: 'terapia-online', link: '/terapia-online' },
  { slug: 'primeira-consulta-psicologo', title: 'Primeira consulta com psicólogo: como funciona e o que esperar', keyword: 'primeira consulta psicólogo', category: 'psicoterapia', link: '/terapia-para-adultos' },
  { slug: 'sintomas-fisicos-de-ansiedade', title: 'Ansiedade: sintomas físicos que você talvez não associe', keyword: 'sintomas físicos de ansiedade', category: 'ansiedade', link: '/terapia-para-adultos' },
  { slug: 'reabilitacao-neuropsicologica', title: 'Reabilitação neuropsicológica: como funciona o treino cognitivo', keyword: 'reabilitação neuropsicológica', category: 'neuropsicologia', link: '/avaliacao-neuropsicologica-idosos' },
  { slug: 'altas-habilidades-como-identificar', title: 'Altas habilidades e superdotação: sinais e avaliação', keyword: 'altas habilidades como identificar', category: 'neuropsicologia', link: '/neuropsicologia-infantil' },
  { slug: 'dificuldade-de-aprendizagem-o-que-fazer', title: 'Meu filho tem dificuldade de aprendizagem: o que fazer primeiro', keyword: 'dificuldade de aprendizagem o que fazer', category: 'infancia', link: '/dificuldades-de-aprendizagem' },
  { slug: 'jogos-para-estimular-a-memoria', title: 'Jogos que estimulam memória, atenção e raciocínio em família', keyword: 'jogos para estimular a memória', category: 'infancia', link: '/neuropsicologia-infantil' },
  { slug: 'diferenca-avaliacao-psicologica-e-neuropsicologica', title: 'Diferença entre avaliação psicológica e neuropsicológica', keyword: 'diferença avaliação psicológica e neuropsicológica', category: 'neuropsicologia', link: '/avaliacao-neuropsicologica' },
  { slug: 'ansiedade-infantil-sintomas', title: 'Ansiedade infantil: sinais em casa e na escola', keyword: 'ansiedade infantil sintomas', category: 'ansiedade', link: '/neuropsicologia-infantil' },
  { slug: 'psicologo-em-santos-como-escolher', title: 'Como escolher um psicólogo em Santos: guia prático', keyword: 'psicólogo em santos como escolher', category: 'psicoterapia', link: '/sobre' },
  { slug: 'burnout-sintomas', title: 'Burnout: sinais, causas e quando buscar ajuda', keyword: 'burnout sintomas', category: 'ansiedade', link: '/terapia-para-adultos' },
  { slug: 'diferenca-tristeza-e-depressao', title: 'Depressão ou tristeza? Quando procurar ajuda profissional', keyword: 'diferença tristeza e depressão', category: 'psicoterapia', link: '/terapia-para-adultos' },
  { slug: 'estimulacao-cognitiva-idosos', title: 'Estimulação cognitiva para idosos: como preservar a memória', keyword: 'estimulação cognitiva idosos', category: 'neuropsicologia', link: '/avaliacao-neuropsicologica-idosos' },
];

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}

const existing = new Set(readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, '')));
const topic = BACKLOG.find((t) => !existing.has(t.slug));

if (!topic) {
  console.log('Backlog esgotado — nenhum post novo a gerar. Reponha o BACKLOG.');
  setOutput('created', 'false');
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);

const SYSTEM = `Você é a redatora do blog da psicóloga e neuropsicóloga Julia Dias Tozato (CRP 06/176959), que
atende em Santos-SP e online, WhatsApp (13) 99660-7711. Ela tem formação em Neuropsicologia pelo
Hospital Israelita Albert Einstein, é especialista em Terapia Cognitivo-Comportamental e Análise do
Comportamento, e é supervisora clínica.

Escreva UM post de blog completo em formato MDX para um site Astro. Responda APENAS com o conteúdo do
arquivo .mdx (frontmatter YAML + corpo em Markdown), sem cercas de código, sem comentários, sem nada
antes ou depois.

REGRAS DO FRONTMATTER (o build QUEBRA se violar — cumpra à risca):
- title: string entre aspas simples, NO MÁXIMO 70 caracteres, com a keyword.
- description: string entre aspas simples, ENTRE 110 E 165 caracteres, com um gancho.
- pubDate: ${today}
- category: exatamente um de: neuropsicologia | tdah | tea | ansiedade | infancia | terapia-online | psicoterapia
- tags: lista de 3 a 5 strings.
- faqs: lista de 3 a 5 itens, cada um com "question" e "answer" (respostas de 2 a 4 frases).

Formato exato do frontmatter:
---
title: '...'
description: '...'
pubDate: ${today}
category: ...
tags: ['...', '...', '...']
faqs:
  - question: '...'
    answer: '...'
---

REGRAS DO CORPO (1.200 a 1.800 palavras):
1. Primeiro parágrafo = RESPOSTA DIRETA à pergunta do título, em 2 a 4 frases, com um dado específico.
2. Use H2 (##) em formato de pergunta, com respostas objetivas.
3. Use listas e tabelas onde couber.
4. Inclua de 2 a 4 links internos em markdown — um obrigatoriamente para ${topic.link} — e outros para
   páginas/posts relevantes (/avaliacao-neuropsicologica, /avaliacao-tdah, /avaliacao-tea,
   /avaliacao-neuropsicologica-idosos, /neuropsicologia-infantil, /dificuldades-de-aprendizagem,
   /terapia-para-adultos, /terapia-online, /sobre).
5. Encerre com uma chamada para conversar pelo WhatsApp, citando "Julia Dias Tozato (CRP 06/176959)" e Santos.

CONFORMIDADE CFP (INEGOCIÁVEL): sempre citar o CRP; NUNCA prometer cura ou resultados; NUNCA inventar
depoimentos ou casos de pacientes; tom educativo; sempre orientar a busca por avaliação profissional;
não fabrique estatísticas com números específicos (use "estudos indicam que..." de forma genérica).

Não use caracteres '<' ou '{' soltos no corpo (quebram o MDX).`;

const USER = `Escreva o post de hoje sobre o tema:
- Título sugerido: ${topic.title}
- Keyword-alvo principal: ${topic.keyword}
- Categoria: ${topic.category}
- Link interno principal (use ao menos uma vez): ${topic.link}
- Nome do arquivo/slug: ${topic.slug}
Responda apenas com o conteúdo .mdx.`;

const headers = { 'anthropic-version': '2023-06-01', 'content-type': 'application/json' };
if (USE_BEARER) headers['authorization'] = `Bearer ${API_KEY}`;
else headers['x-api-key'] = API_KEY;

console.log(`Gerando com modelo "${MODEL}" via ${BASE_URL}`);
const res = await fetch(`${BASE_URL}/v1/messages`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    model: MODEL,
    max_tokens: 16000,
    system: SYSTEM,
    messages: [{ role: 'user', content: USER }],
  }),
});

if (!res.ok) {
  console.error(`Erro HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const data = await res.json();
if (data.stop_reason === 'refusal') {
  console.error('Modelo recusou a geração.');
  process.exit(1);
}

let mdx = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
// remove cercas de código acidentais
mdx = mdx.replace(/^```(?:mdx|markdown)?\s*\n/, '').replace(/\n```\s*$/, '').trim();

if (!mdx.startsWith('---')) {
  console.error('Saída não começa com frontmatter. Abortando.\n' + mdx.slice(0, 300));
  process.exit(1);
}

const outPath = join(BLOG_DIR, `${topic.slug}.mdx`);
writeFileSync(outPath, mdx + '\n', 'utf8');
console.log(`Post gerado: src/content/blog/${topic.slug}.mdx (${mdx.split(/\s+/).length} palavras aprox.)`);
setOutput('created', 'true');
setOutput('slug', topic.slug);
