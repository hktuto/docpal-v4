// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module'
  ],
  extends:[
    "../../packages/dp-watermark",
    "../../packages/base",
    "../../packages/dp-notification"
  ]
})
