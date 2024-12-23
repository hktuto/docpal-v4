export interface CaseManagementListProvider {
    getListApi: (params:any) => Promise<any>
    updatePageParams:(params:CaseManagementListPageProps) => void
}
export type CaseManagementListPageProps = {
    pageNum: number,
    pageSize: number,
    sort: any,
    filters: any,
}
export const NewCaseManagementListLink = (data:any) => {
    const props: CaseManagementListPageProps = {
        pageNum: data.pageNum || 0,
        pageSize: data.pageSize || 20,
        sort: data.sort || {},
        filters: data.filters || {},
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