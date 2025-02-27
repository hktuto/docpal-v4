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
      feature: "DASHBOARD",
      props:{},
    },
    "admin-work-panel":{
      id:"admin-work-panel",
      name: 'admin-work-panel',
      label: "adminMenu.workPanel",
      icon: "carbon:dashboard",
      hoverIcon: "carbon:dashboard",
      component: "LazyPersonalDashboardManagePage",
      feature: "DASHBOARD",
      props:{},
    }
  }
  

})