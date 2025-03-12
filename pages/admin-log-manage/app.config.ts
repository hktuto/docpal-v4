// create nuxt app config


export default defineAppConfig({
  menu:{
    "admin-log-manage":{
      id:"admin-log-manage",
      name: 'log-manage',
      label: "adminMenu.logManage",
      icon: "lucide:logs",
      hoverIcon: "lucide:logs",
      component: "LazyLogManage",
      feature: "LOG_MANAGE",
      props:{
      },
    }
  },

})