// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  devtools: {
    enabled: true
  },
  modules: ['@nuxt/test-utils/module'],
  extends:[
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
