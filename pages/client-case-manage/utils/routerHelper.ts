export const caseManageDetailPage  = function(params: any){
  return {
    id: "client-case-manage-detail" + new Date().getTime(),
    name: "client-case-manage-detail-" + params.id,
    icon: 'dp-icon:case-outline',
    label: params.name,
    component: 'LazyCaseDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
export const caseManageDashboardPage  = function(params: any){
  return {
    id: "client-case-manage-dashboard" + new Date().getTime(),
    name: "client-case-manage-dashboard-" + params.id,
    icon: 'dp-icon:case-outline',
    label: params.name,
    component: 'LazyCaseDashboard',
    props: {
      id: params.id,
    }
  } as TabItem
}