import { defineAppConfig } from '#imports'


export default defineAppConfig({
    menu:[
        {
            id:'menuSetup',
            name:"menu-setup",
            icon: 'lucide:list-tree',
            label: "Menu",
            component: 'LazyMenuSetup'
        },
        {
            id:'pageSetup',
            name:"page-setup",
            icon: 'lucide:columns-2',
            label: "Page Setup",
            component: 'LazyPageSetup'
        },
    ]
})