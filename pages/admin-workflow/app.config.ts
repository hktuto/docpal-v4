import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-workflow-manage":{
      id:"admin-workflow-manage",
      name: 'admin-workflow-manage',
      label: "adminMenu.runningWorkflow",
      icon: "teenyicons:azure-solid",
      hoverIcon: "teenyicons:azure-solid",
      component: "LazyWorkflowManagePage",
      props:{},
    },
    "admin-workflow-retry":{
      id:"admin-workflow-retry",
      name: 'admin-workflow-retry',
      label: "adminMenu.WorkflowRetry",
      icon: "teenyicons:azure-solid",
      hoverIcon: "teenyicons:azure-solid",
      component: "LazyWorkflowRetryPage",
      props:{},
    }
  }

})