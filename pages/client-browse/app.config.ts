import {clientApi} from 'api'

export default defineAppConfig({
    menu:[
        {
            id: 'browse',
            icon: 'dp-icon:browse-outline',
            hoverIcon: 'dp-icon:browse-fill',
            label: "Browse",
            component: "LazyBrowsePage",
        },
    ]
})