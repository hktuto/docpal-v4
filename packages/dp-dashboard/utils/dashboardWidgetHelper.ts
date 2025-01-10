export type DashboardWidget = "DocTypeCoCount" | 
    "DocTypeCount" | 
    "DocSizeStatistics"  | 
    "WorkflowCoCount" |
    "WorkflowGroup" |
    "AzureThreshold" |
    "AzureOcrProcessed" |
    "AzureOcrProcessedHistory" |
    "PersonalDashboard" |
    "PersonalShare" |
    "PersonalShareExternal" |
    "PersonalShareInternalMe" |
    "PersonalShareInternalOther" |
    "PersonalPredefinedSearch" |
    "PersonalWorkflowCreate" |
    "PersonalWorkflow" |
    "PersonalSearchHistory" |
    "PersonalSearchRecentDoc" |
    "PersonalCaseCreate" |
    "PersonalCase"
export type WorkflowCoCountWidget = "WorkflowActiveCount" | "WorkflowApproveRate" | "WorkflowNewCount"  | "WorkflowTimeSpendPerTask" | "WorkflowTimeSpendPerWorkflow"  
import DocTypeCoCount from  '../components/doc/coCount/index.vue'
import DocTypeCount from  '../components/doc/count.vue'
import DocSizeStatistics from  '../components/doc/sizeStatistics.vue'
// workflow co-count
import WorkflowCoCount from  '../components/workflow/coCount/index.vue'
import WorkflowActiveCount from  '../components/workflow/coCount/activeCount.vue'
import WorkflowApproveRate from  '../components/workflow/coCount/approveRate.vue'
import WorkflowNewCount from  '../components/workflow/coCount/newCount.vue'
import WorkflowTimeSpendPerTask from  '../components/workflow/coCount/timeSpendPerTask.vue'
import WorkflowTimeSpendPerWorkflow from  '../components/workflow/coCount/timeSpendPerWorkflow.vue'
// workflow group
import WorkflowGroup from  '../components/workflow/group/index.vue'
// azure
import AzureThreshold from '../components/azure/threshold.vue'
import AzureOcrProcessed from '../components/azure/ocrProcessed/index.vue'
import AzureOcrProcessedHistory from '../components/azure/ocrProcessHistory/index.vue'

// personal
// import PersonalDashboard from '../components/personal/dashboard.vue'
// import PersonalShare from '../components/personal/share/index.vue'
// import PersonalShareExternal from '../components/personal/share/external.vue'
// import PersonalShareInternalMe from '../components/personal/share/internalMe.vue'
// import PersonalShareInternalOther from '../components/personal/share/internalOther.vue'
// import PersonalPredefinedSearch from '../components/personal/predefinedSearch.vue'
// import PersonalWorkflowCreate from '../components/personal/workflow/create.vue'
// import PersonalWorkflow from '../components/personal/workflow/index.vue'
// import PersonalSearchHistory from '../components/personal/search/history.vue'
// import PersonalSearchRecentDoc from '../components/personal/search/recentDoc.vue'
// import PersonalCaseCreate from '../components/personal/case/create.vue'
// import PersonalCase from '../components/personal/case/index.vue'

import  '../assets/dashboard.scss'

export type DashboardWidgetSetting = {
    x?: number,
    y ?: number,
    i?: string,
    minW?: number,
    minH?: number,
    maxW?: number,
    maxH?: number,
    divided?: boolean, // 分割线
    w: number,
    h: number,
    component: any,
    setting?: any,
    show?: boolean,
    layout?: DashboardWidgetSetting,
    label: string, 
    feature?: string,
    type ?: 'personal' | 'document' | 'workflow' | 'azure' | 'default'
}

export const dashboardWidgetSetting: { [key in DashboardWidget] : DashboardWidgetSetting } = {
    DocSizeStatistics: {
        label: 'docTypeSizeChart',
        minW: 2,
        minH: 2,
        maxW: 4,
        maxH: 4,
        w: 2,
        h: 2,
        component: "DocSizeStatistics",
        setting : {
            style: 'pie',
            displayList: [
                { documentType: 'File' },
                { documentType: 'Video' }
            ]
        }
    },
    DocTypeCount: {
        label: 'docTypeCountChart',
        minW: 1,
        minH: 2,
        maxW: 2,
        maxH: 4,
        w: 1,
        h: 1,
        component : 'DocTypeCount',
        setting : {
            documentType: 'File',
            color: 'red',
            icon: '/icons/doc/file.svg'
        }
    },
    DocTypeCoCount: {
        label: 'docTypeChart',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: undefined,
        w: 6,
        h: 2,
        component : 'DocTypeCoCount',
        setting : {
            documentType: 'File',
            color: '#fff',
            showCount: true,
            showSize: true,
            displayList: [
                { meta: 'dc:creator' }
            ],
            showUserFilter: true
        }
    },
    WorkflowCoCount: {
        divided: true,
        label: 'workflowCoCount',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: undefined,
        w: 6,
        h: 6,
        component : 'WorkflowCoCount',
        setting: {
            workflow: 'contractApproval',
            displayList: [
                'WorkflowNewCount',
                'WorkflowTimeSpendPerTask',
                'WorkflowTimeSpendPerWorkflow',
                'WorkflowActiveCount',
                // 'WorkflowApproveRate',
            ],
            showUserFilter: true
        }
    },
    WorkflowGroup: {
        label: 'workflowGroup',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: undefined,
        w: 12,
        h: 5,
        component : 'WorkflowGroup',
        setting: {
            groupId: '',
            filterList: []
        }
    },
    // azure
    AzureThreshold: {
        feature: 'AZURE_OCR',
        divided: true,
        label: 'azureThreshold',
        minW: 1,
        minH: 1,
        maxW: 4,
        maxH: 1,
        w: 1,
        h: 1,
        component : 'AzureThreshold',
        setting : {
            scanType: 'Pre-Build',
        }
    },
    AzureOcrProcessed: {
        feature: 'AZURE_OCR',
        label: 'azureOcrProcessed',
        minW: 4,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 12,
        h: 5,
        component : 'AzureOcrProcessed',
        setting : {
            dataType: 'workflow'
        }
    },
    AzureOcrProcessedHistory: {
        feature: 'AZURE_OCR',
        label: 'azureOcrProcessedHistory',
        minW: 4,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 12,
        h: 4,
        component : 'AzureOcrProcessedHistory',
        setting: {}
    },
    PersonalDashboard: {
        type: 'personal',
        feature: 'DASHBOARD',
        divided: true,
        label: 'PersonalDashboard',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalDashboard',
        setting : {
        }
    },
    PersonalShare: {
        type: 'personal',
        feature: 'SHARE_INTERNAL',
        label: 'PersonalShare',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalShare',
        setting : {
        }
    },
    PersonalShareExternal: {
        type: 'personal',
        feature: 'SHARE_EXTERNAL',
        label: 'PersonalShareExternal',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalShareExternal',
        setting : {
        }
    },
    PersonalShareInternalOther: {
        type: 'personal',
        feature: 'SHARE_INTERNAL',
        label: 'PersonalShareInternalOther',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalShareInternalOther',
        setting : {
        }
    },
    PersonalShareInternalMe: {
        type: 'personal',
        label: 'PersonalShareInternalMe',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalShareInternalMe',
        setting : {
        }
    },
    PersonalPredefinedSearch: {
        type: 'personal',
        feature: 'SMART_FOLDER',
        label: 'PersonalPredefinedSearch',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalPredefinedSearch',
        setting : {
        }
    },
    PersonalWorkflowCreate: {
        type: 'personal',
        feature: 'WORKFLOW',
        label: 'PersonalWorkflowCreate',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalWorkflowCreate',
        setting : {
            workflowKeys: []
        }
    },
    PersonalWorkflow: {
        type: 'personal',
        feature: 'WORKFLOW',
        label: 'PersonalWorkflow',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalWorkflow',
        setting : {
            isTabView: false
        }
    },
    PersonalSearchHistory: {
        type: 'personal',
        // feature: 'SEARCH',
        label: 'PersonalSearchHistory',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalSearchHistory',
        setting : {
        }
    },
    PersonalSearchRecentDoc: {
        type: 'personal',
        // feature: 'SEARCH',
        label: 'PersonalSearchRecentDoc',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalSearchRecentDoc',
        setting : {
        }
    },
    PersonalCaseCreate: {
        type: 'personal',
        label: 'PersonalCaseCreate',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalCaseCreate',
        setting : {
        }
    },
    PersonalCase: {
        type: 'personal',
        label: 'PersonalCase',
        minW: 2,
        minH: 2,
        maxW: 12,
        maxH: 6,
        w: 3,
        h: 3,
        component : 'PersonalCase',
        setting : {
            caseKeys: []
        }
    }
}

export const  getWidgetSetting = (widget: DashboardWidget) => {
    return dashboardWidgetSetting[widget]
}

export const getNormalizeSetting= (setting: DashboardWidget) => {
    const item = getWidgetSetting(setting)
    if(!item) return {}
    return {
        minW: item.minW || 2,
        minH: item.minH || 2,
        maxW: item.maxW || 2,
        maxH: item.maxH || 2,
    }
}

export const widgetComponent = {
    'DocTypeCoCount': DocTypeCoCount,
    'DocTypeCount': DocTypeCount,
    'DocSizeStatistics': DocSizeStatistics,

    'WorkflowCoCount': WorkflowCoCount,
    'WorkflowActiveCount': WorkflowActiveCount,
    'WorkflowApproveRate': WorkflowApproveRate,
    'WorkflowNewCount': WorkflowNewCount,
    'WorkflowTimeSpendPerTask': WorkflowTimeSpendPerTask,
    'WorkflowTimeSpendPerWorkflow': WorkflowTimeSpendPerWorkflow,

    'WorkflowGroup': WorkflowGroup,

    'AzureThreshold': AzureThreshold,
    'AzureOcrProcessed': AzureOcrProcessed,
    'AzureOcrProcessedHistory': AzureOcrProcessedHistory,

//     "PersonalDashboard": PersonalDashboard,
//     "PersonalShare": PersonalShare,
//     "PersonalShareExternal": PersonalShareExternal,
//     "PersonalShareInternalMe": PersonalShareInternalMe,
//     "PersonalShareInternalOther": PersonalShareInternalOther,
//     "PersonalPredefinedSearch": PersonalPredefinedSearch,
//     "PersonalWorkflowCreate": PersonalWorkflowCreate,
//     "PersonalWorkflow": PersonalWorkflow,
//     "PersonalSearchHistory": PersonalSearchHistory,
//     "PersonalSearchRecentDoc": PersonalSearchRecentDoc,
//     "PersonalCaseCreate": PersonalCaseCreate,
//     "PersonalCase": PersonalCase
}
