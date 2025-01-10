import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-setting":{
      id:"admin-setting",
      name: 'admin-setting',
      label: "Setting",
      icon: "lucide:settings",
      hoverIcon: "lucide:settings",
      component: "LazySettingPage",
      props:{},
    }
  }

})