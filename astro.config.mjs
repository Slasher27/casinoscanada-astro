// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://casinoscanada.online',
	integrations: [
		// This looks for tailwind.config.mjs automatically
		tailwind(),
		svelte(),
		mdx(),
		sitemap(),
	],
});
