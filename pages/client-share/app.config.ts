// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "client-share": {
      id:"client-share",
      name: 'client-share',
      label: "file_share",
      icon: "dp-icon:export",
      hoverIcon: "dp-icon:export",
      component: "LazySharePage",
      feature: "SHARE_EXTERNAL",
      props:{},
    },
    "client-share-me": {
      id:"client-share-me",
      name: 'client-share-me',
      label: "file_share_me",
      icon: "lucide:file-symlink",
      hoverIcon: "lucide:file-symlink",
      component: "LazyInternalShareMePage",
      feature: "SHARE_INTERNAL",
      props:{},
    },
    "client-share-other": {
      id:"client-share-other",
      name: 'client-share-other',
      label: "file_share_other",
      icon: "lsicon:file-export-filled",
      hoverIcon: "lsicon:file-export-filled",
      component: "LazyInternalShareOtherPage",
      feature: "SHARE_INTERNAL",
      props:{},
    }
  }

})
