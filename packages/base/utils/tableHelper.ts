import { tableSetting } from './../../../apps/superAdmin/components/global/tableSetup/demo';


import { clientApi, adminApi } from "api"
import type { V } from "vitest/dist/chunks/environment.C5eAp3K6.js"
import type { VxeGridProps, VxeGridListeners } from 'vxe-table'
export type TableConfig = {
    api?:Function,
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
            enabled: false,
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
                    result: Array.isArray(data) ? data : data.entryList,
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
    const config = {
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
            drag: true,
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
        ...optional
    }
    if(!!api) {
        config.proxyConfig = {
            sort: false,
            ajax: {
              query: async(params:any) => {
                // lazy load 的 table 不用傳 page, 應在多面板中傳
                const entryList = await api()
                return entryList
              }
            }
        }
    }
    return config
}


type Actions = {
    code: string,
    name: string,
    children?: Actions[],
    action: (row:any) => void
}

type CreateTableActionParams = {
    tableConfig:VxeGridProps, 
    tableEvent:VxeGridListeners, 
    dblClickAction:({row, column, event}:any) => void,
    actions:Actions[], 
    visibleMethod:({options, column, row, rowIndex}:any) => boolean
}
export const createTableActions = (
    {
        tableConfig, 
        tableEvent,
        dblClickAction,
        actions, 
        visibleMethod
    }:CreateTableActionParams , 
    optional?:any // optional params for future use
    ) => {
    // step 1 add actions column to tableConfig
        const actionsColumn:any = {
            title: 'dpTable_actions',
            fixed:'right',
            width: 60,
            type: 'html',
            formatter: ({ row }:any) => {
                return `<img src="/icons/dots.svg" style="width: 1.2rem; height: 1.2rem; cursor: pointer;" />`
            }
        };
        if(!tableConfig.columns || tableConfig.columns.length === 0) {  
            tableConfig.columns = [actionsColumn]
        }else{
            tableConfig.columns.push(actionsColumn)
        }
    // step 2 add actions to tableEvent
        tableEvent.cellDblclick = ({ row, column, event }:any) => {
            dblClickAction({ row, column, event })
        }
        if(actions && actions.length > 0) {
            tableEvent.menuClick = ({menu, row, column}:any) => {
                console.log("menu click", menu)
                if(menu.action){
                    menu.action(row);
                }
            }
            tableConfig.menuConfig = {
                body: {
                    options: [actions]
                },
                visibleMethod
            }
        }
        
}