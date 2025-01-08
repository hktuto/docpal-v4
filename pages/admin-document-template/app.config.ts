import { adminApi } from '../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"GENERATE_TEMPLATE",
      name: 'GENERATE_TEMPLATE',
      label: "adminMenu.template",
      icon: "lucide:file-sliders",
      hoverIcon: "lucide:file-sliders",
      component: "LazyDamPage",
      props:{},
    }
  ] ,

})