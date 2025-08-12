// Nuxt config for the sql-store demo package
// Enables COOP/COEP for cross-origin isolation and configures Vite to serve WASM
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends:['../../base','../'],
})
