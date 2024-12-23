interface BrowseListProvider {
    getchildApi:(pageParams:any) => Promise<any>
    idOrPath: Ref<string, string>,
    changeRoute:(path:string) => void
}

export const BrowseListProviderKey : InjectionKey<BrowseListProvider> =  Symbol('BrowseListProvider')

