// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module'
  ],
<<<<<<<< HEAD:packages/browse/nuxt.config.ts
  css:[
    '../assets/styles/main.scss'
========
  extends:[
    "../base"
>>>>>>>> setup:packages/publicApp/nuxt.config.ts
  ]
})
