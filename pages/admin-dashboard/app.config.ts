import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"dashboardManage",
      name: 'dashboardManage',
      label: "adminMenu.dashboard",
      icon: "material-symbols:dashboard-customize-outline-rounded",
      hoverIcon: "material-symbols:dashboard-customize-outline-rounded",
      component: "LazyDashboardManagePage",
      props:{},
    },
    // {
    //   id:"admin-retention-policies",
    //   name: 'admin-retention-policies',
    //   label: "adminMenu.retention",
    //   icon: "streamline:interface-lock-shield-combination-combo-lock-locked-padlock-secure-security-shield-keyhole",
    //   hoverIcon: "streamline:interface-lock-shield-combination-combo-lock-locked-padlock-secure-security-shield-keyhole",
    //   component: "LazyRetentionPage",
    //   props:{},
    // }
  ] ,

})