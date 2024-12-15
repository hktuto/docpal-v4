import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"admin-user",
      name: 'admin-user-list',
      label: "Admin User",
      icon: "lucide:user",
      hoverIcon: "lucide:user",
      component: "LazyAdminUserList",
      props:{},
    }
  ] ,

})