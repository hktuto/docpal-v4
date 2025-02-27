import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-acl":{
      id:"admin-acl",
      name: 'admin-acl',
      label: "adminMenu.ACL",
      icon: "lucide:file-cog",
      hoverIcon: "lucide:file-cog",
      component: "LazyAclPage",
      feature: "CORE",
      props:{},
    }
  },

})