import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"dashboardManage",
      name: 'dashboardManage',
      label: "adminMenu.dashboard",
      icon: "ic:outline-lock-clock",
      hoverIcon: "ic:outline-lock-clock",
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