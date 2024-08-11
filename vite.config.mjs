import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa' // اضافه کردن پلاگین PWA

export default defineConfig({
  plugins: [
    VueRouter(),
    Layouts(),
    Pages(),
    Vue({
      template: { transformAssetUrls }
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components(),
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My Vuetify App',
        short_name: 'VuetifyApp',
        description: 'My Vuetify App Description',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '@/assets/Images/4.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '@/assets/Images/4.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '@/assets/Images/4.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
