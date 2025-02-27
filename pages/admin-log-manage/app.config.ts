// create nuxt app config


export default defineAppConfig({
  menu:{
    "admin-log-manage":{
      id:"admin-log-manage",
      name: 'log-manage',
      label: "adminMenu.logManage",
      icon: "lucide:file-symlink",
      hoverIcon: "lucide:file-symlink",
      component: "LazyLogManage",
      feature: "LOG_MANAGE",
      props:{
      },
    }
  },

})