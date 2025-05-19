

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  modules: ['nuxt-electron'],
  electron: {
    disableDefaultOptions: true,
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
      // {
      //   entry: 'electron/preload.ts',
      //   onstart(args:any) {
      //     // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
      //     // instead of restarting the entire Electron App.
      //     args.reload()
      //   },
      // }
    ],
  },
  extends:[
    '../client',
  ],
  runtimeConfig:{
    public:{
      platform:'desktop'
    }
  },
  
})
