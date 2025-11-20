import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-case-management-import-export":{
      id:"admin-case-management-import-export",
      name: 'admin-case-management-import-export',
      label: "adminMenu.caseManagementImportExport",
      icon: "mdi:database-export-outline",
      hoverIcon: "mdi:database-export",
      component: "LazyConfigMigrationImportExport",
    }
   } ,
   

})
