import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-audit":{
      id:"admin-audit",
      name: 'admin-audit',
      label: "adminMenu.audit",
      icon: "tabler:align-box-right-bottom",
      hoverIcon: "tabler:align-box-right-bottom-filled",
      component: "LazyAuditPage",
      props:{},
    }
  } ,

})