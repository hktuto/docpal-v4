// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"admin-internal-share",
      name: 'adminMenu.shareInternal',
      label: "adminMenu.shareInternal",
      icon: "ic:outline-lock-clock",
      hoverIcon: "ic:outline-lock-clock",
      component: "LazyInternalShareList",
      props:{
        pageNum:0,
        pageSize:20,
        orderBy:'createdTime',
        isDesc:true,
        filters:{}
      },
    },
  ] ,

})