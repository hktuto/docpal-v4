export const routeDashboardDetail  = function(params: any){
  return {
    id: "admin-dashboard-versions-" + new Date().getTime(),
    name: "admin-dashboard-versions-" + params.id,
    icon: 'material-symbols:dashboard-customize-outline-rounded',
    label: 'adminMenu.dashboard',
    component: 'LazyDashboardDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
