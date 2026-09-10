import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// PUBLIC_BASE steuert das Ziel: "/bess-consulting/" für GitHub Pages,
// Standard "/" für den späteren Betrieb auf der eigenen Domain.
const base = process.env.PUBLIC_BASE ?? '/';
const site = process.env.PUBLIC_SITE ?? 'https://bess-consulting.de';

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
});
