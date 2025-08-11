export const routeEasyFormDetail  = function(params: any){
  return {
    id: "easy-form-detail-versions-" + new Date().getTime(),
    name: "easy-form-detail-versions-" + params.id,
    icon: 'material-symbols-light:table-edit-rounded',
    label: params.name,
    component: 'LazyAdminEasyFormDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
export const routeEasyFormDesigner  = function(params: any){
  return {
    id: "easy-form-designer-versions-" + new Date().getTime(),
    name: "easy-form-designer-versions-" + params.id,
    icon: 'material-symbols-light:table-edit-rounded',
    label: params.name,
    component: 'LazyAdminEasyFormDesigner',
    props: {
      id: params.id,
    }
  } as TabItem
}
