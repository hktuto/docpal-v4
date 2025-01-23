
// create a nuxt plugin
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    // @ts-ignore
    const { t } = nuxtApp.$i18n;
    const actionList = useGlobalActionList()

    const newAction: GlobalSearchList ={
        label: 'search-plugin',
        icon: "lucide:search",
        items:[
            {
                label:"",
                keyword:[],
                labelFn: (keyword:string) => {
                    return `${t('search-action.search')}: <b>${keyword}</b>`
                },
                icon: 'lucide:search',
                visibleFn: async(keyword:string) => {
                    return keyword.length > 0
                },
                action: ({tabProvider,keyword}) => {
                    const newItem = {
                        id: 'client-search',
                        icon: 'lucide:search',
                        hoverIcon: 'lucide:search',
                        label: "file_search",
                        component: "LazySearchPage",
                        props:{
                            searchParams:{
                                "condition": "and",
                                "docId": "",
                                "query": [
                                    {
                                        "condition": "and",
                                        "matchs": [
                                            {
                                                "queryType": "keyword",
                                                "value": keyword,
                                                "option": {
                                                    "fullMatch": false,
                                                    "synonyms": false,
                                                    "includeLanguages": []
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                    tabProvider.openTab(newItem, true)
                }
            }
        ]
    }
    actionList.value.push(newAction)

})