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
      mode: "development",
  base: "./",
  srcDir: "src",
  filename: "sw.ts",
  includeAssets: ["/favicon.png"],
  strategies: "injectManifest",
  manifest: {
    name: "GCP Testing App",
    short_name: "GCP",
    theme_color: "#0094f0",
    start_url: "./#/home/welcome",
    scope: "./",
    display: "standalone",
    background_color: "#0094f0",
    icons: [
      {
        src: "./",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "public/4.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "./img/icons/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "./img/icons/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
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
