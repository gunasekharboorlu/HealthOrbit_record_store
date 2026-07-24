import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: [
          'favicon.svg',
          'favicon.ico',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-256x256.png',
          'pwa-384x384.png',
          'pwa-512x512.png',
          'maskable-icon-512x512.png',
          'offline.html',
        ],
        manifest: {
          name: 'HealthOrbit',
          short_name: 'HealthOrbit',
          description: 'Secure Healthcare Record Management Platform',
          theme_color: '#081221',
          background_color: '#081221',
          display: 'standalone',
          orientation: 'portrait',
          lang: 'en',
          start_url: '/',
          scope: '/',
          categories: ['health', 'medical', 'productivity'],
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-256x256.png',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: 'pwa-384x384.png',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
          shortcuts: [
            {
              name: 'Patient Portal',
              short_name: 'Patient',
              description: 'Access patient health vault and records',
              url: '/patient',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Doctor Portal',
              short_name: 'Doctor',
              description: 'Access practitioner workspace and clearances',
              url: '/doctor',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Admin Portal',
              short_name: 'Admin',
              description: 'Access system governance and license verification',
              url: '/admin',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Emergency Access',
              short_name: 'Emergency',
              description: 'First responder urgent medical profile lookup',
              url: '/emergency',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
            {
              urlPattern: /\.(?:js|css)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-resources',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
              },
            },
            {
              urlPattern: /^\/api\/.*$/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 5,
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
          navigateFallback: '/offline.html',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
