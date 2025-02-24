// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "client-share": {
      id:"client-share",
      name: 'client-share',
      label: "file_share",
      icon: "lucide:file-output",
      hoverIcon: "lucide:file-output",
      component: "LazySharePage",
      props:{},
    },
    "client-share-me": {
      id:"client-share-me",
      name: 'client-share-me',
      label: "file_share_me",
      icon: "meteor-icons:share",
      hoverIcon: "meteor-icons:share",
      component: "LazyInternalShareMePage",
      props:{},
    },
    "client-share-other": {
      id:"client-share-other",
      name: 'client-share-other',
      label: "file_share_other",
      icon: "lucide:file-symlink",
      hoverIcon: "lucide:file-symlink",
      component: "LazyInternalShareOtherPage",
      props:{},
    }
  }

})