export const routeEasyFormDetail  = function(params: any){
  return {
    id: "easy-form-detail-versions-" + new Date().getTime(),
    name: "easy-form-detail-versions-" + params.id,
    icon: 'material-symbols-light:table-edit-rounded',
    label: params.name,
    component: 'LazyEasyFormDetail',
    props: {
      id: params.id,
    }
  }
}
export const routeEasyFormDesigner  = function(params: any){
  return {
    id: "easy-form-detail-preview-" + new Date().getTime(),
    name: "easy-form-detail-preview-" + params.id,
    icon: 'material-symbols-light:table-edit-rounded',
    label: params.name,
    component: 'LazyEasyFormDesigner',
    props: {
      id: params.id,
    }
  } 
}