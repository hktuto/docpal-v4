// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr:false,
  modules: ['@nuxt/test-utils/module'],
  extends:[
    '../../packages/authApp',
    "../../pages/client-browse",
    "../../pages/client-search",
    "../../pages/client-master-table",
    "../../pages/client-folder-cabinet",
    "../../pages/client-workflow"
  ],
  features:{
    inlineStyles: true,
  },
  runtimeConfig:{
    public:{
      plarform:'client'
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
