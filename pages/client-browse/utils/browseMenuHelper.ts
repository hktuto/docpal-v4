
export type BrowseDetailPageParams = {
    id: string,
    docName: string,
    showHeaderAction: boolean,
    [key:string]: any
}
export function createDetailPageParams(params:BrowseDetailPageParams){
    return {
        id: 'client-browse-detail' + '-' + params.id,
        name: 'client-browse-detail' + '-' + params.id,
        label: params.docName,
        component: 'ClientBrowseDetail',
        props: {
            idOrPath: params.id,
            ...params
        }
    }
}