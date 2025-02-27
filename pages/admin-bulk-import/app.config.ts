import { adminApi } from '../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-bulk-import":{
      id:"admin-bulk-import",
      name: 'bulkImportConfig',
      label: "adminMenu.bulkImportConfig",
      icon: "flowbite:file-import-outline",
      hoverIcon: "flowbite:file-import-solid",
      component: "LazyBulkImportPage",
      feature: "BULK_IMPORT",
      props:{
        pageNum:0,
        pageSize:20,
        orderBy:'documentType',
        isDesc:false,
        filters:{}
      },
    }
  },

})