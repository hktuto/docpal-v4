


interface BulkImportListProvide {
    getListApi: (params:any) => Promise<any>
    handelDblclick:(row:any) => void
    handelDelete:(row:any) => void
    permissionMethod: (params:PermissionMethodParams) => any
}

export const BulkImportListProviderKey : InjectionKey<BulkImportListProvide> = Symbol('contextmenuList')

export const newBulkImportDetail = (data:any):TabItem => {
    return {
        id: 'bulk-import-detail-' + data.documentType + '-' + new Date().getTime(),
        name: 'bulk-import-detail-' + data.documentType,
        label: data.documentType,
        icon : 'flowbite:file-import-outline',
        component: 'LazyBulkImportDetail',
        props:{
            documentType:data.documentType,
            item:data
        }
    }
}