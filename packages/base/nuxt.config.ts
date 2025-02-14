// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))



const config = {
  compatibilityDate: '2024-04-03',
  devtools: { 
    enabled: true,
  },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'nuxt-viewport'
  ],
  css:[
    '../assets/styles/main.scss'
  ],
  extends:[
  ],
  
  runtimeConfig:{
    public:{
      pdfReaderUrl: process.env.pdfReaderUrl,
      NODE_ENV: process.env.NODE_ENV
    }
  },
  i18n: {
    defaultLocale:'en-US',
    langDir:'lang',
    locales: [
      {
        code:'en-US',
        files: ['default.ts']
      },
      {
        code:'zh-CN',
        files: ['default.ts']
      },
      {
        code : 'zh-HK',
        files: ['default.ts']
      }
    ],
    strategy:'no_prefix',
    lazy: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },
  nitro:{
    routeRules:{
      '/api/**': {proxy: {to: process.env.PROXY +"/**"}},
      '/notification/api/**': {proxy: {to: process.env.NOTIFICATION_PROXY+"/**"}},
      '/dashboard/**': {proxy: {to:process.env.DASHBOARD_PROXY+"/**"}},
      '/client/**': {proxy: {to:process.env.CLIENT_PROXY+"/**"}},
    },

      devProxy:{
        '/api':{
          target: process.env.PROXY,
          changeOrigin: true,
          prependPath: true
        },
        '/docpalApi':{
          target: process.env.PROXY,
          changeOrigin: true,
          prependPath: true
        },
        '/dashboard':{
          target: process.env.DASHBOARD_PROXY,
          changeOrigin: true,
          prependPath: true
        },
        '/client':{
          target: process.env.CLIENT_PROXY,
          changeOrigin: true,
          prependPath: true
        }
      }
      // routeRules: {
      //     '/dashboard/**': {
      //         proxy: 'https://app4.wclsolution.com/public-api/report/v1/api/**'
      //     }
      // }
  },
  experimental: { appManifest: false },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        },
      },
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace'],
    },
    vue: {
      features: {
        propsDestructure: true,
      },
      script:{
        defineModel:true
      },
    }    
  },
} as any



export default defineNuxtConfig(config)