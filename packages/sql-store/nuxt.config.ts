// Nuxt config for the sql-store demo package
// Enables COOP/COEP for cross-origin isolation and configures Vite to serve WASM
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [],

  // nitro: {
  //   routeRules: {
  //     '/public/**':{
  //       headers: {
  //         'Cross-Origin-Opener-Policy': 'same-origin',
  //         'Cross-Origin-Embedder-Policy': 'require-corp'
  //       }
  //     },
  //     '/**': {
  //       headers: {
  //         'Cross-Origin-Opener-Policy': 'same-origin',
  //         'Cross-Origin-Embedder-Policy': 'require-corp'
  //       }
  //     },
  //     '/workers/**': {
  //       headers: {
  //         'Cross-Origin-Opener-Policy': 'same-origin',
  //         'Cross-Origin-Embedder-Policy': 'require-corp'
  //       }
  //     }
  //   }
  // },
  // serverMiddleware: [
  //   '~/server/middleware/setHeaders.ts'
  // ],
  // render: {
  //   static: {
  //     setHeaders(res) {
  //       res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  //       res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  //     }
  //   }
  // },
  // vite: {
  //   assetsInclude: ['**/*.wasm'],
  //   server: {
  //   headers: {
  //       'Cross-Origin-Opener-Policy': 'same-origin',
  //       'Cross-Origin-Embedder-Policy': 'require-corp',
  //     },
  //   },
  //   optimizeDeps: {
  //     exclude: ['@sqlite.org/sqlite-wasm'],
  //   },
  // },
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      title: 'SQL Store - Document Management System',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  typescript: {
    strict: true
  }
})
