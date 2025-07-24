import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    "admin-external-storage":{
      id:"admin-external-storage",
      name: 'aadmin-external-storage',
      label: "adminMenu.externalStorage",
      icon: "carbon:volume-block-storage",
      hoverIcon: "carbon:volume-block-storage",
      component: "LazyExternalStoragePage",
      props:{},
    }
  } ,

})
