import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-document-type":{
      id:"admin-document-type",
      name: 'admin-document-type',
      label: "adminMenu.documentType",
      icon: "typcn:document",
      hoverIcon: "typcn:document",
      component: "LazyDocTypePage",
      feature: "CORE",
      props:{},
    },
    "admin-metadata-list":{
      id:"admin-metadata-list",
      name: 'admin-metadata-list',
      label: "adminMenu.metadataList",
      icon: "typcn:database",
      hoverIcon: "typcn:database",
      component: "LazyMetadataList",
      feature: "CORE",
      props:{},
    },
    "admin-smart-folder":{
      id:"admin-smart-folder",
      name: 'admin-smart-folder',
      label: "adminMenu.smartFolder",
      icon: "material-symbols:map-search-outline-rounded",
      hoverIcon: "material-symbols:map-search-outline-rounded",
      component: "LazyAdminSmartFolderPage",
      feature: "SMART_FOLDER",
      props:{},
    }
  }

})
