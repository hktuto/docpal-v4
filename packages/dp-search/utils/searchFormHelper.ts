import type { searchGroup } from '~/typing/search'
let vformIndex = 1
const optionList = [
    { label: 'keyword', value: 'keyword' },
    { label: 'metadata', value: 'metadata' },
    { label: 'documentTypes', value: 'documentTypes' },
    { label: 'mimeTypes', value: 'mimeTypes' },
    { label: 'creators', value: 'creators' },
    { label: 'collections', value: 'collections' },
    { label: 'tags', value: 'tags' },
    { label: 'authors', value: 'authors' },
    { label: 'creatorGroups', value: 'creatorGroups' },
    { label: 'authorGroups', value: 'authorGroups' },
    { label: 'size', value: 'size' },
    { label: 'createdDate', value: 'createdDate' },
    { label: 'modified', value: 'modified' },    
    // { label: 'fileModified', value: 'fileModified' }
]


export const conditionTypeMap: any = {
    keyword: {
        type: 'string',
        label: 'keyword',
        option: {
            matchCase: true,
            fullMatch: true,
            synonyms: true,
            includeLanguages: []
        }
    },
    metadata: {
        type: 'metadata',
        label: 'metadata',
        option: {
            matchCase: true,
            fullMatch: true,
        }
    },
    documentTypes: {
        type: 'array',
        label: 'documentTypes',
        dataSource: 'documentTypes'
    },
    mimeTypes: {
        type: 'array',
        label: 'mimeTypes',
        dataSource: 'mimeTypes'
    },
    creators: {
        type: 'array',
        label: 'creators',
        dataSource: 'user'
    },
    collections: {
        type: 'array',
        label: 'collections',
        dataSource: 'collections'
    },
    tags: {
        type: 'array',
        label: 'tags',
        dataSource: 'tags'
    },
    authors: {
        type: 'array',
        label: 'authors',
        dataSource: 'user'
    },
    creatorGroups: {
        type: 'array',
        label: 'creatorGroups',
        dataSource: 'group'
    },
    authorGroups: {
        type: 'array',
        label: 'authorGroups',
        dataSource: 'group'
    },
    size: {
        type: 'string',
        label: 'size',
        dataSource: 'size'
    },
    createdDate: {
        type: 'string',
        label: 'createdDate',
        dataSource: 'date'
    },
    modified: {
        type: 'string',
        label: 'modified',
        dataSource: 'date'
    },
    fileModified: {
        type: 'string',
        label: 'fileModified',
        dataSource: 'date'
    }
}

export function getUniqueId(name: string) {
  return name + new Date().valueOf() + vformIndex++
}
export function generateGrid (coloption: any[] = [{ span:12 }, { span:12 }], widgetList: any[] = []) {
    const gridItemName = getUniqueId("grid-option-")
    const gridItem: any = {
        key: gridItemName,
        type: "grid",
        category: "container",
        icon: "grid",
        cols: [],
        option: {
            name: gridItemName,
            hidden: false,
            gutter: 12,
            colHeight: null,
            customClass: []
        },
        id: gridItemName
    }
    coloption.forEach((item, index) => {
        const gridColName = getUniqueId("grid-col-")
        const gridColItem = {
            type: "grid-col",
            category: "container",
            icon: "grid-col",
            internal: true,
            widgetList: [],
            option: {
                name: gridColName,
                hidden: false,
                ...item
            },
            id: gridColName
        }
        if(widgetList.length > 0 && widgetList[index]) item.widgetList = widgetList[index]
        gridItem.cols.push(gridColItem)
    })
    return gridItem
}
 
export function conditionDecorators(condition: searchGroup) {
  condition.query.forEach((query: any) => {
    query.id = getUniqueId('query')
    query.matchs.forEach((match: any) => {
      match.id = getUniqueId('matchs')
      if(match.queryType === 'metadata') {
        match.metadataKey = match.value.key
        if(isJSON(match.value.value)) {
          const json = JSON.parse(match.value.value)
          if(json.type === 'dateRange') {
            match.metadataValue = [json.from, json.to]
          }
        } else {
          match.metadataValue = match.value.value
        }
        console.log(match)
        match.queryType = 'metadata'
      } else {
        match[match.queryType] = match.value
      }
      if(match.option) {
        Object.keys(match.option).forEach((key) => {
          match[key] = match.option[key]
        })
      }
    })
  });
}

export function isJSON(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    // 转换出错，抛出异常
    return false;
  }
  return true;
}
