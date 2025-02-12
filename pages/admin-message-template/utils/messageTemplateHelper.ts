
export type RowData = {
    id: string
    templateName: string
    usage: [''], // which workflow is using this template
    whatsAppStatus: string,
    createdBy: string,
    language: string,
    modifiedBy: string,
    modifiedDate: string,
}

interface MessageTemplateProvider {
    getListApi: (params:any) => Promise<any>,
    openDetail: (row:any) => void,
    openTemplate: (row:any) => void,
    duplicate: (row:any) => void,
    delete: (row:any) => void,
}

export const MessageTemplateProviderKey: InjectionKey<MessageTemplateProvider> = Symbol('whatsppSetting')

export const newMessageTemplateList = () => {
    return {
        id: "admin-message-template",
        name: 'admin-message-template',
        label: "adminMenu.messageTemplate",
        icon: "lucide:message-circle-code",
        hoverIcon: "lucide:message-circle-code",
        component: "MessageTemplateList",
        props: {
            id: ""
        },
    }
}

export const newMessageTemplateDetailPageRoute = (row:RowData) => {
    const newItem:TabItem = {
        id:"admin-message-template-detail",
        name:"admin-message-template-detail-" + row.id,
        label: "adminMenu.messageTemplate",
        icon: "lucide:message-circle-code",
        component: "LazyMessageTemplateDetail",
        props:{
            id: row.id
        }

    }
    return newItem
}

export const newMessageTemplateTemplatePageRoute = (row:RowData) => {
    const newItem: TabItem = {
        id: "admin-message-template-template",
        name: "admin-message-template-template-" + row.id,
        label: "adminMenu.messageTemplate",
        icon: "lucide:message-circle-code",
        component: "MessageTemplateEditTemplate",
        props: {
            id: row.id
        }
    }
    return newItem
}