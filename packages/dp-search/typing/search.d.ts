/***
 * 不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type
 */
declare namespace Search {
	interface suggestionOption {
        label: string,
        key: string,
        optionLabel: string,
        optionValue: string | any,
        children?: suggestionOption[]
    }
    interface optionItem {
        label: string | any,
        value?: string | number | boolean,
        children?: optionItem[]
    }
    interface conditionItem {
        name : string,
        label : string,
        filter? : boolean,
        keywords? : string[],
        max?: number,
        optionItems : optionItem[],
    }
    interface conditionMap {
        [name: string]: conditionItem
    }
}

export type searchGroup = {
    condition: 'or' | 'and',
    docId: string,
    query: searchGroupQuery[]
}
export type searchGroupQuery = {
    id: string,
    condition: 'or' | 'and',
    matchs: searchGroupQQ[]
}
export type searchGroupQQ = {
    queryType: 'keyword' | 'metadata' | 'documentTypes' | 'mimeTypes' | 'creators' | 'collections' | 'tags' | 'authors' | 'creatorGroups' | 'authorGroups' | 'size' | 'createdDate' | 'modified' | 'fileModified',
    value: string | string[] | {"key": string, 'value': string | number | date | array},
    type: 'string' | 'array' | 'metadata',
    id: string,
    option?:{
        matchCase?: boolean, // 是否区分大小写
        fullMatch?: boolean, // 是否全匹配
        synonyms?: boolean, // 是否启用同义词
        includeLanguages?: string[], // 启用的语言
    }
}


