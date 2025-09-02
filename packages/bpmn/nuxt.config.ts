import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))
// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/icon',
  ],
  extends:[
    "../calendar",
    "../workflow",
    "../dp-datatype"
  ],
  icon:{
    customCollections:[
      {
        prefix:'bpmn',
        dir: join(currentDir, './assets/bpmn')
      }
    ],
    clientBundle:{
      includeCustomCollections: true, 
    }
  }
})
