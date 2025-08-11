export const routeRetentionDetail  = function(params: any){
  return {
    id: "admin-retention-versions-" + new Date().getTime(),
    name: "admin-retention-versions-" + params.id,
    icon: 'streamline:interface-lock-shield-combination-combo-lock-locked-padlock-secure-security-shield-keyhole',
    label: params.policyName,
    component: 'LazyAdminRetentionDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
