// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  ssr:false,
  extends:[
    "../",
    "../../../packages/authApp",
    "../../browse"
  ],
  nitro:{
    devProxy:{
      '/api':{
        target: process.env.ADMIN_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  },
  
})