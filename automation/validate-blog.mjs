// Valida todos os posts .mdx contra o schema Zod de src/content.config.ts,
// sem depender do build do Astro (que trava neste Mac). Espelha as regras:
//   title <= 70 | description 110-165 | category no enum | pubDate válida |
//   faqs question/answer balanceados.
// Exit 0 = tudo válido; exit 1 = há problema (imprime quais).
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const BLOG = join(HERE, '..', 'src', 'content', 'blog');
const CATEGORIES = ['neuropsicologia', 'tdah', 'tea', 'ansiedade', 'infancia', 'terapia-online', 'psicoterapia'];

let problems = 0;
for (const file of readdirSync(BLOG).filter((f) => f.endsWith('.mdx'))) {
  const raw = readFileSync(join(BLOG, file), 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { console.log(`FALHA ${file}: sem frontmatter`); problems++; continue; }
  const fm = m[1];
  const strip = (s) => (s == null ? s : s.trim().replace(/^["'“]|["'”]$/g, ''));
  const title = strip((fm.match(/^title:\s*(.+)$/m) || [])[1]);
  const desc = strip((fm.match(/^description:\s*(.+)$/m) || [])[1]);
  const cat = (fm.match(/^category:\s*(.+)$/m) || [])[1]?.trim();
  const pub = (fm.match(/^pubDate:\s*(.+)$/m) || [])[1]?.trim();
  const hasFaqs = /^faqs:/m.test(fm);
  const q = (fm.match(/^\s*-\s*question:/gm) || []).length;
  const a = (fm.match(/^\s*answer:/gm) || []).length;

  const errs = [];
  if (!title) errs.push('title ausente');
  else if ([...title].length > 70) errs.push(`title ${[...title].length}>70`);
  if (!desc) errs.push('description ausente');
  else if ([...desc].length < 110) errs.push(`description ${[...desc].length}<110`);
  else if ([...desc].length > 165) errs.push(`description ${[...desc].length}>165`);
  if (!CATEGORIES.includes(cat)) errs.push(`category inválida: ${cat}`);
  if (!pub || Number.isNaN(Date.parse(pub))) errs.push(`pubDate inválida: ${pub}`);
  if (hasFaqs && q !== a) errs.push(`faqs desbalanceadas (q=${q} a=${a})`);

  if (errs.length) { console.log(`FALHA ${file}: ${errs.join(' | ')}`); problems += errs.length; }
}

if (problems > 0) { console.log(`\n${problems} problema(s) — corrija antes de publicar.`); process.exit(1); }
console.log('OK: todos os posts válidos contra o schema Zod.');
