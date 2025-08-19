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
      feature: "SHARE_EXTERNAL",
      props:{},
    },
    "client-share-me": {
      id:"client-share-me",
      name: 'client-share-me',
      label: "file_share_me",
      icon: "meteor-icons:share",
      hoverIcon: "meteor-icons:share",
      component: "LazyInternalShareMePage",
      feature: "SHARE_INTERNAL",
      props:{},
    },
    "client-share-other": {
      id:"client-share-other",
      name: 'client-share-other',
      label: "file_shar e_other",
      icon: "lucide:file-symlink",
      hoverIcon: "lucide:file-symlink",
      component: "LazyInternalShareOtherPage",
      feature: "SHARE_INTERNAL",
      props:{},
    }
  }

})