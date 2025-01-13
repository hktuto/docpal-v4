import type { InjectionKey } from "vue"

interface SearchPageProvider {
    saveSearch : (data:any) => Promise<void>
    search: (params:any) => Promise<any[]>
    openDetail: (row:any) => void,
    paramsUpdate:(params:any) => void,
    conditions: Ref<any>
    aggregation: Ref<any>
}

export const SearchListProviderKey: InjectionKey<SearchPageProvider> = Symbol('SearchPageProvider')