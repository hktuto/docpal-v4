import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-external-connection":{
      id:"admin-external-connection",
      name: 'admin-external-connection',
      label: "adminMenu.externalConnection",
      icon: "fluent:communication-person-20-regular",
      hoverIcon: "fluent:communication-person-20-regular",
      component: "LazyExternalConnectionPage",
      props:{},
    }
  }

})