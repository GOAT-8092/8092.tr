// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
        quality: 80,
      },
    },
  },
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['@fontsource/atkinson-hyperlegible', '@fontsource/inter'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['@fontsource/atkinson-hyperlegible', '@fontsource/inter'],
    },
  },
});
