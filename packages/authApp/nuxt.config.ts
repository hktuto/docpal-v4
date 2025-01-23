// https://nuxt.com/docs/api/configuration/nuxt-
const config = {
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
      endPoint: {
        admin : process.env.ADMIN_END_POINT,
        docpal : process.env.DOCPAL_END_POINT,
        office  : process.env.OFFICE_END_POINT,
        dashboard : process.env.DASHBOARD_PROXY,
        upload: process.env.UPLOAD_PROXY,
      }
    }
  }
} as any
if(process.env.NODE_ENV === 'development'){
  // TODO : remove this park in production
}
config.extends.push('../dp-language')

export default defineNuxtConfig(config)
