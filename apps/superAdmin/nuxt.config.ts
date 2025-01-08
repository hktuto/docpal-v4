// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr:false,
  modules: ['@nuxt/test-utils/module'],
  extends:[
    '../../packages/authApp',
    "../../pages/super-workflow-form",
  ],
  features:{
    inlineStyles: true,
  },
  nitro:{
    devProxy:{
      '/public-api/report/v1/api':{
        target: process.env.DASHBOARD_PROXY,
        changeOrigin: true,
        prependPath: true
      },
      '/api':{
        target: process.env.ADMIN_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  }
  
})
