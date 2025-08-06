import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-master-table":{
      id:"admin-master-table",
      name: 'admin-master-table',
      label: "adminMenu.masterTable",
      icon: "uil:database-alt",
      hoverIcon: "uil:database-alt",
      component: "LazyAdminMasterTablePage",
      feature: "MASTER_TABLE",
      props:{},
    }
  }
  

})
