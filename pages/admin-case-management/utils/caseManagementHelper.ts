export interface CaseManagementListProvider {
    getListApi: (params:any) => Promise<any>
    updatePageParams:(params:CaseManagementListPageProps) => void
    openLatestVersion:(data:any, openInNewTab?:boolean) => void
    openProductionVersion:(data:any, openInNewTab?:boolean) => void
    actionPermission:(row:any, code:string) => {visible:boolean, disabled:boolean}
}

export type CaseManagementListPageProps = {
    pageNum: number,
    pageSize: number,
    orderBy?: string,
    isDesc: boolean,
}
export const NewCaseManagementListLink = (data:any) => {
    const props: CaseManagementListPageProps = {
        pageNum: data.pageNum || 0,
        pageSize: data.pageSize || 20,
        orderBy: data.orderBy || "",
        isDesc: data.isDesc || false,
    }
    return {
        id: "case-management-list-" + new Date().getTime(),
        name: "case-management-list",
        icon: 'dp-icon:case-outline',
        label: data.name,
        component: 'LazyCaseManagementList',
        props
    } as TabItem
}

export const CaseManagementListProviderKey : InjectionKey<CaseManagementListProvider> = Symbol('caseManagementListProvider')



export const newCaseManagementDetail = function(data:any, version:string) {
    return {
        id: "case-management-detail-" + new Date().getTime(),
        name: "case-management-detail-" + data.id,
        icon: 'dp-icon:case-outline',
        label: data.name,
        component: 'LazyCaseManagementDetail',
        props: {
            id: data.id,
            currentVersion: version,
            name: data.name,
        }
    } as TabItem
}

export function caseSaveAs(caseData:any, version:string, newCaseName:string) {
     // TODO : save as case logic
}