// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-internal-share":{
      id:"admin-internal-share",
      name: 'share-internal',
      label: "adminMenu.shareInternal",
      icon: "lucide:file-symlink",
      hoverIcon: "lucide:file-symlink",
      component: "LazyInternalShareList",
      feature: "SHARE_INTERNAL",
      props:{
        pageNum:0,
        pageSize:20,
        filters:{}
      },
    },
    "admin-external-share":{
      id:"admin-external-share",
      name: 'admin-external-share',
      label: "adminMenu.share",
      icon: "dp-icon:export",
      hoverIcon: "dp-icon:export",
      component: "LazyExternalSharePage",
      feature: "SHARE_EXTERNAL",
      props:{},
    },
  },

})
