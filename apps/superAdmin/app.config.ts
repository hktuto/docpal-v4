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
            id:'tableSetting',
            name:"page-setup",
            icon: 'lucide:columns-2',
            label: "Table Setup",
            component: 'LazyTableSetup'
        },
    ]
})