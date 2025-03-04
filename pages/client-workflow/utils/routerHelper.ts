export const routeWorkflowDetail  = function(params: any){
  return {
    id: "workflow-detail-versions-" + new Date().getTime(),
    name: "workflow-detail-versions-" + params.id,
    icon: 'dp-icon:flow-outline',
    label: params.name,
    component: 'LazyWorkflowDetail',
    props: {
      id: params.id,
      workflowType: params.workflowType || 'myTask',
    }
  } as TabItem
}
export const routeWorkflowPage  = function(params: any){
  return {
    id: "client-workflow",
    name: "client-workflow",
    icon: 'dp-icon:flow-outline',
    label: 'menus_workflow',
    component: 'LazyWorkflowPage',
    props: {
      workflowType: params.workflowType,
    }
  } as TabItem
}
