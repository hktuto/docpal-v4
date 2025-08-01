import { defineAppConfig } from '#imports'
export default defineAppConfig({
    menu: {
        'client-dashboard': {
            id:'client-dashboard',
            name : 'client-dashboard',
            label: "adminMenu.dashboard",
            icon: 'carbon:dashboard',
            hoverIcon : 'carbon:dashboard',
            component: "LazyDashboardPage",
            feature: "DASHBOARD",
            props:{}
        },
        'client-work-panel': {
            id:'client-work-panel',
            name : 'client-work-panel',
            label: "vxe.pager.homePageTitle",
            icon: 'material-symbols:dashboard-customize-outline-rounded',
            hoverIcon : 'material-symbols:dashboard-customize-outline-rounded',
            component: "LazyHomePage",
            feature: "DASHBOARD",
            handleError:true,
            props:{}
        }
    }

})


