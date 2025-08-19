import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-case-management":{
      id:"admin-case-management",
      name: 'admin-case-management-list',
      label: "adminMenu.caseManagement",
      icon: "dp-icon:case",
      hoverIcon: "dp-icon:case",
      component: "LazyCaseManagementList",
      feature: "WORKFLOW",
      props:{
          pageNum: 0,
          pageSize: 20,
          orderBy: 'modifiedDate',
          isDesc: true
      },
    }
   } ,

})
