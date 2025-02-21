export const routeHoldPage = function(params: any){
  return {
    id: "hold-page-versions-" + new Date().getTime(),
    name: "hold-page-",
    icon: 'ic:outline-lock-clock',
    label: 'client_holdPolicies',
    component: 'LazyHoldPage',
    props: {
    }
  } as TabItem
}
export const routeHoldPageFolder = function(params: any){
  return {
    id: "hold-page-folder-versions-" + new Date().getTime(),
    name: "hold-page-folder-" + params.documentId,
    icon: 'ic:outline-lock-clock',
    label: params.documentName,
    component: 'LazyHoldPageFolder',
    props: {
      idOrPath: params.documentId,
      homeId: params.documentId
    }
  } as TabItem
}

// iconoir:privacy-policy