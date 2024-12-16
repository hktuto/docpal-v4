// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr:false,
  modules: ['@nuxt/test-utils/module'],
  extends:[
    '../../packages/authApp',
    "../../pages/admin-workflow-editor",
    "../../pages/admin-user",
    "../../pages/admin-acl",
    "../../pages/admin-setting",
    "../../pages/admin-audit",
  ],
  features:{
    inlineStyles: true,
  },
  nitro:{
    devProxy:{
      '/api':{
        target: process.env.ADMIN_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  }
  
})
