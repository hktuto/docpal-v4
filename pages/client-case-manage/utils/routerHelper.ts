import { version } from "vue";

export const caseManageDetailPage  = function(params: any){
  return {
    id: "client-case-manage-detail" + new Date().getTime(),
    name: "client-case-manage-detail-" + params.id,
    icon: 'dp-icon:case-outline',
    label: params.name,
    component: 'LazyCaseDetail',
    props: {
      id: params.id,
      name: params.name,
      data : params.data
    }
  } as TabItem
}
export const caseManageDashboardPage  = function(params: any){
  console.log(params);
  
  return {
    id: "client-case-manage-dashboard" + new Date().getTime(),
    name: "client-case-manage-dashboard-" + params.instanceId,
    icon: 'dp-icon:case-outline',
    label: params.instanceId,
    component: 'LazyCaseDashboard',
    props: {
      ...params
    }
  } as TabItem
}

export const caseProcessTaskFormPage = ({
  caseInstanceId,
  actionStepId,
  backItem
}: {
  caseInstanceId: string;
  actionStepId: string;
  backItem:any
}) => ({
  id: "client-case-manage-process-task-form" + new Date().getTime(),
  name: "client-case-manage-process-task-form-" + actionStepId,
  icon: 'dp-icon:case-outline',
  label: "Form",
  component: 'LazyCaseProcessTaskStartFullPageDead',
  props: {
    caseInstanceId,
    actionStepId,
    backItem
  },
})