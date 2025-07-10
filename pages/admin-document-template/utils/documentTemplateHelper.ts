interface DocumentTemplateProvider {
    getListApi: (params:any) => Promise<any>,
    dblClickHandle: (row:any) => void,
    handleActive: (row:any, enable:boolean) => void,
    handleReplace: (row:any, openInNewTab?:boolean) => void,
    handleEdit: (row:any, openInNewTab?:boolean) => void,
    handleEditInfo: (row:any, openInNewTab?:boolean) => void,
    handleDelete: (row:any) => void,
    handleDownload: (row:any) => void,
    actionPermission: (args:PermissionMethodParams) => {visible:boolean, disabled:boolean}
}

export const DocumentTemplateProviderKey: InjectionKey<DocumentTemplateProvider> = Symbol('DocumentTemplateProviderKey')

export const navigateToTemplatePage= ()=>{
    return {
        id:"admin-document-template",
        name: 'document-template',
        label: "adminMenu.template",
        icon: "lucide:file-sliders",
        hoverIcon: "lucide:file-sliders",
        component: "LazyDocumentTemplatePage",
        feature: "GENERATE_TEMPLATE",
        props:{
            pageNum: 0,
            pageSize: 20,
            orderBy: 'createdDate',
            isDesc: true
        },
    }
}

export const createNewDocumentTemplateDetail = (data :any, isEdit :boolean) => {
    const newItem: TabItem = {
        id: "document-template-detail-" + new Date().getTime(),
        name: "document-template-detail-" + data.id,
        icon: 'lucide:file-sliders',
        label: data.name,
        component: 'LazyDocumentTemplateDetail',
        props: {
            id: data.id,
            name: data.name,
            item: data,
            isEdit: isEdit
        }
    }
    return newItem
}

export const ExtensionMimeTypeMap = {
    'PPT': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'Word': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'Excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'PDF': 'application/pdf'
}

export const ExtensionMap = {
    'Word': '.docx',
    'Excel': '.xlsx',
    'PPT': '.pptx',
    'PDF': '.pdf',
}
