import { adminApi } from '../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"DAM_FILE_CONVERTION",
      name: 'DAM_FILE_CONVERTION',
      label: "adminMenu.DAM",
      icon: "lucide:file-scan",
      hoverIcon: "lucide:file-scan",
      component: "LazyDamPage",
      props:{},
    }
  ] ,

})