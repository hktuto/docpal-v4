// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  ssr:false,
  modules: [],
  extends:[
    "../../packages/icon",
    '../../packages/publicApp',
    '../../pages/public-share',
    '../../pages/public-upload',
    '../../pages/public-easy-form',
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
