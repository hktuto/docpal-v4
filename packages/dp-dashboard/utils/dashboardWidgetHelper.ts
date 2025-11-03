export type DashboardWidget =
  | 'DocTypeCoCount'
  | 'DocTypeCount'
  | 'DocSizeStatistics'
  | 'WorkflowCoCount'
  | 'WorkflowGroup'
  | 'AzureThreshold'
  | 'AzureOcrProcessed'
  | 'AzureOcrProcessedHistory'
  | 'PersonalDashboard'
  | 'PersonalShare'
  | 'PersonalShareExternal'
  | 'PersonalShareInternalMe'
  | 'PersonalShareInternalOther'
  | 'PersonalPredefinedSearch'
  | 'PersonalWorkflowCreate'
  | 'PersonalWorkflow'
  | 'PersonalSearchHistory'
  | 'PersonalSearchDefine'
  | 'PersonalSearchRecentDoc'
  | 'PersonalSearchSubscribed'
  | 'PersonalCaseCreate'
  | 'PersonalCase'
  | 'Browse'
export type WorkflowCoCountWidget =
  | 'WorkflowActiveCount'
  | 'WorkflowApproveRate'
  | 'WorkflowNewCount'
  | 'WorkflowTimeSpendPerTask'
  | 'WorkflowTimeSpendPerWorkflow'
import DocTypeCoCount from '../components/global/doc/coCount/index.vue'
import DocTypeCount from '../components/global/doc/count.vue'
import DocSizeStatistics from '../components/global/doc/sizeStatistics.vue'
// workflow co-count
import WorkflowCoCount from '../components/global/workflow/coCount/index.vue'
import WorkflowActiveCount from '../components/global/workflow/coCount/activeCount.vue'
import WorkflowApproveRate from '../components/global/workflow/coCount/approveRate.vue'
import WorkflowNewCount from '../components/global/workflow/coCount/newCount.vue'
import WorkflowTimeSpendPerTask from '../components/global/workflow/coCount/timeSpendPerTask.vue'
import WorkflowTimeSpendPerWorkflow from '../components/global/workflow/coCount/timeSpendPerWorkflow.vue'
// workflow group
import WorkflowGroup from '../components/global/workflow/group/index.vue'
// azure
import AzureThreshold from '../components/global/azure/threshold.vue'
import AzureOcrProcessed from '../components/global/azure/ocrProcessed/index.vue'
import AzureOcrProcessedHistory from '../components/global/azure/ocrProcessHistory/index.vue'

// personal
import PersonalDashboard from '../components/global/personal/dashboard.vue'
import PersonalShare from '../components/global/personal/share/index.vue'
import PersonalShareExternal from '../components/global/personal/share/external.vue'
import PersonalShareInternalMe from '../components/global/personal/share/internalMe.vue'
import PersonalShareInternalOther from '../components/global/personal/share/internalOther.vue'
import PersonalPredefinedSearch from '../components/global/personal/predefinedSearch.vue'
import PersonalWorkflowCreate from '../components/global/personal/workflow/create/index.vue'
import PersonalWorkflow from '../components/global/personal/workflow/index.vue'
import PersonalSearchHistory from '../components/global/personal/search/history.vue'
import PersonalSearchDefine from '../components/global/personal/search/define.vue'
import PersonalSearchRecentDoc from '../components/global/personal/search/recentDoc.vue'
import PersonalSearchSubscribed from '../components/global/personal/search/subscribed.vue'
import PersonalCaseCreate from '../components/global/personal/case/create.vue'
import PersonalCase from '../components/global/personal/case/index.vue'
import PersonalCaseSingle from '../components/global/personal/case/single/index.vue'
import CalendarWidget from '../components/global/calendar/widget/index.vue'
import PersonalWorkflowSingle from '../components/global/personal/workflow/single/index.vue'
// import PersonalWorkflowSingleFilter from '../components/global/personal/workflow/singleFilter/index.vue'
import '../assets/dashboard.scss'
import Browse from '../components/global/personal/browse/index.vue'
const enum dashboardType {
  documentCount = 'documentCount',
  workflowCount = 'workflowCount',
  document = 'document',
  workflow = 'workflow',
  case = 'case',
  azure = 'azure',
  default = 'default'
}
export type DashboardWidgetSetting = {
  x?: number
  y?: number
  i?: string
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
  divided?: boolean // 分割线
  w: number
  h: number
  component: any
  setting?: any
  show?: boolean
  layout?: DashboardWidgetSetting
  label: string
  feature?: string
  type?: dashboardType
}

export const dashboardWidgetSetting: { [key in string]: DashboardWidgetSetting } = {
  DocSizeStatistics: {
    type: dashboardType.documentCount,
    label: 'docTypeSizeChart',
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 4,
    w: 2,
    h: 2,
    component: 'DocSizeStatistics',
    setting: {
      style: 'pie',
      displayList: [{ documentType: 'File' }, { documentType: 'Video' }]
    }
  },
  DocTypeCount: {
    type: dashboardType.documentCount,
    label: 'docTypeCountChart',
    minW: 1,
    minH: 2,
    maxW: 2,
    maxH: 4,
    w: 1,
    h: 2,
    component: 'DocTypeCount',
    setting: {
      documentType: 'File',
      color: 'red',
      icon: '/icons/doc/file.svg'
    }
  },
  DocTypeCoCount: {
    type: dashboardType.documentCount,
    label: 'docTypeChart',
    minW: 4,
    minH: 4,
    maxW: 12,
    maxH: 8,
    w: 6,
    h: 6,
    component: 'DocTypeCoCount',
    setting: {
      documentType: 'File',
      color: '#fff',
      showCount: true,
      showSize: true,
      displayList: [{ meta: 'create_by' }],
      showUserFilter: true
    }
  },
  WorkflowCoCount: {
    type: dashboardType.workflowCount,
    divided: true,
    label: 'workflowCoCount',
    minW: 4,
    minH: 4,
    maxW: 12,
    maxH: 8,
    w: 6,
    h: 6,
    component: 'WorkflowCoCount',
    setting: {
      workflow: 'contractApproval',
      displayList: [
        'WorkflowNewCount',
        'WorkflowTimeSpendPerTask',
        'WorkflowTimeSpendPerWorkflow',
        'WorkflowActiveCount'
        // 'WorkflowApproveRate',
      ],
      showUserFilter: true
    }
  },
  WorkflowGroup: {
    type: dashboardType.workflowCount,
    label: 'workflowGroup',
    minW: 4,
    minH: 4,
    maxW: 12,
    maxH: 8,
    w: 12,
    h: 6,
    component: 'WorkflowGroup',
    setting: {
      groupId: '',
      filterList: []
    }
  },
  // azure
  // 屏蔽Azure
  // AzureThreshold: {
  //     feature: 'AZURE_OCR',
  //     divided: true,
  //     label: 'azureThreshold',
  //     minW: 1,
  //     minH: 1,
  //     maxW: 4,
  //     maxH: 1,
  //     w: 1,
  //     h: 1,
  //     component : 'AzureThreshold',
  //     setting : {
  //         scanType: 'Pre-Build',
  //     }
  // },
  // AzureOcrProcessed: {
  //     feature: 'AZURE_OCR',
  //     label: 'azureOcrProcessed',
  //     minW: 4,
  //     minH: 2,
  //     maxW: 12,
  //     maxH: 8,
  //     w: 12,
  //     h: 5,
  //     component : 'AzureOcrProcessed',
  //     setting : {
  //         dataType: 'workflow'
  //     }
  // },
  // AzureOcrProcessedHistory: {
  //     feature: 'AZURE_OCR',
  //     label: 'azureOcrProcessedHistory',
  //     minW: 4,
  //     minH: 2,
  //     maxW: 12,
  //     maxH: 6,
  //     w: 12,
  //     h: 4,
  //     component : 'AzureOcrProcessedHistory',
  //     setting: {}
  // },
  PersonalDashboard: {
    type: dashboardType.default,
    feature: 'DASHBOARD',
    divided: true,
    label: 'PersonalDashboard',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalDashboard',
    setting: {}
  },
  PersonalShare: {
    type: dashboardType.document,
    feature: 'SHARE_INTERNAL',
    label: 'PersonalShare',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalShare',
    setting: {}
  },
  PersonalShareExternal: {
    type: dashboardType.document,
    feature: 'SHARE_EXTERNAL',
    label: 'PersonalShareExternal',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalShareExternal',
    setting: {}
  },
  PersonalShareInternalOther: {
    type: dashboardType.document,
    feature: 'SHARE_INTERNAL',
    label: 'PersonalShareInternalOther',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalShareInternalOther',
    setting: {}
  },
  PersonalShareInternalMe: {
    type: dashboardType.document,
    label: 'PersonalShareInternalMe',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalShareInternalMe',
    setting: {}
  },
  // merge to search
  // PersonalPredefinedSearch: {
  //     type: 'personal',
  //     feature: 'SMART_FOLDER',
  //     label: 'PersonalPredefinedSearch',
  //     minW: 2,
  //     minH: 2,
  //     maxW: 12,
  //     maxH: 6,
  //     w: 3,
  //     h: 3,
  //     component : 'PersonalPredefinedSearch',
  //     setting : {
  //     }
  // },
  PersonalWorkflowCreate: {
    type: dashboardType.workflow,
    feature: 'WORKFLOW',
    label: 'PersonalWorkflowCreate',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalWorkflowCreate',
    setting: {
      workflowKeys: []
    }
  },
  PersonalWorkflow: {
    type: dashboardType.workflow,
    feature: 'WORKFLOW',
    label: 'PersonalWorkflow',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 3,
    h: 3,
    component: 'PersonalWorkflow',
    setting: {
      isTabView: false,
      processKeys: []
    }
  },
  PersonalWorkflowSingle: {
    type: dashboardType.workflow,
    label: 'PersonalWorkflowSingle',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 3,
    h: 3,
    component: 'PersonalWorkflowSingle',
    setting: {
      selectedWorkflow: '',
      columns: []
    }
  },
  // PersonalWorkflowSingleFilter:{
  //     type: 'personal',
  //     label: 'PersonalWorkflowSingle',
  //     minW: 2,
  //     minH: 2,
  //     maxW: 12,
  //     maxH: 12,
  //     w: 3,
  //     h: 3,
  //     component : 'PersonalWorkflowSingleFilter',
  //     setting : {
  //         selectedWorkflow: '',
  //         columns: []
  //     }
  // },
  PersonalSearchHistory: {
    type: dashboardType.document,
    // feature: 'SEARCH',
    label: 'PersonalSearchHistory',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalSearchHistory',
    setting: {}
  },
  PersonalSearchDefine: {
    type: dashboardType.document,
    label: 'PersonalSearchDefine',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalSearchDefine',
    setting: {}
  },
  PersonalSearchRecentDoc: {
    type: dashboardType.document,
    // feature: 'SEARCH',
    label: 'PersonalSearchRecentDoc',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalSearchRecentDoc',
    setting: {}
  },
  PersonalSearchSubscribed: {
    type: dashboardType.document,
    label: 'PersonalSearchSubscribed',
    minW: 4,
    minH: 2,
    maxW: 12,
    maxH: 5,
    w: 6,
    h: 3,
    component: 'PersonalSearchSubscribed',
    setting: {}
  },
  PersonalCaseCreate: {
    type: dashboardType.case,
    label: 'PersonalCaseCreate',
    minW: 1,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 2,
    h: 3,
    component: 'PersonalCaseCreate',
    setting: {}
  },
  PersonalCase: {
    type: dashboardType.case,
    label: 'PersonalCase',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'PersonalCase',
    setting: {
      caseKeys: []
    }
  },
  PersonalCaseSingle: {
    type: dashboardType.case,
    label: 'PersonalCaseSingle',
    minW: 2,
    minH: 2,
    maxW: 12,
    maxH: 12,
    w: 6,
    h: 6,
    component: 'PersonalCaseSingle',
    setting: {
      caseId: '',
      caseLabel: '',
      newButtonLabel: 'common_add',
      displayColumns: []
    }
  },
  CalendarWidget: {
    divided: true,
    type: dashboardType.default,
    label: 'CalendarWidget',
    minW: 2,
    minH: 6,
    maxW: 12,
    maxH: 12,
    w: 6,
    h: 8,
    component: 'CalendarWidget',
    setting: {
      editable: true
    }
  },
  Browse: {
    type: dashboardType.document,
    label: 'Browse',
    minW: 4,
    minH: 4,
    maxW: 12,
    maxH: 6,
    w: 3,
    h: 3,
    component: 'Browse',
    setting: {
      home: {},
      hideSetting: []
    }
  }
}
export function getDashboardWidgetByType(): { [key in string]: DashboardWidget[] } {
  const DashboardWidgetResult: any = {
    default: [] as DashboardWidget[]
  } as { [key in string]: DashboardWidget[] }

  Object.keys(dashboardWidgetSetting).forEach((key) => {
    const item = dashboardWidgetSetting[key]
    if (item.type) {
      if(!DashboardWidgetResult[item.type]) {
        DashboardWidgetResult[item.type] = []
      }
      DashboardWidgetResult[item.type].push(item)
    } else {
      DashboardWidgetResult.default.push(item)
    }
  })
  return DashboardWidgetResult
}
export const getWidgetSetting = (widget: DashboardWidget) => {
  return dashboardWidgetSetting[widget]
}

export const getNormalizeSetting = (setting: DashboardWidget) => {
  const item = getWidgetSetting(setting)
  if (!item) return {}
  return {
    minW: item.minW || 2,
    minH: item.minH || 2,
    maxW: item.maxW || 2,
    maxH: item.maxH || 2
  }
}

// TODO : 删除
export const widgetComponent = {
  DocTypeCoCount: DocTypeCoCount,
  DocTypeCount: DocTypeCount,
  DocSizeStatistics: DocSizeStatistics,

  WorkflowCoCount: WorkflowCoCount,
  WorkflowActiveCount: WorkflowActiveCount,
  WorkflowApproveRate: WorkflowApproveRate,
  WorkflowNewCount: WorkflowNewCount,
  WorkflowTimeSpendPerTask: WorkflowTimeSpendPerTask,
  WorkflowTimeSpendPerWorkflow: WorkflowTimeSpendPerWorkflow,

  WorkflowGroup: WorkflowGroup,

  AzureThreshold: AzureThreshold,
  AzureOcrProcessed: AzureOcrProcessed,
  AzureOcrProcessedHistory: AzureOcrProcessedHistory,

  PersonalDashboard: PersonalDashboard,
  PersonalShare: PersonalShare,
  PersonalShareExternal: PersonalShareExternal,
  PersonalShareInternalMe: PersonalShareInternalMe,
  PersonalShareInternalOther: PersonalShareInternalOther,
  PersonalPredefinedSearch: PersonalPredefinedSearch,
  PersonalWorkflowCreate: PersonalWorkflowCreate,
  PersonalWorkflow: PersonalWorkflow,
  PersonalSearchHistory: PersonalSearchHistory,
  PersonalSearchDefine: PersonalSearchDefine,
  PersonalSearchRecentDoc: PersonalSearchRecentDoc,
  PersonalSearchSubscribed: PersonalSearchSubscribed,
  PersonalCaseCreate: PersonalCaseCreate,
  PersonalCase: PersonalCase,
  PersonalWorkflowSingle: PersonalWorkflowSingle,
  PersonalCaseSingle: PersonalCaseSingle,
  CalendarWidget: CalendarWidget,

  Browse: Browse
}
