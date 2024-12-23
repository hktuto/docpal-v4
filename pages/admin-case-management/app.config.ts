import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"admin-setting",
      name: 'admin-setting',
      label: "Caese management",
      icon: "dp-icon:case-outline",
      hoverIcon: "dp-icon:case-fill",
      component: "LazyCaseManagementList",
      props:{
          pageNum: 0,
          pageSize: 20,
          sort: {},
          filters: {},
      },
    }
  ] ,

})