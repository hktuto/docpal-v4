import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-document-type":{
      id:"admin-document-type",
      name: 'admin-document-type',
      label: "adminMenu.documentType",
      icon: "typcn:document",
      hoverIcon: "typcn:document",
      component: "LazyDocTypePage",
      props:{},
    }
  }

})