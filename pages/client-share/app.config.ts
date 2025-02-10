// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "client-share": {
      id:"client-share",
      name: 'client-share',
      label: "file_share",
      icon: "uil:database-alt",
      hoverIcon: "uil:database-alt",
      component: "LazySharePage",
      props:{},
    },
    "client-share-me": {
      id:"client-share-me",
      name: 'client-share-me',
      label: "file_share_me",
      icon: "uil:database-alt",
      hoverIcon: "uil:database-alt",
      component: "LazyInternalShareMePage",
      props:{},
    },
    "client-share-other": {
      id:"client-share-other",
      name: 'client-share-other',
      label: "file_share_other",
      icon: "uil:database-alt",
      hoverIcon: "uil:database-alt",
      component: "LazyInternalShareOtherPage",
      props:{},
    }
  }

})