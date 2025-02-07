export const routeSmartFolderDetail = function(params: any){
  return {
    id: "smart-folder-versions-" + new Date().getTime(),
    name: "smart-folder-versions-" + params.id,
    icon: 'icon-park-outline:document-folder',
    label: params.name,
    component: 'LazySmartFolderDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
export const routeSmartFolderBrowse = function(params: any){
  return {
    id: "smart-folder-versions-" + new Date().getTime(),
    name: "smart-folder-versions-" + params.id,
    icon: 'icon-park-outline:document-folder',
    label: params.name,
    component: 'LazySmartFolderBrowse',
    props: {
      id: params.id,
    }
  } as TabItem
}
export const routeSmartFolder = function(params: any){
  return {
    id: "smart-folder",
    name: "smart-folder",
    icon: 'icon-park-outline:document-folder',
    label: 'adminMenu.smartFolder',
    component: 'LazySmartFolderPage',
    props: {
      id: params.id,
    }
  } as TabItem
}