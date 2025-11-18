// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://8092.tr',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: page => !page.includes('/portal'),
      serialize(item) {
        // Differentiate priority based on page type
        if (item.url.endsWith('/') || item.url.endsWith('/en')) {
          // Homepage - highest priority
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/en/')) {
          // English pages - high priority
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else {
          // Other pages - standard priority
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        item.lastmod = new Date();
        return item;
      },
      entryLimit: 10000,
    }),
  ],
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
    plugins: process.env.ANALYZE
      ? [
          (await import('rollup-plugin-visualizer')).visualizer({
            filename: 'dist/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : [],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['@fontsource/atkinson-hyperlegible', '@fontsource/inter'],
            react: ['react', 'react-dom'],
            animation: ['gsap'],
            utils: ['clsx', 'tailwind-merge'],
          },
        },
      },
      reportCompressedSize: true,
      chunkSizeWarningLimit: 500,
    },
    optimizeDeps: {
      include: ['@fontsource/atkinson-hyperlegible', '@fontsource/inter'],
    },
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  },
});
