// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
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
  }
})
