import { clientApi } from "api"

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
    const {data:{data}} = await clientApi.api.queryLanguage({language:{
        locale:locale,
        languageKey:'client'
    }})
    if(data && data.length > 0 && data[0].languageContent) {
        return JSON.parse(data[0]?.languageContent)
    }
    return {}
  })