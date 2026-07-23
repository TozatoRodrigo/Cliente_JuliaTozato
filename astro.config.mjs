// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domínio definitivo (Registro.br, 23/07/2026). Manter em sincronia com
// SITE_URL em src/lib/constants.ts.
export default defineConfig({
  site: 'https://psicologajuliatozato.com.br',
  trailingSlash: 'never',
  // 'file' gera /pagina.html em vez de /pagina/index.html; combinado com o
  // try_files do nginx (deploy/nginx.conf), serve URLs limpas sem barra final
  // e sem redirect 301 — casando exatamente com as tags canonical.
  build: { format: 'file' },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
