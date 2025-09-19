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
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
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
