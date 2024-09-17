// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
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
        dir:'./assets/dp-icons'
      }
    ],
    clientBundle:{
      scan: true,
      includeCustomCollections: true, 
    },
    
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
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },
  nitro:{
    devProxy:{
      '/api':{
        target: process.env.CLIENT_PROXY,
        changeOrigin: true,
        prependPath: true
      },
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
})