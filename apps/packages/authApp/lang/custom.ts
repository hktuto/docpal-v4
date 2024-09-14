export default defineI18nLocale(async(locale) => {
    const { loggedIn } = useAuth()
    if(!loggedIn.value){
        return {
            
        }
    }
    // for example, fetch locale messages from nuxt server
    const lang = await $fetch<{data:string}>(`/api/docpal/relation/queryLanguage?locale=${locale}&languageKey=admin`).then(res => res.data)
    if(lang && lang.length > 0) {
        return JSON.parse(lang[0].languageContent)
    }
    return {}
  })