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
export const routeRetentionPage = function(params: any){
  return {
    id: "retention-page-versions-" + new Date().getTime(),
    name: "retention-page-",
    icon: 'ic:outline-lock-clock',
    label: 'client_retention',
    component: 'LazyRetentionPage',
    props: {
      tab: params.tab
    }
  } as TabItem
}
export const routeRetentionPageFolder = function(params: any){
  return {
    id: "retention-page-folder-versions-" + new Date().getTime(),
    name: "retention-page-folder-" + params.documentId,
    icon: 'ic:outline-lock-clock',
    label: params.documentName,
    component: 'LazyRetentionPageFolder',
    props: {
      idOrPath: params.documentId,
      homeId: params.documentId
    }
  } as TabItem
}
// iconoir:privacy-policy