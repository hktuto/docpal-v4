import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config


export default defineAppConfig({
  menu:{
    "admin-watermark":{
      id:"admin-watermark",
      name: 'admin-watermark',
      label: "adminMenu.watermark",
      icon: "lucide:user",
      hoverIcon: "lucide:user",
      component: "LazyWatermark",
      feature: "WATERMARK",
      props:{
        id:""
      },
    },
  }
})