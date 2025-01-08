export const routeWorkflowFormDetail  = function(params: any){
  console.log(params)
    return {
      id: "super-workflow-form-versions-" + new Date().getTime(),
      name: "super-workflow-form-versions-" + params.id,
      icon: 'material-symbols-light:table-edit-rounded',
      label: 'adminMenu.workflowForm',
      component: 'LazyWorkflowFormDetail',
      props: {
        processKey: params.processKey,
        taskId: params.id
      }
    } as TabItem
  }