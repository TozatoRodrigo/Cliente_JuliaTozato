/**
 * Fonte única de verdade para dados de contato, endereço e identidade (NAP).
 * Consistência desses dados em todas as páginas é um fator de SEO local —
 * nunca escrever telefone/endereço direto em componentes ou páginas.
 */

// Domínio definitivo (registrado no Registro.br em 23/07/2026).
// Mantido em sincronia com `site` em astro.config.mjs.
export const SITE_URL = 'https://psicologajuliatozato.com.br';

export const SITE_NAME = 'Julia Dias Tozato — Psicóloga e Neuropsicóloga';

/**
 * Analytics Umami (self-hosted na VPS). O mesmo painel acompanha os demais
 * domínios do Rodrigo. Deixar `websiteId` vazio desativa o script (ex.: em dev).
 */
export const ANALYTICS = {
  scriptUrl: 'https://analytics.servidortozato.cloud/script.js',
  websiteId: '99da4e7c-98db-492a-b75c-4f51c93a49a3',
} as const;

export const PROFESSIONAL = {
  name: 'Julia Dias Tozato',
  shortName: 'Julia Tozato',
  crp: 'CRP 06/176959',
  crpRegion: '06ª Região - SP',
  role: 'Psicóloga e Neuropsicóloga',
  /** Papéis para jobTitle no schema Person (E-E-A-T/GEO). */
  roles: ['Psicóloga', 'Neuropsicóloga', 'Supervisora clínica'],
  education: 'Graduada em Psicologia pela Universidade Católica de Santos (UniSantos), 2017–2021',
  /** Formação em neuropsicologia — instituição de referência (autoridade). */
  neuroTraining: 'Formação em Neuropsicologia pelo Hospital Israelita Albert Einstein',
  /** Abordagens de especialização. */
  approaches: 'Especialista em Terapia Cognitivo-Comportamental (TCC) e Análise do Comportamento',
  /** Áreas de expertise — alimenta `knowsAbout` no schema (GEO). */
  knowsAbout: [
    'Neuropsicologia',
    'Avaliação neuropsicológica',
    'Terapia Cognitivo-Comportamental',
    'Análise do Comportamento',
    'TDAH',
    'Transtorno do Espectro Autista (TEA)',
    'Supervisão clínica',
    'Psicoterapia',
  ],
  registrationDate: '2022-02-15',
  /** Frase de entidade padronizada — usada em rodapé, autor box, llms.txt e schema (GEO). */
  entitySentence:
    'Julia Dias Tozato é psicóloga e neuropsicóloga (CRP 06/176959), com formação em Neuropsicologia pelo Hospital Israelita Albert Einstein e especialização em Terapia Cognitivo-Comportamental e Análise do Comportamento. Também supervisora clínica, atende presencial em Santos-SP, no CNP – Centro de Neuropsicologia e Psicologia, e online para todo o Brasil.',
} as const;

export const CONTACT = {
  phoneE164: '+5513996607711',
  phoneDisplay: '(13) 99660-7711',
  whatsappUrl:
    'https://wa.me/5513996607711?text=' +
    encodeURIComponent('Olá, Julia! Encontrei seu site e gostaria de agendar uma conversa.'),
  instagramUrl: 'https://www.instagram.com/cnpneuroepsicologia/',
} as const;

export const ADDRESS = {
  clinicName: 'CNP – Centro de Neuropsicologia e Psicologia',
  street: 'Av. Conselheiro Nébias, 628',
  unit: 'Conjuntos 34 e 35',
  neighborhood: 'Boqueirão',
  city: 'Santos',
  state: 'SP',
  postalCode: '11045-002',
  country: 'BR',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('CNP Centro de Neuropsicologia e Psicologia, Av. Conselheiro Nébias, 628, Boqueirão, Santos - SP'),
  full: 'Av. Conselheiro Nébias, 628 – Cj. 34/35, Boqueirão, Santos/SP',
} as const;

// Sem janela fixa de propósito: a agenda é flexível e o atendimento online
// inclui horários noturnos. No Google Business Profile, marcar "por agendamento".
export const OPENING_HOURS =
  'Atendimento com hora marcada, em horários flexíveis combinados individualmente — inclusive à noite, no atendimento online';

/**
 * Cidades da Baixada Santista atendidas presencialmente (deslocamento razoável até o
 * consultório no Boqueirão) — alimenta `areaServed` nos schemas Psychologist/Service (SEO local).
 */
export const SERVICE_AREA_CITIES = ['Santos', 'São Vicente', 'Praia Grande', 'Guarujá', 'Cubatão'] as const;

export const BLOG_CATEGORIES = {
  neuropsicologia: 'Neuropsicologia',
  tdah: 'TDAH',
  tea: 'Autismo (TEA)',
  ansiedade: 'Ansiedade',
  infancia: 'Infância e Aprendizagem',
  'terapia-online': 'Terapia Online',
  psicoterapia: 'Psicoterapia',
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

/**
 * Catálogo dos serviços realmente prestados — fonte única para o `makesOffer` do schema
 * `Psychologist` (GEO: ajuda IA/Google a entender todo o catálogo a partir da entidade principal,
 * não só de cada página isolada) e para o CTA de serviço relacionado exibido ao fim de cada post
 * do blog (transforma leitura informacional em intenção comercial).
 */
export interface ServiceInfo {
  name: string;
  path: string;
  shortDescription: string;
}

export const SERVICES: readonly ServiceInfo[] = [
  {
    name: 'Avaliação Neuropsicológica',
    path: '/avaliacao-neuropsicologica',
    shortDescription: 'Exame completo de atenção, memória, linguagem e funções executivas, com laudo.',
  },
  {
    name: 'Avaliação de TDAH',
    path: '/avaliacao-tdah',
    shortDescription: 'Investigação de TDAH em crianças e adultos com testes padronizados.',
  },
  {
    name: 'Avaliação de Autismo (TEA)',
    path: '/avaliacao-tea',
    shortDescription: 'Investigação de TEA, incluindo nível 1 de suporte, em todas as idades.',
  },
  {
    name: 'Avaliação de Dificuldades de Aprendizagem',
    path: '/dificuldades-de-aprendizagem',
    shortDescription: 'Avaliação de dislexia, discalculia e outros transtornos de aprendizagem.',
  },
  {
    name: 'Neuropsicologia Infantil',
    path: '/neuropsicologia-infantil',
    shortDescription: 'Avaliação e estimulação cognitiva lúdica, com jogos, para crianças.',
  },
  {
    name: 'Avaliação Neuropsicológica em Idosos',
    path: '/avaliacao-neuropsicologica-idosos',
    shortDescription: 'Investigação de memória e atenção na terceira idade, diagnóstico precoce de declínio cognitivo.',
  },
  {
    name: 'Terapia para Adultos',
    path: '/terapia-para-adultos',
    shortDescription: 'Psicoterapia individual, presencial em Santos ou online.',
  },
  {
    name: 'Terapia para Adolescentes',
    path: '/terapia-para-adolescentes',
    shortDescription: 'Acompanhamento psicológico de adolescentes.',
  },
  {
    name: 'Terapia Online',
    path: '/terapia-online',
    shortDescription: 'Psicoterapia por videochamada para todo o Brasil, regulamentada pelo CFP.',
  },
] as const;

/**
 * Serviço mais relevante para cada categoria do blog — usado no CTA de "próximo passo" ao fim de
 * cada post, para converter tráfego informacional em visita à página de serviço (comercial).
 */
export const CATEGORY_SERVICE: Record<BlogCategory, ServiceInfo> = {
  neuropsicologia: SERVICES[0],
  tdah: SERVICES[1],
  tea: SERVICES[2],
  ansiedade: SERVICES[6],
  infancia: SERVICES[4],
  'terapia-online': SERVICES[8],
  psicoterapia: SERVICES[6],
};
