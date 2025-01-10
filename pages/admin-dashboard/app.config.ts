import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-dashboard":{
      id:"admin-dashboard",
      name: 'dashboardManage',
      label: "adminMenu.dashboard",
      icon: "material-symbols:dashboard-customize-outline-rounded",
      hoverIcon: "material-symbols:dashboard-customize-outline-rounded",
      component: "LazyDashboardManagePage",
      props:{},
    }
  }
  

})