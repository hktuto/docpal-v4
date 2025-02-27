// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-azure":{
      id:"admin-azure",
      name: 'admin-azure',
      label: "adminMenu.azure",
      icon: "teenyicons:azure-solid",
      hoverIcon: "teenyicons:azure-solid",
      component: "LazyAzurePage",
      feature: "AZURE_OCR",
      props:{},
    }
  }

})