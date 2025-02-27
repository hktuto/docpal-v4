import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'
import zhHK from 'vxe-table/lib/locale/lang/zh-HK'
import enJson from 'deployment/src/en-US.json'
import zhJson from 'deployment/src/zh-CN.json'
import zhHKJson from 'deployment/src/zh-HK.json'
import { clientApi } from 'api'

export async function getLocale(){
    const { locale, availableLocales, setLocaleMessage } = useI18n()
    const config = useRuntimeConfig()

    const vxeLang = locale.value === 'zh-CN' ? zhCN : locale.value === 'en-US' ? enUS : zhHK
    let clientJson;
    if(config.public.isProduction){
        const { data:clientData } = await clientApi.api.getRelationQuerylanguage({
                locale:locale.value, 
                languageKey: 'client'
            }) as any
        clientJson = JSON.parse(clientData[0].languageContent)
    }else{
        clientJson = locale.value === 'en-US' ? enJson : locale.value === 'zh-CN' ? zhJson : zhHKJson
        // const jsonFile = await fetch(`/defaultLang/${code}.json`).then(res => res.json())
        // clientJson = jsonFile
    }
    const { data:adminData } = await clientApi.api.getRelationQuerylanguage({
            locale:locale.value, 
            languageKey: 'admin'
        }) as any
    const adminJson = JSON.parse(adminData[0].languageContent)

    const { data:metaData } = await clientApi.api.getRelationQuerylanguage({
            locale:locale.value, 
            languageKey: 'meta'
        }) as any
    const metaJson = JSON.parse(metaData[0].languageContent)
    setLocaleMessage(locale.value, {
        ...clientJson,
        ...adminJson,
        ...metaJson,
        ...vxeLang
    })
}