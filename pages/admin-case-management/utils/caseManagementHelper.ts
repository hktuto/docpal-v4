
export interface CaseManagementListProvider {
    getListApi: (params:any) => Promise<any>
    updatePageParams:(params:any) => void
    openLatestVersion:(data:any, openInNewTab?:boolean) => void
    openProductionVersion:(data:any, openInNewTab?:boolean) => void
    actionPermission:(row:any, code:string) => {visible:boolean, disabled:boolean}
    openVersion:(data:any, openInNewTab?:boolean) => void
}
export const CaseManagementListProviderKey : InjectionKey<CaseManagementListProvider> = Symbol('caseManagementListProvider')

export interface CaseManagementVersionProvider {
    getListApi: (id:string) => Promise<any>
    saveAsNewVersion:(data:any) => void
    promoteVersion:(data:any) => void
    openVersionDetail:(data:any, openInNewTab?:boolean) => void
    actionPermission:(row:any, code:string) => {visible:boolean, disabled:boolean}
}
export const CaseManagementVersionProviderKey : InjectionKey<CaseManagementVersionProvider> = Symbol('caseManagementVersionProvider')

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

export const newCaseManagementDetail = function(data:any, version:string) {
    return {
        id: "case-management-detail-" + new Date().getTime(),
        name: "case-management-detail-" + data.caseTypeId,
        icon: 'dp-icon:case-outline',
        label: data.name,
        component: 'LazyCaseManagementDetail',
        props: {
            caseTypeId: data.caseTypeId,
            currentVersion: version,
            name: data.name,
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