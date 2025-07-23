export const routeImportJobsDetailPage  = function(params: any){
  return {
    id: "import-jobs-detail-versions-" + new Date().getTime(),
    name: "import-jobs-detail-versions-" + params.id,
    icon: 'dp-icon:flow-outline',
    label: params.profileName,
    component: 'LazyImportJobsDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
