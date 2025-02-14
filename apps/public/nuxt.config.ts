// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  ssr:false,
  modules: ['@nuxt/test-utils/module'],
  extends:[
    "../../packages/icon",
    '../../packages/publicApp',
  ],
  typescript: {
    typeCheck: true,
  },
  build:{
    analyze:true
  },
  features:{
    inlineStyles: true,
  },
  runtimeConfig:{
    public:{
      plarform:'public'
    }
  },
  nitro:{
    devProxy:{
      '/public-api/report/v1/api':{
        target: process.env.DASHBOARD_PROXY,
        changeOrigin: true,
        prependPath: true
      },
      '/api':{
        target: process.env.CLIENT_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  }
})