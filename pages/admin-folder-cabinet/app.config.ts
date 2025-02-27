// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-folder-cabinet":{
      id:"admin-folder-cabinet",
      name: 'admin-folder-cabinet',
      label: "adminMenu.folderCabinet",
      icon: "icon-park-outline:document-folder",
      hoverIcon: "icon-park-outline:document-folder",
      component: "LazyFolderCabinetPage",
      feature: "FOLDER_CABINET",
      props:{},
    }
  }

})