
// create a nuxt plugin
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
const actionList = useGlobalActionList()

actionList.value.push({
    label: 'search-plugin',
    icon: "lucide:search",
    items: [
        {
            label: 'action.search.file',
            icon: 'lucide:search',
            action: ({tabProvider,keyword}) => {
                console.log("keyword", keyword)
                console.log("tabProvider", tabProvider)
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
                tabProvider.openInCurrentTab(newItem)
            }
        }
    ]
})
})