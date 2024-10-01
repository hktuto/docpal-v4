// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";

console.log(process.env.CLIENT_PROXY)
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
        target: process.env.CLIENT_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  }
  
})