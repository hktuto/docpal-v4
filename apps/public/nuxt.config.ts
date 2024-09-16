// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  ssr:false,
  modules: ['@nuxt/test-utils/module'],
  extends:[
    '../../packages/publicApp',
    "../../packages/tab"
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
  nitro:{
    devProxy:{
      '/api':{
        target: process.env.CLIENT_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  }
})