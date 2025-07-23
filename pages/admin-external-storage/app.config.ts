import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    "admin-external-storage":{
      id:"admin-external-storage",
      name: 'aadmin-external-storage',
      label: "adminMenu.externalStorage",
      icon: "material-symbols-light:table-edit-rounded",
      hoverIcon: "material-symbols-light:table-edit-rounded",
      component: "LazyExternalStoragePage",
      props:{},
    }
  } ,

})
