export const routeWorkflowDetail  = function(params: any){
  return {
    id: "workflow-detail-versions-" + new Date().getTime(),
    name: "workflow-detail-versions-" + params.id,
    icon: 'dp-icon:flow-outline',
    label: params.name,
    component: 'LazyWorkflowDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
