import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

const getCache = ({ pattern, name }) => ({
  urlPattern: pattern,
  handler: 'NetworkFirst',
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

const matchDocumentsPath = ({ url, request, event }) => url.includes('/api/documents');

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        runtimeCaching: [
          getCache({
            pattern: '/^https://fonts.googleapis.com/',
            name: 'google-fonts-stylesheets',
          }),
          getCache({
            name: 'documents',
            pattern: '/api/documents',
          }),
        ],
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Common Order',
        short_name: 'Common Order',
        description: 'Common Order is an online repository of doctrinal and liturgical resources from the historical Presbyterian tradition.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
