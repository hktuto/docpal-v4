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
    '@nuxt/icon',
    '@vueuse/nuxt',
    'nuxt-viewport'
  ],
  css:[
    '../assets/styles/main.scss'
  ],
  extends:[
  ],
  icon:{
    customCollections:[
      {
        prefix:'dp-icon',
        dir: join(currentDir, './assets/dp-icons')
      }
    ],
    clientBundle:{
      scan: true,
      includeCustomCollections: true, 
    },
    
  },
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
        files: ['ui.ts','meta.ts','custom.ts']
      },
      {
        code:'zh-CN',
        files: ['ui.ts','meta.ts','custom.ts']
      },
      {
        code : 'zh-HK',
        files: ['ui.ts','meta.ts','custom.ts']
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
  
  vite: {
    vue: {
      features: {
        propsDestructure: true,
      },
      script:{
        defineModel:true
      }
    }    
  },
} as any


export default defineNuxtConfig(config)