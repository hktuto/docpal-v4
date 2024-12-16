import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"admin-acl",
      name: 'admin-acl',
      label: "Access Control List",
      icon: "lucide:file-cog",
      hoverIcon: "lucide:file-cog",
      component: "LazyAclPage",
      props:{},
    }
  ] ,

})