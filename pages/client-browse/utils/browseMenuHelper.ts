export type BrowseListPageParams = {
    idOrPath: string,
    [key:string]: any
}
export function createBrowseListPageParams(params:BrowseListPageParams){
    return {
        id: 'client-browse',
        name: 'client-browse-' + params.idOrPath,
        icon: 'dp-icon:browse-outline',
        hoverIcon: 'dp-icon:browse-fill',
        label: "file_browse",
        component: "LazyBrowsePage",
        props:{
            idOrPath: params.idOrPath,
            filter:{}
        }
    }
}
export type BrowseDetailPageParams = {
    idOrPath: string,
    docName: string,
    showHeaderAction: boolean,
    [key:string]: any
}
export function createDetailPageParams(params:BrowseDetailPageParams){
    return {
        id: 'client-browse-detail' + '-' + params.idOrPath,
        name: 'client-browse-detail' + '-' + params.idOrPath,
        label: params.docName,
        component: 'LazyBrowseDetail',
        props: {
            ...params
        }
    }
}

export function createBrowseWatermarkPageParams(params:BrowseDetailPageParams){
    const {docId, docName} = params
    return {
        id: 'client-browse-watermark' + '-' + docId,
        name: 'client-browse-watermark' + '-' + docName,
        label: docName,
        component: 'LazyBrowseWatermark',
        props: {
            ...params
        }
    }
}