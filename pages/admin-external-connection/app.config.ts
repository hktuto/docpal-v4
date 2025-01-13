import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-external-connection":{
      id:"admin-external-connection",
      name: 'admin-external-connection',
      label: "admin.externalConnection",
      icon: "teenyicons:azure-solid",
      hoverIcon: "teenyicons:azure-solid",
      component: "LazyExternalConnectionPage",
      props:{},
    }
  }

})