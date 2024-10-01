// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  ssr:false,
  extends:[
    "../",
    "../../../packages/authApp",
  ],
  nitro:{
    devProxy:{
      '/api':{
        target: process.env.CLIENT_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  }
})