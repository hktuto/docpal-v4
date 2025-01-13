import type { InjectionKey } from "vue"

interface SearchPageProvider {
    saveSearch : (data:any) => Promise<void>
    search: (params:any) => Promise<void>
    conditions: Ref<any>
}

export const SearchListProviderKey: InjectionKey<SearchPageProvider> = Symbol('SearchPageProvider')