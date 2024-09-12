// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module',
  ],
  nitro: {
    routeRules:{
      '/api/**': {proxy: {to: process.env.PROXY +"/**"}},
      '/notification/api/**': {proxy: {to: process.env.NOTIFICATION_PROXY+"/**"}},
      '/dashboard/**': {proxy: {to:process.env.DASHBOARD_PROXY+"/**"}},
      '/client/**': {proxy: {to:process.env.CLIENT_PROXY+"/**"}},
    },
    
  }
})
export default config
