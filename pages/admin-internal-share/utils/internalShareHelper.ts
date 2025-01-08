interface InternalShareProvider {
    getListApi: (params:any) => Promise<any>,
    actionPermission: (params:PermissionMethodParams) => {visible:boolean, disabled:boolean}
    deleteAction: (row:any) => Promise<any>
}

export const InternalShareProviderKey: InjectionKey<InternalShareProvider> = Symbol('InternalShareProviderKey')
