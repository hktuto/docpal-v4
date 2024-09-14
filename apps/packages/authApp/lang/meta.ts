import { clientApi } from "api"

export default defineI18nLocale(async(locale) => {
    const { loggedIn } = useAuth()
    if(!loggedIn.value){
        return {
        }
    }
    // for example, fetch locale messages from nuxt server
    const {data} = await clientApi.api.queryLanguage({language:{
        locale:locale,
        languageKey:'meta'
    }})
    if(data && data.length > 0 && data[0].languageContent) {
        return JSON.parse(data[0]?.languageContent)
    }
    return {}
  })