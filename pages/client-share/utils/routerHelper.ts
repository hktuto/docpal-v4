export const routeShareMePageFolder = function(params: any){
  return {
    id: "internal-share-me-page-folder-versions-" + new Date().getTime(),
    name: "internal-share-me-page-folder-" + params.id,
    icon: 'icon-park-outline:document-folder',
    label: params.documentNames,
    component: 'LazyInternalShareMePageFolder',
    props: {
      id: params.id,
      idOrPath: params.documentIds
    }
  } as TabItem
}
export const routeShareOtherPageFolder = function(params: any){
  return {
    id: "internal-share-other-page-folder-versions-" + new Date().getTime(),
    name: "internal-share-other-page-folder-" + params.id,
    icon: 'icon-park-outline:document-folder',
    label: params.name,
    component: 'LazyInternalShareOtherPageFolder',
    props: {
      id: params.id,
    }
  } as TabItem
}
