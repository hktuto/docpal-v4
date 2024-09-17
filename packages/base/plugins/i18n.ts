export default defineNuxtPlugin((nuxtApp:any) => {
    nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale:string, newLocale:string, isInitialSetup:boolean, nuxtApp:any) => {
      nuxtApp.$i18n.loadLocaleMessages(newLocale)
    }
  })