import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"admin-azure",
      name: 'admin-azure',
      label: "adminMenu.azure",
      icon: "teenyicons:azure-solid",
      hoverIcon: "logos:azure-icon",
      component: "LazyAzurePage",
      props:{},
    }
  ] ,

})