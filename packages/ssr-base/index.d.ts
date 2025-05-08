// import type { MenuItem } from '#imports'

declare module 'nuxt/schema' {
    interface AppConfig {
      /** Theme configuration */
      menu?: any[]
    }
  }
  
  // It is always important to ensure you import/export something when augmenting a type
  export {}