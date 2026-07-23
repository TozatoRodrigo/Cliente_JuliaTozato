import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Schema do blog: o build FALHA se um post sair fora do padrão de SEO
 * (title longo demais, description fora da faixa ideal, categoria inválida).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z
      .string()
      .max(70, 'Title deve ter no máximo 70 caracteres para não ser cortado na SERP'),
    description: z
      .string()
      .min(110, 'Meta description deve ter pelo menos 110 caracteres')
      .max(165, 'Meta description deve ter no máximo 165 caracteres'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      'neuropsicologia',
      'tdah',
      'tea',
      'ansiedade',
      'infancia',
      'terapia-online',
      'psicoterapia',
    ]),
    tags: z.array(z.string()).default([]),
    /** FAQs renderizadas ao final do post com schema FAQPage (SEO + GEO). */
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
