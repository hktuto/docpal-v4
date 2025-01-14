import {clientApi} from 'api'

export default defineAppConfig({
    menu:{
        "client-search":{
            id: 'client-search',
            icon: 'lucide:search',
            hoverIcon: 'lucide:search',
            label: "file_search",
            component: "LazySearchPage",
            props:{
                pageSize:20,
                pageNum: 0,
            }
        }
    }
})