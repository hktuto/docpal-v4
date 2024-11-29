
// setting type
export type ListSetting = {
    api: {
        url: string,
        method: 'get' | 'post' | 'put' | 'delete'
        params?: any
        data?: any
    },
    columns:ColumnSetting[]
    actions:ActionSetting[]
}

export type ColumnSetting = {
    key: string
    name: string
    dataType : 'string' | 'number' | 'date' | 'boolean' | 'cast' | 'masterTable' | 'workflow',
    sortable: boolean,
    filterable: boolean,
}

export type ActionSetting = {
    code: string
    name: string
    function: ({row, rowIndex}:any) => void
}


// render type 
export type ListData = {
    api: {
        url: string,
        method: 'get' | 'post' | 'put' | 'delete'
        params?: any
        data?: any
    }
    defaultSort?: {
        field: string
        order: 'asc' | 'desc'
    }
    columns:TableColumn[]
    actions:TableAction[]
}

export type TableCellFormatterParmas = {cellValue:any}

export type TableColumn = {
    key: string
    name: string
    dataType : 'string' | 'number' | 'date' | 'boolean' | 'cast' | 'masterTable' | 'workflow',
    sortable: boolean,
    filterable: boolean,
    width?: number,
    minWidth?: number,
    fixed: 'left' | 'right' | 'none',
    formatter?: ({cellValue}:TableCellFormatterParmas) => any
    permission?: (key:string) => boolean 
}

export type TableAction = {
    code: string
    name: string
    permission:() => boolean
    function: ({row, rowIndex}:any) => void
}