import { en } from "element-plus/es/locales.mjs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr:false,
  modules: ['@nuxt/test-utils/module', 'nuxt-electron'],
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts',
        onstart(args:any) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
          // instead of restarting the entire Electron App.
          args.reload()
        },
      }
    ],
  },
  telemetry:false,
  extends:[
    '../client',
  ],
  features:{
    inlineStyles: true,
  },
  runtimeConfig:{
    public:{
      plarform:'client'
    }
  },
  nitro:{
    devProxy:{
      '/public-api/report/v1/api':{
        target: process.env.DASHBOARD_PROXY,
        changeOrigin: true,
        prependPath: true
      },
      '/api':{
        target: process.env.CLIENT_PROXY,
        changeOrigin: true,
        prependPath: true
      },
    }
  },
  
})
