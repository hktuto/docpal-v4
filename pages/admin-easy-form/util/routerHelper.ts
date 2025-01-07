export const routeEasyFormDetail  = function(params: any){
  return {
    id: "master-table-detail-versions-" + new Date().getTime(),
    name: "master-table-detail-versions-" + params.id,
    icon: 'material-symbols-light:table-edit-rounded',
    label: params.name,
    component: 'LazyEasyFormDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
