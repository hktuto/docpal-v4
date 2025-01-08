import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"super-workflow-form",
      name: 'super-workflow-form',
      label: "adminMenu.workflowForm",
      icon: "teenyicons:azure-solid",
      hoverIcon: "teenyicons:azure-solid",
      component: "LazyWorkflowFormPage",
      props:{},
    }
  ] ,

})