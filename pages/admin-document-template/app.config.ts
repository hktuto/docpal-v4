import { adminApi } from '../../libraries/api/src/index';
// create nuxt app config

export default defineAppConfig({
  menu:{
    "admin-document-template": {
      id:"admin-document-template",
      name: 'document-template',
      label: "adminMenu.template",
      icon: "dp-icon:template",
      hoverIcon: "dp-icon:template",
      component: "LazyDocumentTemplatePage",
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
