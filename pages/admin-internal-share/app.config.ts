// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-internal-share":{
      id:"admin-internal-share",
      name: 'adminMenu.shareInternal',
      label: "adminMenu.shareInternal",
      icon: "lucide:file-symlink",
      hoverIcon: "lucide:file-symlink",
      component: "LazyInternalShareList",
      props:{
        pageNum:0,
        pageSize:20,
        filters:{}
      },
    }
  },

})