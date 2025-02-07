export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, nuxtApp) => {
      console.log('onBeforeLanguageSwitch', oldLocale, newLocale, isInitialSetup)
      
    }
  })