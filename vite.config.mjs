import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import { VitePWA } from 'vite-plugin-pwa'

import path from 'path'


const VitePWAConfig = {
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
};


// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    VitePWA(VitePWAConfig),
    
  ],
  define: { 'process.env': {} },
  // resolve: {
  //   alias: {
  //     '@':            path.resolve(__dirname, './node_modules/'),
  //     'Components':   path.resolve(__dirname, './src/components'),
  //     'Views':        path.resolve(__dirname, './src/views'),
  //     'Helpers':      path.resolve(__dirname, './src/helpers'),
  //     'Router':       path.resolve(__dirname, './src/router'),
  //   },
  // },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
})