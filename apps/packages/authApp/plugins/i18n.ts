export default defineNuxtPlugin((nuxtApp:any) => {
    nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, nuxtApp) => {
      nuxtApp.$i18n.loadLocaleMessages(newLocale)
    }
  })