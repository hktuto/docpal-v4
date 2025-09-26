// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
        '@nuxt/icon',
  ],
  icon:{
    customCollections:[
      {
        prefix:'dp-icon',
        dir: join(currentDir, './assets/dp-icons')
      }
    ],
    clientBundle:{
      scan: true,
      includeCustomCollections: true, 
    },
    
  },
  extends:[
  ]
})
