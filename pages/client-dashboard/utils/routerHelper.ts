export const routeDashboardDetailPage  = function(params: any){
  return {
    id: "dashboard-detail-versions-" + new Date().getTime(),
    name: "dashboard-detail-versions-" + params.id,
    icon: 'dp-icon:flow-outline',
    label: params.name,
    component: 'LazyDashboardDetailPage',
    props: {
      id: params.id,
    }
  } as TabItem
}
