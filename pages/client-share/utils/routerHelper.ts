export const routeShareMePage = function(params: any){
  return {
    id: "internal-share-me-page-versions-" + new Date().getTime(),
    name: "internal-share-me-page-",
    icon: 'icon-park-outline:document-folder',
    label: 'file_share_me',
    component: 'LazyInternalShareMePage',
    props: {
    }
  } as TabItem
}
export const routeShareMePageFolder = function(params: any){
  return {
    id: "internal-share-me-page-folder-versions-" + new Date().getTime(),
    name: "internal-share-me-page-folder-" + params.documentIds,
    icon: 'icon-park-outline:document-folder',
    label: params.documentNames,
    component: 'LazyInternalShareMePageFolder',
    props: {
      idOrPath: params.documentIds,
      homeId: params.documentIds
    }
  } as TabItem
}

export const routeShareOtherPage = function(params: any){
  return {
    id: "internal-share-other-page-versions-" + new Date().getTime(),
    name: "internal-share-other-page-",
    icon: 'icon-park-outline:document-folder',
    label: 'file_share_other',
    component: 'LazyInternalShareOtherPage',
    props: {
    }
  } as TabItem
}
export const routeShareOtherPageFolder = function(params: any){
  return {
    id: "internal-share-other-page-folder-versions-" + new Date().getTime(),
    name: "internal-share-other-page-folder-" + params.documentIds,
    icon: 'icon-park-outline:document-folder',
    label: params.name,
    component: 'LazyInternalShareOtherPageFolder',
    props: {
      idOrPath: params.documentIds,
      homeId: params.documentIds
    }
  } as TabItem
}
