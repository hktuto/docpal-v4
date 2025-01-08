import { adminApi } from '../../libraries/api/src/index';
// create nuxt app config

export default defineAppConfig({
  menu:[
    {
      id:"GENERATE_TEMPLATE",
      name: 'GENERATE_TEMPLATE',
      label: "adminMenu.template",
      icon: "lucide:file-sliders",
      hoverIcon: "lucide:file-sliders",
      component: "LazyDocumentTemplatePage",
      props:{
        pageNum: 0,
        pageSize: 20,
        orderBy: 'createdDate',
        isDesc: true
      },
    }
  ] ,

})