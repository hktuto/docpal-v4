
// create nuxt app config


export default defineAppConfig({
  menu:{
    "admin-message-template":{
      id:"admin-message-template",
      name: 'admin-message-template',
      label: "adminMenu.messageTemplate",
      icon: "lucide:message-circle-code",
      hoverIcon: "lucide:message-circle-code",
      component: "MessageTemplateList",
      props:{
        id:""
      },
    },
  }
})