

export const newWorkflowEditorList = function() {
    return {
        id:'workflow-editor_' + new Date().getTime(),
        name: 'workflow-editor-list',
        label: "Workflow Editor",
        icon: "dp-icon:flow-outline",
        hoverIcon: "dp-icon:flow-fill",
        component: "LazyWorkflowEditorList",
        props:{}
    } as TabItem
}

export type NewWorkflowVersionListParams = {
    id:string,
    draftId:string,
    name:string
    latestVersion:string
    productionVersion:string
    [key:string]:any
}
export const newWorkflowEditorVerionList  = function(params:NewWorkflowVersionListParams){
    return {
        id: "workflow-editor-versions-" + new Date().getTime(),
        name: "workflow-editor-versions-" + params.id,
        icon: 'dp-icon:flow-outline',
        label: params.name,
        component: 'LazyWorkflowEditorVersion',
        props: {
            id: params.id,
            draftId: params.draftId || params.id,
            latestVersion: params.latestVersion,
            productionVersion: params.productionVersion,
            name: params.name,
            item: params,
        }
    } as TabItem
}

export type NewWorkflowVersionDetailParams = {
    id:string,
    draftId:string,
    name:string
    versionNumber:string
    [key:string]:any
}
export const newWorkflowEditorDetail = function(params:NewWorkflowVersionDetailParams){
    return {
        id: "workflow-editor-detail-" + new Date().getTime(),
        name: "workflow-editor-detail-" + params.id,
        icon: 'dp-icon:flow-outline',
        label: params.name,
        component: 'LazyWorkflowEditorDetail',
        props: {
            id: params.id,
            draftId: params.draftId,
            currentVersion: params.versionNumber,
            name: params.name,
            item: params,
        }
    } as TabItem
}