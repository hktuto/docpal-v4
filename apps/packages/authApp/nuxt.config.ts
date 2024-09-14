// https://nuxt.com/docs/api/configuration/nuxt-

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
  ],
  runtimeConfig:{
    public: {
      keycloakPublicUrl: process.env.KEYCLOAK_REDIRECT_URL,
      keycloakRealm: process.env.KEYCLOAK_REALM,
      keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
      keycloakSSLRequired: process.env.KEYCLOAK_SSL_REQUIRED,
      keycloakPublicClient: process.env.KEYCLOAK_PUBLIC_CLIENT,
      keyCloakConfidentialPort: process.env.KEYCLOAK_CONFIDENTIAL_PORT,
      keyCloakIsSSO: process.env.KEYCLOAK_IS_SSO
    }
  },
  i18n: {
    defaultLocale:'en-US',
    langDir:'lang',
    locales: [
      {
        code:'en-US',
        files: ['ui.ts','meta.ts','custom.ts']
      },
      {
        code:'zh-CN',
        files: ['ui.ts','meta.ts','custom.ts']
      },
      {
        code : 'zh-HK',
        files: ['ui.ts','meta.ts','custom.ts']
      }
    ],
    strategy:'no_prefix',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },
  nitro:{
    routeRules:{
      '/api/**': {proxy: {to: process.env.PROXY +"/**"}},
      '/notification/api/**': {proxy: {to: process.env.NOTIFICATION_PROXY+"/**"}},
      '/dashboard/**': {proxy: {to:process.env.DASHBOARD_PROXY+"/**"}},
      '/client/**': {proxy: {to:process.env.CLIENT_PROXY+"/**"}},
    },

      devProxy:{
        '/api':{
          target: process.env.PROXY,
          changeOrigin: true,
          prependPath: true
        },
        '/docpalApi':{
          target: process.env.PROXY,
          changeOrigin: true,
          prependPath: true
        },
        '/dashboard':{
          target: process.env.DASHBOARD_PROXY,
          changeOrigin: true,
          prependPath: true
        },
        '/client':{
          target: process.env.CLIENT_PROXY,
          changeOrigin: true,
          prependPath: true
        }
      }
  },
  features:{
    inlineStyles: true,
  }
})
