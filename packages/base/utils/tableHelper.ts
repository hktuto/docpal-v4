// import {useUserPreference} from '#imports'

import { clientApi } from "api"
import type { VxeGridProps } from 'vxe-table'
export type TableConfig = {
    api:Function,
    id:string,
    columns:any[]
    formConfig?:any
    toolbarConfig?:any
    menuConfig?:any
}

export const createTableConfig = ({
    id, api, columns, formConfig, 
    toolbarConfig= {
        custom:true,slots: {
            buttons: 'toolbar_buttons'
        }
    },
    menuConfig
    }:TableConfig):VxeGridProps => {

    // @ts-ignore
    const perference = useUserPreference()
    return {
        id,
        border: true,
        showOverflow: true,
        toolbarConfig: toolbarConfig,
        columnConfig: {
            resizable: true,
            useKey: true,
                drag: true
        },
        customConfig: {
            storage: true,
            restoreStore ({ id }) {
                if(perference.value.tableSettings && perference.value.tableSettings[id]) {
                    return perference.value.tableSettings[id]
                }
            },
            updateStore ({ id, storeData }) {
                if(!perference.value.tableSettings) perference.value.tableSettings = {}
                perference.value.tableSettings[id] = storeData
                // save perference
                return clientApi.nuxeoUserController.putSetting(perference.value)
            }
        },
        columns,
        pagerConfig: {
            pageSize: 15
        },
        proxyConfig: {
            ajax: {
              query: async({ page }:any) => {
                // 默认接收 Promise<{ result: [], page: { total: 100 } }>
                const {data} = await api({pageSize:page.pageSize, pageNum:page.currentPage - 1})
                return {
                    result: data.entryList,
                    page: {
                        total: data.totalSize
                    }
                }
              }
            }
        },
        formConfig: formConfig || {},
        menuConfig: menuConfig || {}
    }
}

function getColumnSetting(columnId:string) {

}

function setColumnSetting(id:string, storeData:any) {

}