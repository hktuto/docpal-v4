import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
   "RBAC-editor2":{
      id:"RBAC-editor2",
      name: 'rgac2',
      label: "ROLE-Editor2",
      icon: "lucide:file-cog",
      hoverIcon: "lucide:file-cog",
      component: "LazyRbacPage2",
      feature: "CORE",
    },
  }
})
