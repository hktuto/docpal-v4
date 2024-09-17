// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr:false,
  modules: ['@nuxt/test-utils/module'],
  extends:[
    '../../packages/authApp',
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
  
})
