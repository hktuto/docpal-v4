import { defineAppConfig } from '#imports'
export default defineAppConfig({
    menu: {
        'client-trash': {
            id:'client-trash',
            name : 'client-trash',
            label: "file_trash",
            icon: 'lucide:trash-2',
            hoverIcon : 'lucide:trash-2',
            component: "LazyTrashPage",
            props:{}
        }
    }

})


