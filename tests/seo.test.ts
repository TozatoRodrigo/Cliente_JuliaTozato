import { describe, expect, it } from 'vitest';
import { ADDRESS, CONTACT, PROFESSIONAL, SITE_URL } from '../src/lib/constants';
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  personSchema,
  psychologistBusinessSchema,
  serviceSchema,
} from '../src/lib/seo';

describe('constants (NAP)', () => {
  it('has a valid E.164 phone matching the display phone', () => {
    expect(CONTACT.phoneE164).toMatch(/^\+55\d{10,11}$/);
    const digitsFromDisplay = CONTACT.phoneDisplay.replace(/\D/g, '');
    expect(CONTACT.phoneE164).toContain(digitsFromDisplay);
    expect(CONTACT.whatsappUrl).toContain(CONTACT.phoneE164.replace('+', ''));
  });

  it('has the CRP in the expected CFP format', () => {
    expect(PROFESSIONAL.crp).toMatch(/^CRP 06\/\d{6}$/);
    expect(PROFESSIONAL.entitySentence).toContain('CRP 06/176959');
  });

  it('has a complete address for local SEO', () => {
    expect(ADDRESS.city).toBe('Santos');
    expect(ADDRESS.state).toBe('SP');
    expect(ADDRESS.street.length).toBeGreaterThan(5);
    expect(ADDRESS.full).toContain('Santos');
  });

  it('uses an https site URL without trailing slash', () => {
    expect(SITE_URL).toMatch(/^https:\/\/[^/]+$/);
  });
});

describe('JSON-LD builders', () => {
  it('produces serializable Person and Psychologist schemas with shared @id', () => {
    const person = personSchema();
    const business = psychologistBusinessSchema();
    expect(JSON.parse(JSON.stringify(person))['@type']).toBe('Person');
    expect(JSON.parse(JSON.stringify(business))['@type']).toBe('Psychologist');
    expect((business.founder as { '@id': string })['@id']).toBe(person['@id']);
  });

  it('builds FAQPage with one Question per item', () => {
    const schema = faqSchema([
      { question: 'Pergunta 1?', answer: 'Resposta 1.' },
      { question: 'Pergunta 2?', answer: 'Resposta 2.' },
    ]);
    const mainEntity = schema.mainEntity as unknown[];
    expect(mainEntity).toHaveLength(2);
  });

  it('builds absolute URLs in breadcrumbs and services', () => {
    const breadcrumbs = breadcrumbSchema([
      { name: 'Início', path: '/' },
      { name: 'Sobre', path: '/sobre' },
    ]);
    const items = breadcrumbs.itemListElement as { item: string }[];
    expect(items[1]?.item).toBe(`${SITE_URL}/sobre`);

    const service = serviceSchema({ name: 'Teste', description: 'Descrição', path: '/teste' });
    expect(service.url).toBe(`${SITE_URL}/teste`);
  });

  it('falls back dateModified to datePublished on posts', () => {
    const pubDate = new Date('2026-07-01T00:00:00Z');
    const schema = blogPostingSchema({
      title: 'Título',
      description: 'Descrição',
      path: '/blog/post',
      pubDate,
    });
    expect(schema.dateModified).toBe(pubDate.toISOString());
  });
});
