import { clientApi } from "api"
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'
import zhHK from 'vxe-table/lib/locale/lang/zh-HK'
export const useLoadState = () => useState<string>(() => 'init');
export const initPublicLayout = async() => {
    const loadState = useLoadState()
    loadState.value = await getLocale()
    setTimeout(() => {
        loadState.value = 'ready'
    }, 2000)
}
export async function getLocale(){
  const { locale, availableLocales, setLocaleMessage } = useI18n()
  await Promise.all( availableLocales.map( async(code) => {
          const vxeLang = code === 'zh-CN' ? zhCN : code === 'en-US' ? enUS : zhHK
          const { data:clientData } = await clientApi.api.getRelationQuerylanguage({
                  locale:code, 
                  languageKey: 'client'
              }) as any
          const clientJson = JSON.parse(clientData[0].languageContent)

          const { data:adminData } = await clientApi.api.getRelationQuerylanguage({
                  locale:code, 
                  languageKey: 'admin'
              }) as any
          const adminJson = JSON.parse(adminData[0].languageContent)

          const { data:metaData } = await clientApi.api.getRelationQuerylanguage({
                  locale:code, 
                  languageKey: 'meta'
              }) as any
          const metaJson = JSON.parse(metaData[0].languageContent)
          setLocaleMessage(code, {
              ...clientJson,
              ...adminJson,
              ...metaJson,
              ...vxeLang
          })
          
      })
  )
  return 'language ready'
}
