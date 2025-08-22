
// create nuxt app config


export default defineAppConfig({
  menu:{
    "admin-message-template":{
      id:"admin-message-template",
      name: 'admin-message-template',
      label: "adminMenu.messageTemplate",
      icon: "dp-icon:chat",
      hoverIcon: "dp-icon:chat",
      component: "MessageTemplateList",
      props:{
        id:""
      },
    },
  }
})
