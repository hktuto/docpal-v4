

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
                // ...zhCN,
                ...basic
            }
        case 'en-US':
            return {
                // ...enUS,
                ...basic
            }
        case 'zh-HK':
            return {
                // ...zhHK,
                ...basic
            }
    }
})
