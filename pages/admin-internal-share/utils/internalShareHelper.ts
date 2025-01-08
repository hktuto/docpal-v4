interface InternalShareProvider {
    getListApi: (params:any) => Promise<any>,
    actionPermission: (params:PermissionMethodParams) => {visible:boolean, disabled:boolean}
}

export const InternalShareProviderKey: InjectionKey<InternalShareProvider> = Symbol('InternalShareProviderKey')
