export default defineI18nLocale(async(locale) => {
    const { loggedIn } = useAuth()
    if(!loggedIn.value){
        console.log(`get ${locale} language before login`)
        return {
            loading: "Loading...",
            'en-US':"ENG",
            'zh-CN':'簡',
            'zh-HK':"繁"
        }
    }
    // for example, fetch locale messages from nuxt server
    const lang = await $fetch<{data:string}>(`/api/docpal/relation/queryLanguage?locale=${locale}&languageKey=client`).then(res => res.data)
    if(lang && lang.length > 0) {
        return JSON.parse(lang[0].languageContent)
    }
    return {}
  })