// create nuxt app config

export default defineAppConfig({
  menu:{
    "admin-docker-log":{
      id:"admin-docker-log",
      name: 'admin-docker-log',
      label: "adminMenu.log",
      icon: "mdi:docker",
      hoverIcon: "mdi:docker",
      component: "LazyDockerLog",
      props:{},
    }
  },

})