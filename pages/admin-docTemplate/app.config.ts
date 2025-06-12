import { adminApi } from '../../libraries/api/src/index';
// create nuxt app config

export default defineAppConfig({
  menu:{
    "admin-doc-template-collaboration": {
      id:"admin-doc-template-collaboration",
      name: 'admin-doc-template-collaboration',
      label: "adminMenu.template",
      icon: "lucide:file-sliders",
      hoverIcon: "lucide:file-sliders",
      component: "docTemplatePage",
      feature: "GENERATE_TEMPLATE",
      props:{
        pageNum: 0,
        pageSize: 20,
        orderBy: 'createdDate',
        isDesc: true
      },
    }
  } ,

})
