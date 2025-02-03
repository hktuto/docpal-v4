import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'
import zhHK from 'vxe-table/lib/locale/lang/zh-HK'

export default defineI18nLocale((locale:string) => {
    const basic = {
        loading: "Loading...",
        'en-US':"ENG",
        'zh-CN':'簡',
        'zh-HK':"繁"
    }
    switch(locale){
        case 'zh-CN':
            return {
                ...zhCN,
                ...basic
            }
        case 'en-US':
            return {
                ...enUS,
                ...basic
            }
        case 'zh-HK':
            return {
                ...zhHK,
                ...basic
            }
    }
})