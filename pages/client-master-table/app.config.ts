// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "client-master-table":{
      id:"client-master-table",
      name: 'client-master-table',
      label: "menu_master-table",
      icon: "dp-icon:table",
      hoverIcon: "dp-icon:table",
      component: "LazyMasterTablePage",
      feature: "MASTER_TABLE",
      props:{},
    }
  }

})
