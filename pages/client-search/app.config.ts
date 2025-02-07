import {clientApi} from 'api'

export default defineAppConfig({
    menu:{
        "client-search":{
            id: 'client-search',
            name: 'client-search',
            icon: 'lucide:search',
            hoverIcon: 'lucide:search',
            label: "file_search",
            component: "LazySearchPage",
            props:{
                pageSize:20,
                pageNum: 0,

            }
        },
        "client-smartFolder": {
            id: 'client-smartFolder',
            name: 'client-smartFolder',
            icon: 'icon-park-outline:document-folder',
            hoverIcon: 'icon-park-outline:document-folder',
            label: "file_smartFolder",
            component: "LazySmartFolderPage",
            props:{
            }
        }
    }
})