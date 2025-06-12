
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends:[
    "../base",
    "../calendar",
    "../bpmn",
    "../workflow"
  ],
  modules: [
    '@nuxt/test-utils/module'
  ]
})
