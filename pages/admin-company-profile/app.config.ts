import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    "admin-company-profile":{
      id:"admin-company-profile",
      name: 'admin-company-profile',
      label: "adminMenu.companyProfile",
      icon: "octicon:organization-24",
      hoverIcon: "octicon:organization-24",
      component: "LazyCompanyProfilePage",
      props:{},
    }
  } ,

})
