interface DocumentTemplateProvider {
    getListApi: (params:any) => Promise<any>,
}

export const DocumentTemplateProviderKey: InjectionKey<DocumentTemplateProvider> = Symbol('DocumentTemplateProviderKey')
