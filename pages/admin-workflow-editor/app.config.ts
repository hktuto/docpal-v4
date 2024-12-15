import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:'workflow-editor',
      name: 'workflow-editor-list',
      label: "Workflow Editor",
      icon: "dp-icon:flow-outline",
      hoverIcon: "dp-icon:flow-fill",
      component: "LazyWorkflowEditorList",
      props:{},
    },
  ] ,

})