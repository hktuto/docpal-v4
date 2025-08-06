export const routeMasterTableDetail  = function(params: any){
  return {
      id: "master-table-detail-versions-" + new Date().getTime(),
      name: "master-table-detail-versions-" + params.id,
      icon: 'uil:database-alt',
      label: params.name,
      component: 'LazyAdminMasterTableDetail',
      props: {
          id: params.id,
      }
  } as TabItem
}
export const routeMasterTableNew  = function(params: any){
  return {
    id: 'master-table-new-' + new Date().getTime(),
    name: params.name,
    label: 'adminMenu.masterTable',
    icon : 'uil:database-alt',
    component: 'LazyAdminMasterTableNewDead',
  } as TabItem
}
