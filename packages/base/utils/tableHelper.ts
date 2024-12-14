// import {useUserPreference} from '#imports'

import { clientApi, adminApi } from "api"
import type { V } from "vitest/dist/chunks/environment.C5eAp3K6.js"
import type { VxeGridProps } from 'vxe-table'
export type TableConfig = {
    api:Function,
    id:string,
    columns:any[]
    formConfig?:any
    toolbarConfig?:any
}

export const createTableConfig = ({
    id, api, columns, formConfig, 
    toolbarConfig= {
        custom:true,slots: {
            buttons: 'toolbar_buttons'
        }
    },
    }:TableConfig,optional:VxeGridProps = {}):VxeGridProps => {

    // @ts-ignore
    const perference = useUserPreference()
    return {
        id,
        border: true,
        round: true,
        showOverflow: true,
        height: 'auto',
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
            pageSize: 20
        },
        proxyConfig: {
            sort: true,
            ajax: {
              query: async({ page, sorts }:any) => {
                // 默认接收 Promise<{ result: [], page: { total: 100 } }>
                let params:any = {
                    pageSize:page.pageSize, pageNum:page.currentPage - 1
                }
                if(sorts && sorts.length > 0) {
                    params.orderBy = sorts[0].property
                    params.isDesc = sorts[0].order === "desc"
                }
                const {data} = await api(params)
                return {
                    result: data.entryList,
                    page: {
                        total: data.totalSize
                    }
                }
              }
            }
        },
        ...optional
    }
}

export type TableConfigWithPagerParams = {
    id: string,
    apiString:string,
    columns:any[],
    saveColumnConfig?:boolean
    actions: TableActions[],
    additionConfig ?: VxeGridProps
}

export type TableActions = {
    code: string,
    name: string,
    visible: boolean,
    disabled: boolean,
    action: string,
}
export const createGridConfigWithPager = (
    {
        id,
        apiString,
        columns,
        saveColumnConfig = true,
        additionConfig ={}
    }: TableConfigWithPagerParams
) => {

    const baseConfig:VxeGridProps = {
        id,
        border: true,
        round: true,
        showOverflow: true,
        height: 'auto',
        toolbarConfig: {
            custom:true,
            slots: {
                buttons: 'toolbar_buttons'
            }
        },
        columnConfig: {
            resizable: true,
            useKey: true,
            drag: true
        },
        columns,
        pagerConfig: {
            pageSize: 20
        },
        proxyConfig: {
            sort: true,
            ajax: {
              query: async({ page, sorts }:any) => {
                console.log('page', page)
                // 默认接收 Promise<{ result: [], page: { total: 100 } }>
                let params:any = {
                    pageSize:page.pageSize, pageNum:page.currentPage - 1
                }
                if(sorts && sorts.length > 0) {
                    params.orderBy = sorts[0].property
                    params.isDesc = sorts[0].order === "desc"
                }
                try{
                    // apiString is a function from clientApi or adminApi
                    // eg: adminApi.workflowProcessDefinitionController.postPage
                    // eg: clientApi.nuxeoUserController.getUser
                    let api:any;
                    let fn;
                    if(apiString.indexOf('clientApi') > -1){
                        api = clientApi
                    }else{
                        api = adminApi
                    }
                    // loop apiString to get the function name
                    const apiStringArr = apiString.split('.')
                    fn = api[apiStringArr[1]][apiStringArr[2]]
                    const {data} = await fn(params)
                       
                    return {
                        result: data.entryList,
                        page: {
                            total: data.totalSize
                        }
                    }
                    
                }catch(err){
                    console.log('err', err)
                    return {
                        result: [],
                        page: {
                            total: 0
                        }
                    }
                }   
              }
            }
        },
    }
    if(saveColumnConfig){
        const perference = useUserPreference()
        baseConfig.customConfig = {
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
        }
    }
    return {
        tableConfig: Object.assign(baseConfig, additionConfig),
    }
}
