export const routeCompanyProfileDetailPage  = function(params: any){
  return {
    id: "company-profile-detail-versions-" + new Date().getTime(),
    name: "company-profile-detail-versions-" + params.id,
    icon: 'dp-icon:flow-outline',
    label: params.name,
    component: 'LazyCompanyProfileDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
