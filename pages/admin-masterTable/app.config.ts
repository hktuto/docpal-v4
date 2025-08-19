import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-master-table":{
      id:"admin-master-table",
      name: 'admin-master-table',
      label: "adminMenu.masterTable",
      icon: "dp-icon:table",
      hoverIcon: "dp-icon:table",
      component: "LazyAdminMasterTablePage",
      feature: "MASTER_TABLE",
      props:{},
    }
  }
  

})
