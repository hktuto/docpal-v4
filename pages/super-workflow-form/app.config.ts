import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "super-workflow-form":{
      id:"super-workflow-form",
      name: 'super-workflow-form',
      label: "adminMenu.workflowForm",
      icon: "material-symbols:dynamic-form-outline-rounded",
      hoverIcon: "material-symbols:dynamic-form-outline-rounded",
      component: "LazyWorkflowFormPage",
      props:{},
    }
  },

})