// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-06',
  ssr: true,
  devtools: {
    enabled: true
  },
  modules: ['@nuxt/test-utils/module'],
  extends:[
    "../../packages/base",
    "../../packages/doc-template",
  ],
  features:{
    inlineStyles: true,
  },
  runtimeConfig:{
    public:{
      platform:'public'
    }
  },
})
