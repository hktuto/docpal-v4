export default defineNuxtPlugin((nuxtApp:any) => {
    nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale:any, newLocale:any, isInitialSetup:any, nuxtApp:any) => {
      localStorage.setItem('v_form_locale', newLocale)
      const ev = new CustomEvent('localeChange', { detail: {
          locale: newLocale
      }})
      window.dispatchEvent(ev)
      console.log('localeChange', newLocale)
    }
  })
