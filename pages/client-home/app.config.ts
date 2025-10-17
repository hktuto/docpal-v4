import { defineAppConfig } from '#imports'
export default defineAppConfig({
    menu: {
        'client-work-panel': {
            id:'client-work-panel',
            name : 'client-work-panel',
            label: "adminMenu.workPanel",
            icon: 'material-symbols:home',
            hoverIcon : 'material-symbols:home',
            component: "LazyHomePage",
            feature: "DASHBOARD",
            handleError:true,
            props:{}
        }
    }

})


