import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    "admin-company-profile":{
      id:"admin-company-profile",
      name: 'admin-company-profile',
      label: "adminMenu.companyProfile",
      icon: "material-symbols-light:table-edit-rounded",
      hoverIcon: "material-symbols-light:table-edit-rounded",
      component: "LazyCompanyProfilePage",
      feature: "WORKFLOW",
      props:{},
    }
  } ,

})
