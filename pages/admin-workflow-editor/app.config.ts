import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    "admin-workflow-editor":{
      id:'admin-workflow-editor',
      name: 'workflow-editor-list',
      label: "adminMenu.workflowEditor",
      icon: "dp-icon:flow-outline",
      hoverIcon: "dp-icon:flow-fill",
      component: "LazyWorkflowEditorList",
      feature: "WORKFLOW",
      props:{},
    }
      
  }
  

})