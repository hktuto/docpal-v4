import { Graph } from '@antv/x6';

import type {PermissionMethodParams} from '#imports';
export interface CaseManagementListProvider {
    getListApi: (params:any) => Promise<any>
    updatePageParams:(params:any) => void
    openLatestVersion:(data:any, openInNewTab?:boolean) => void
    openProductionVersion:(data:any, openInNewTab?:boolean) => void
    actionPermission:(args:PermissionMethodParams) => {visible:boolean, disabled:boolean}
    openVersion:(data:any, openInNewTab?:boolean) => void
    saveAsNewCase:(data:any) => void
}
export const CaseManagementListProviderKey : InjectionKey<CaseManagementListProvider> = Symbol('caseManagementListProvider')

export interface CaseManagementVersionProvider {
    getListApi: (id:string) => Promise<any>
    saveAsNewVersion:(data:any) => void
    promoteVersion:(data:any) => void
    openVersionDetail:(data:any, openInNewTab?:boolean) => void
    actionPermission:(args:PermissionMethodParams) => {visible:boolean, disabled:boolean}
}
export const CaseManagementVersionProviderKey : InjectionKey<CaseManagementVersionProvider> = Symbol('caseManagementVersionProvider')

export interface CaseManagementDetailProvider {
    caseData: any,
    caseInfo: Ref<any>,
    currentVersionId: Ref<string>,
    currentVersion: Ref<string>
}

export const CaseManagementDetailProviderKey : InjectionKey<CaseManagementDetailProvider> = Symbol('caseManagementDetailProvider')


export interface CaseManagementEditorProvider {
    readOnly: Ref<boolean>,
    graph: Ref<Graph | null>,
    allInfo: Ref<any[]>
    versionId: Ref<string>
}
export const CaseManagementEditorKey: InjectionKey<CaseManagementEditorProvider> = Symbol('caseManagementEditorKey')


export const newCaseManagementListLink = (data:any) => {
    return {
        id: "case-management-list-" + new Date().getTime(),
        name: "case-management-list",
        icon: 'dp-icon:case-outline',
        label: data.name,
        component: 'LazyCaseManagementList',
        props: {
            pageNum: data.pageNum || 0,
            pageSize: data.pageSize || 20,
            orderBy: data.orderBy || "",
            isDesc: data.isDesc || false,
        }
    } as TabItem
}

export type NewCaseDashboardParams = {
    id: string,
    name: string,
}
export const newCaseDashboardLink = (data:any) => {
    
    return {
        id: "case-dashboard-list-" + new Date().getTime(),
        name: "case-dashboard-" + data.id,
        icon: 'dp-icon:case-outline',
        label: data.name,
        component: 'LazyCaseManagementDashboard',
        props: {
            id:data.id,
            caseTypeId: data.caseTypeId,
            name: data.name,
        }

    }
}

export const newCaseManagementDetail = function(versionId:string, name:string, version:string) {
    return {
        id: "case-management-detail-" + new Date().getTime(),
        name: "case-management-detail-" + versionId,
        icon: 'dp-icon:case-outline',
        label: name,
        component: 'LazyCaseManagementDetail',
        props: {
            caseTypeId: versionId,
            currentVersion: version,
            name,
        }
    } as TabItem
}

export function caseSaveAs(caseData:any, version:string, newCaseName:string) {
     // TODO : save as case logic
}

export const newCaseManagementVersionList = function(data:any, version:string) {
    return {
        id: "case-management-version-list-" + new Date().getTime(),
        name: "case-management-version-list-" + data.id,
        icon: 'dp-icon:case-outline',
        label: data.name,
        component: 'LazyCaseManagementVersion',
        props: {
            caseTypeId: data.id,
            name: data.name,
        }
    } as TabItem
}

export function newCaseManagementEditor(caseTypeId:string, name:string, version:string, versionId:string) {
    return {
        id: 'case-management-editor-' + new Date().getTime(),
        name: 'case-management-editor-' + caseTypeId,
        icon: 'dp-icon:case-outline',
        label: 'caseManagement.title',
        component: 'LazyCaseManagementEditor',
        props: {
            caseTypeId,
            name,
            currentVersion: version,
            versionId
        }
    }
}


export function saveAllCaseFromToNewVersion(oldversionId:string, newversionId:string, cmmnJson:any) {
    // TODO : get all human task from cmmn and try to get form from api. if form exist, then save it to new version
    
}
