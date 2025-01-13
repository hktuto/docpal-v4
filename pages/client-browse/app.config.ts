import {clientApi} from 'api'

export default defineAppConfig({
    menu:{
        "client-browse":{
            id: 'browse',
            icon: 'dp-icon:browse-outline',
            hoverIcon: 'dp-icon:browse-fill',
            label: "file_browse",
            component: "LazyBrowsePage",
            props:{
                idOrPath:"/",
                filter:{}
            }
        }
    }
})