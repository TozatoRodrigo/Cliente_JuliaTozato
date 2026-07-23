import { ADDRESS, CONTACT, PROFESSIONAL, SITE_NAME, SITE_URL } from './constants';

/** Builders tipados de JSON-LD. Cada página monta seu array de schemas com eles. */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

type JsonLd = Record<string, unknown>;

const absoluteUrl = (path: string): string => new URL(path, SITE_URL).href;

export function personSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#julia`,
    name: PROFESSIONAL.name,
    jobTitle: [...PROFESSIONAL.roles],
    description: PROFESSIONAL.entitySentence,
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    knowsAbout: [...PROFESSIONAL.knowsAbout],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Universidade Católica de Santos (UniSantos)',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Hospital Israelita Albert Einstein',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Registro profissional',
        name: PROFESSIONAL.crp,
        recognizedBy: {
          '@type': 'Organization',
          name: 'Conselho Regional de Psicologia da 6ª Região (CRP-SP)',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Especialização',
        name: 'Especialização em Neuropsicologia',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'Hospital Israelita Albert Einstein',
        },
      },
    ],
    workLocation: {
      '@type': 'Place',
      name: ADDRESS.clinicName,
      address: postalAddress(),
    },
    sameAs: [CONTACT.instagramUrl],
  };
}

export function psychologistBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Psychologist',
    '@id': `${SITE_URL}/#consultorio`,
    name: SITE_NAME,
    description: PROFESSIONAL.entitySentence,
    url: SITE_URL,
    telephone: CONTACT.phoneE164,
    address: postalAddress(),
    areaServed: [
      { '@type': 'City', name: 'Santos' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    founder: { '@id': `${SITE_URL}/#julia` },
    priceRange: '$$',
    sameAs: [CONTACT.instagramUrl],
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE_URL}/#julia` },
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    provider: { '@id': `${SITE_URL}/#julia` },
    areaServed: [
      { '@type': 'City', name: 'Santos' },
      { '@type': 'Country', name: 'Brasil' },
    ],
  };
}

export function faqSchema(items: readonly FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  pubDate: Date;
  updatedDate?: Date;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.pubDate.toISOString(),
    dateModified: (input.updatedDate ?? input.pubDate).toISOString(),
    inLanguage: 'pt-BR',
    author: { '@id': `${SITE_URL}/#julia` },
    publisher: { '@id': `${SITE_URL}/#julia` },
  };
}

function postalAddress(): JsonLd {
  return {
    '@type': 'PostalAddress',
    streetAddress: `${ADDRESS.street}, ${ADDRESS.unit}`,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    ...(ADDRESS.postalCode ? { postalCode: ADDRESS.postalCode } : {}),
    addressCountry: ADDRESS.country,
  };
}
