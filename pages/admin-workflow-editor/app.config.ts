// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:'workflow-editor-list',
      label: "Workflow Editor List",
      icon: "dp-icon:flow-outline",
      hoverIcon: "dp-icon:flow-fill",
      component: "LazyWorkflowEditorList",
      props:{},
      children:[
        {
          id:'workflow-editor-list-inline',
          label: "Inline Workflow Editor List",
          icon: "dp-icon:flow-outline",
          hoverIcon: "dp-icon:flow-fill",
          component: "LazyWorkflowEditorList",
          props:{},
          inlineRender: true,
        }
      ]
    },
  ] ,

})