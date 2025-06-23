interface BrowseListProvider {
    getchildApi:(pageParams:any) => Promise<any>
    idOrPath?: Ref<string, string>,
    docDetail: Ref<any>,
    docPermission?: Ref<any>,
    mode: Ref<'browse' | 'search'>,
    searchQuery: Ref<string>,
    changeRoute:(path:string) => void
    addToSelection?:(items: any[]) => void
    removeFromSelection?:(items: any[]) => void
    
}

export const BrowseListProviderKey : InjectionKey<BrowseListProvider> =  Symbol('BrowseListProvider')

