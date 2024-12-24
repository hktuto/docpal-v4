import { join } from 'path';
// import {useUserPreference} from '#imports'

import { clientApi, adminApi } from "api"
import type { V } from "vitest/dist/chunks/environment.C5eAp3K6.js"
import type { VxeGridProps } from 'vxe-table'
export type TableConfig = {
    api:Function,
    id:string,
    columns:any[],
    sort?:boolean,
    filter?:boolean,
    formConfig?:any,
    pageSize?:number,
    toolbarConfig?:any
}

export const createTableConfig = ({
    id, api, columns, formConfig, 
    sort=true,
    filter=false,
    pageSize=20,
    toolbarConfig= {
        custom:true,
        slots: {
            buttons: 'toolbar_buttons'
        }
    },
    }:TableConfig,optional:VxeGridProps = {}):VxeGridProps => {

    // @ts-ignore
    const perference = useUserPreference()
    const config:VxeGridProps = {
        id,
        border: true,
        round: true,
        stripe: true,
        showOverflow: true,
        height: 'auto',
        toolbarConfig: toolbarConfig,
        columnConfig: {
            resizable: true,
            useKey: true,
            drag: true
        },
        scrollY: {
            enabled: true,
            gt: 0
          },
        customConfig: {
            storage: true,
            restoreStore ({ id }) {
                if(perference.value && perference.value.tableSettings && perference.value.tableSettings[id]) {
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
        sortConfig: {
            remote: sort,
            defaultSort:[]
          },
          filterConfig: {
            remote: filter
          },
        columns,
        pagerConfig: {
            pageSize
        },
        proxyConfig: {
            sort,
            filter, 
            ajax: {
              query: async(args:any) => {

                console.log("params", args)
                const { page, sorts, filters } = args
                // 默认接收 Promise<{ result: [], page: { total: 100 } }>
                let params:any = {
                    pageSize:page.pageSize, pageNum:page.currentPage - 1
                }
                if(sorts && sorts.length > 0) {
                    params.orderBy = sorts[0].property
                    params.isDesc = sorts[0].order === "desc"
                }
                if(filters && filters.length > 0) {
                    if(!params.filter) params.filter = {}
                    filters.forEach( (filter:any) => {
                        params.filter[filter.property] = filter.datas.join(',')
                    })
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
    return config
}

export const createLazyLoadTableConfig = ({
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
        stripe: true,
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
            enabled: false,
        },
        scrollY: {
            enabled: true,
            gt: 100
          },
        proxyConfig: {
            sort: false,
            ajax: {
              query: async(params:any) => {
                // lazy load 的 table 不用傳 page, 應在多面板中傳
                const entryList = await api()
                return entryList
              }
            }
        },
        ...optional
    }
}
