import type { InjectionKey } from "vue"

interface SearchPageProvider {
    getListApi : (params:any) => Promise<any>
}

export const SearchListProviderKey: InjectionKey<SearchPageProvider> = Symbol('SearchPageProvider')