// https://nuxt.com/docs/api/configuration/nuxt-

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module',
  ],
  extends:[
    "../base"
  ],
  runtimeConfig:{
    public: {
      needAuth: true,
      endpoint: {
        admin : process.env.ADMIN_END_POINT,
        docpal : process.env.DOCPAL_END_POINT,
        office  : process.env.OFFICE_END_POINT,
        upload : process.env.UPLOAD_END_POINT,
        dashboard : process.env.DASHBOARD_PROXY,
      }
    }
  }
})
