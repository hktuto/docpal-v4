interface BrowseListProvider {
    getchildApi:(pageParams:any) => Promise<any>
    idOrPath: Ref<string, string>,
    changeRoute:(path:string) => void
    addToSelection:(items: any[]) => void
    removeFromSelection:(items: any[]) => void
}

export const BrowseListProviderKey : InjectionKey<BrowseListProvider> =  Symbol('BrowseListProvider')

