interface CaseDashboardProvider {
    caseTypeId: Ref<string | null>,
    instanceId?: Ref<string | null>,
    name: Ref<string | null>,
}

export const CaseManagementDashboardKey:InjectionKey<CaseDashboardProvider> = Symbol('caseManagementDashboard')


import type { DashboardWidgetSetting } from '../../dp-dashboard/utils/dashboardWidgetHelper'
import Action from  '../components/dashboard/action.vue'
import BasicInfo from  '../components/dashboard/basicInfo.vue'
import Activity from  '../components/dashboard/activity.vue'
import Process from  '../components/dashboard/process.vue'
import TaskPage from  '../components/dashboard/taskPage.vue'
import WorkflowPage from  '../components/dashboard/workflowPage.vue'
import { InjectionKey } from 'vue'
export type CmmnDashboardWidget = 'Action' | 
'BasicInfo' | 
'Process'  | 
'TaskPage' | 
'WorkflowPage' | 
'Activity' 
export const CmmnDashboardWidgetSetting: { [key in CmmnDashboardWidget] : DashboardWidgetSetting } = {
  BasicInfo: {
    label: 'cmmnBasicInfo',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'BasicInfo',
    setting : {
      layout: [],
      defaultValue: {}
    }
  },
  Activity: {
    label: 'cmmnActivity',
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 12,
    w: 2,
    h: 3,
    component: 'Activity',
    setting : {
      
    }
  },
  Action: {
    label: 'cmmnAction',
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'Action',
    setting : {
      
    }
  },
  Process: {
    label: 'cmmnProcess',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'Process',
    setting : {
      layout: []
    }
  },
  TaskPage: {
    label: 'cmmnTaskPage',
    minW: 2,
    minH: 2,
    maxW: 8,
    maxH: 12,
    w: 2,
    h: 3,
    component: 'TaskPage',
    setting : {
      
    }
  },
  WorkflowPage: {
    label: 'cmmnWorkflowPage',
    minW: 6,
    minH: 4,
    maxW: 12,
    maxH: 12,
    w: 8,
    h: 4,
    component: 'WorkflowPage',
    setting : {
      
    }
  }
}

export function getCmmnWidgetSetting(widget: CmmnDashboardWidget) {
  return CmmnDashboardWidgetSetting[widget]
}
export const getCmmnNormalizeSetting= (setting: CmmnDashboardWidget) => {
  const item = getCmmnWidgetSetting(setting)
  return {
      minW: item.minW,
      minH: item.minH,
      maxW: item.maxW,
      maxH: item.maxH,
  }
}
export const CmmnWidgetComponent = {
  'BasicInfo': BasicInfo,
  'Action': Action,
  'Activity': Activity,
  'Process': Process,
  'TaskPage': TaskPage,
  'WorkflowPage': WorkflowPage,
}
