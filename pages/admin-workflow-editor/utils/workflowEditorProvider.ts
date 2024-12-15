import type { InjectionKey } from '#imports';


interface WorkflowEditorListProvider {
    getListApi:(pageParams:any) => Promise<any>
    openProductionVersion:(data:any) => void
    openLastestVersion:(data:any, openInNewTab?:boolean) => void
    openVersions:(data:any) => void
    saveAsNewWorkflow:(data:any) => void
    createNewWorkflow:() => void
}

export const WorkflowEditorListProviderKey: InjectionKey<WorkflowEditorListProvider> = Symbol('workflowEditorListProvider');

interface WorkflowEditorVersionListProvider {
    getListApi:(pageParams:any) => Promise<any>
    editNewTabHandler:(row:any) => void
    editHandler:(row:any) => void
    actionPermission:(row:any, index:number, code:string) => {disabled:boolean, visible:boolean}
}

export const WorkflowEditorVersionListProviderKey: InjectionKey<WorkflowEditorVersionListProvider> = Symbol('workflowEditorVersionListProvider');