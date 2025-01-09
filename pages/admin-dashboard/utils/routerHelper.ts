export const routeDashboardManageDetail  = function(params: any){
  return {
    id: "admin-dashboard-versions-" + new Date().getTime(),
    name: "admin-dashboard-versions-" + params.id,
    icon: 'material-symbols:dashboard-customize-outline-rounded',
    label: params.name,
    component: 'LazyDashboardManageDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}