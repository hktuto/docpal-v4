import type { DashboardWidgetSetting } from '../../dp-dashboard/utils/dashboardWidgetHelper'
import { DASHBOARD_TYPE } from '../../dp-dashboard/utils/dashboardWidgetHelper'
import Action from '../components/dashboard/action/index.vue'
import BasicInfo from '../components/dashboard/basicInfo.vue'
import Activity from '../components/dashboard/activity.vue'
import Process from '../components/dashboard/process.vue'
import TaskPage from '../components/dashboard/taskPage.vue'
import WorkflowPage from '../components/dashboard/workflowPage.vue'
import DocumentRoot from '../components/dashboard/documentRoot.vue'
import RelatedCase from '../components/dashboard/relatedCase/index.vue'
import RelatedMaster from '../components/dashboard/relatedMaster/index.vue'
import MasterTableInfo from '../components/dashboard/masterTableInfo/index.vue'
import RelatedCaseInfo from '../components/dashboard/relatedCaseInfo/index.vue'
import CaseFieldNum from '../components/caseStatistics/fieldNum/index.vue'
import CaseMonthlyAverage from '../components/caseStatistics/monthlyAverage/index.vue'
import CaseFieldLifecycle from '../components/caseStatistics/fieldLifecycle/index.vue'
import CaseFieldTotal from '../components/caseStatistics/fieldTotal/index.vue'
import CaseLimitFieldNum from '../components/caseStatistics/limitFieldNum/index.vue'
import CaseLimitGroupFieldNum from '../components/caseStatistics/limitGroupFieldNum/index.vue'
export type CmmnDashboardWidget =
  | 'Action'
  | 'BasicInfo'
  | 'Process'
  | 'TaskPage'
  | 'WorkflowPage'
  | 'Activity'
  | 'DocumentRoot'
  | 'RelatedCase'
  | 'RelatedMaster'
  | 'MasterTableInfo'
  | 'RelatedCaseInfo'
  | 'CaseFieldNum'
  | 'CaseMonthlyAverage'
  | 'CaseFieldLifecycle'
  | 'CaseFieldTotal'
  | 'CaseLimitFieldNum'
  | 'CaseLimitGroupFieldNum'
export const CmmnDashboardWidgetSetting: { [key in CmmnDashboardWidget]: DashboardWidgetSetting } = {
  BasicInfo: {
    label: 'cmmnBasicInfo',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'BasicInfo',
    setting: {
      layout: [],
      defaultValue: {}
    }
  },
  Activity: {
    label: 'cmmnActivity',
    minW: 2,
    minH: 2,
    maxW: 10,
    maxH: 12,
    w: 2,
    h: 3,
    component: 'Activity',
    setting: {}
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
    setting: {}
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
    setting: {
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
    setting: {}
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
    setting: {}
  },
  DocumentRoot: {
    label: 'cmmnDocumentRoot',
    minW: 2,
    minH: 4,
    maxW: 12,
    maxH: 12,
    w: 8,
    h: 4,
    component: 'DocumentRoot',
    setting: {
      home: ''
    }
  },
  RelatedCase: {
    label: 'cmmnRelatedCase',
    minW: 4,
    minH: 4,
    maxW: 12,
    maxH: 12,
    w: 4,
    h: 4,
    component: 'RelatedCase',
    setting: {
      caseId: '',
      caseLabel: '',
      newButtonLabel: 'common_add',
      displayColumns: []
    }
  },
  RelatedMaster: {
    label: 'cmmnRelatedMaster',
    minW: 4,
    minH: 4,
    maxW: 12,
    maxH: 12,
    w: 4,
    h: 4,
    component: 'RelatedMaster',
    setting: {
      masterTableId: '',
      label: '',
      relatedField: '',
      displayColumns: []
    }
  },
  MasterTableInfo: {
    label: 'cmmnMasterTableInfo',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'MasterTableInfo',
    setting: {
      title: '',
      layout: [],
      masterTableId: '',
      masterTableName: '',
      relatedField: ''
    }
  },
  RelatedCaseInfo: {
    label: 'cmmnRelatedCaseInfo',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'RelatedCaseInfo',
    setting: {
      title: '',
      layout: [],
      caseId: '',
      caseLabel: '',
      caseVersionId: '', // 初始化 case list
      relatedCaseField: ''
    }
  },

  CaseFieldNum: {
    type: DASHBOARD_TYPE.caseCount,
    label: 'cmmnCaseFieldNum',
    minW: 1,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'CaseFieldNum',
    setting: {
      name: '',
      prefix: '',
      displayMethod: ''
    }
  },
  CaseLimitFieldNum: {
    type: DASHBOARD_TYPE.caseCount,
    label: 'cmmnCaseLimitFieldNum',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 3,
    h: 4,
    component: 'CaseLimitFieldNum',
    setting: {
      name: '',
      prefix: '',
      displayMethod: ''
    }
  },
  CaseLimitGroupFieldNum: {
    type: DASHBOARD_TYPE.caseCount,
    label: 'cmmnCaseLimitGroupFieldNum',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 3,
    h: 4,
    component: 'CaseLimitGroupFieldNum',
    setting: {
      name: '',
      prefix: '',
      displayMethod: ''
    }
  },
  CaseMonthlyAverage: {
    type: DASHBOARD_TYPE.caseCount,
    label: 'cmmnCaseMonthlyAverage',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 6,
    h: 4,
    component: 'CaseMonthlyAverage',
    setting: {
      caseId: '',
      relatedField: '',
      averageField: '',
      averageTitle: '',
      averageUnit: 'Average Duration',
      title: 'Number of Cases',
      dialogSettingTitle: '',
      displayColumns: [],
      fields: '[]'
    }
  },
  CaseFieldLifecycle: {
    type: DASHBOARD_TYPE.caseCount,
    label: 'cmmnCaseFieldLifecycle',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 6,
    h: 4,
    component: 'CaseFieldLifecycle',
    setting: {
      caseId: '',
      relatedField: '',
      dateField: '',
      title: 'Field Lifecycle',
      dialogSettingTitle: '',
      displayColumns: [],
      fields: '[]'
    }
  },
  CaseFieldTotal: {
    type: DASHBOARD_TYPE.caseCount,
    label: 'cmmnCaseFieldTotal',
    minW: 1,
    minH: 1,
    maxW: 12,
    maxH: 12,
    w: 2,
    h: 2,
    component: 'CaseFieldTotal',
    setting: {
      caseId: '',
      relatedField: '',
      dateField: '',
      title: 'Field Lifecycle',
      dialogSettingTitle: '',
      displayColumns: [],
      fields: '[]',
      displayMethod: '',
      prefix: '',
    }
  }
}

export function getCmmnWidgetSetting(widget: CmmnDashboardWidget) {
  return CmmnDashboardWidgetSetting[widget]
}
export const getCmmnNormalizeSetting = (setting: CmmnDashboardWidget) => {
  const item = getCmmnWidgetSetting(setting)
  return {
    minW: item.minW,
    minH: item.minH,
    maxW: item.maxW,
    maxH: item.maxH
  }
}
export const CmmnWidgetComponent = {
  BasicInfo: BasicInfo,
  Action: Action,
  Activity: Activity,
  Process: Process,
  TaskPage: TaskPage,
  WorkflowPage: WorkflowPage,
  DocumentRoot: DocumentRoot,
  RelatedCase: RelatedCase,
  RelatedCaseInfo: RelatedCaseInfo,
  RelatedMaster: RelatedMaster,
  MasterTableInfo: MasterTableInfo,
  CaseFieldNum: CaseFieldNum,
  CaseLimitFieldNum: CaseLimitFieldNum,
  CaseLimitGroupFieldNum: CaseLimitGroupFieldNum,
  CaseMonthlyAverage: CaseMonthlyAverage,
  CaseFieldLifecycle: CaseFieldLifecycle,
  CaseFieldTotal: CaseFieldTotal
}
