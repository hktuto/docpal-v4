
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
   "RBAC-page":{
      id:"RBAC-page",
      name: 'rgac-page',
      label: "ROLE-Page",
      icon: "dp-icon:role",
      hoverIcon: "dp-icon:role",
      component: "LazyAdminRbacPage",
      feature: "CORE",
    },
  }
})
