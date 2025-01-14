export const routeDocDetail  = function(params: any){
  return {
    id: "admin-document-type-versions-" + new Date().getTime(),
    name: "admin-document-type-versions-" + params.id,
    icon: 'material-symbols:dynamic-form-outline-rounded',
    label: params.name,
    component: 'LazyDocTypeDetail',
    props: {
      name: params.name,
    }
  } as TabItem
}
