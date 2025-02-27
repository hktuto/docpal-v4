// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "client-folder-cabinet":{
      id:"client-folder-cabinet",
      name: 'client-folder-cabinet',
      label: "menus_folderCabinet",
      icon: "icon-park-outline:document-folder",
      hoverIcon: "icon-park-outline:document-folder",
      component: "LazyFolderCabinetPage",
      feature: "FOLDER_CABINET",
      props:{},
    }
  }

})