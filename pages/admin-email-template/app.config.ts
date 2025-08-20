// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-email-template":{
      id:"admin-email-template",
      name: 'admin-email-template',
      label: "adminMenu.emailTemplate",
      icon: "dp-icon:envelope",
      hoverIcon: "dp-icon:envelope",
      component: "LazyEmailTemplatePage",
      feature: "EMAIL_TEMPLATE",
      props:{},
    }
  }

})
