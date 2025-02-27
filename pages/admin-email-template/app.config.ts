// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-email-template":{
      id:"admin-email-template",
      name: 'admin-email-template',
      label: "adminMenu.emailTemplate",
      icon: "fluent:mail-template-16-regular",
      hoverIcon: "fluent:mail-template-16-regular",
      component: "LazyEmailTemplatePage",
      feature: "EMAIL_TEMPLATE",
      props:{},
    }
  }

})