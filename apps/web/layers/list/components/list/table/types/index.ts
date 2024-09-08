export type ListSchema = {
    id: string,

}

export type listOptions = {
    multipleSelect: {
        enable: boolean,
        actions?: actionItem[]
    },
    itemClick: {
        enable:boolean,
    }
    filters: {
        enable:boolean,
    },
    lazyLoad: {
        enable: boolean,
    }
    
}



type actionItem = {

}