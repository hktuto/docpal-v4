import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"admin-easy-form",
      name: 'admin-easy-form',
      label: "adminMenu.easyForm",
      icon: "material-symbols-light:table-edit-rounded",
      hoverIcon: "material-symbols-light:table-edit-rounded",
      component: "LazyEasyFormPage",
      props:{},
    }
  ] ,

})