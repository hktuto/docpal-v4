export const routeFolderCabinetDetail  = function(params: any){
  return {
    id: "folder-cabinet-detail-versions-" + new Date().getTime(),
    name: "folder-cabinet-detail-versions-" + params.id,
    icon: 'icon-park-outline:document-folder',
    label: params.label,
    component: 'LazyAdminFolderCabinetDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
export const routeFolderCabinetPage  = function(){
  return {
    id: "admin-folder-cabinet",
    name: "admin-folder-cabinet",
    icon: 'icon-park-outline:document-folder',
    label: "adminMenu.folderCabinet",
    component: 'LazyAdminFolderCabinetPage',
    props: {
    }
  } as TabItem
}
