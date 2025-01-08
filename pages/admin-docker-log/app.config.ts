// create nuxt app config

export default defineAppConfig({
  menu:[
    {
      id:"'admin-docker-log",
      name: 'admin-docker-log',
      label: "adminMenu.log",
      icon: "mdi:docker",
      hoverIcon: "mdi:docker",
      component: "LazyDockerLog",
      props:{},
    }
  ] ,

})