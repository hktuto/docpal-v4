import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
   "RBAC-page":{
      id:"RBAC-page",
      name: 'rgac-page',
      label: "ROLE-Page",
      icon: "lucide:file-cog",
      hoverIcon: "lucide:file-cog",
      component: "LazyAdminRbacPage",
      feature: "CORE",
    },
  }
})
