

import { clientApi } from "api"
import type {TABLE_CONTEXT_PARAMS} from '#imports';
import type {  VxeGridProps, VxeGridListeners, VxeGridPropTypes, VxeTableDefines, VxeTablePropTypes  } from 'vxe-table'

export interface TableMenuActions extends VxeTableDefines.MenuFirstOption {
    name:string,
    children?: TableMenuActions[],
    action?: (row:any) => void
}

export type TableMenuValidataMethod  = (params: {
    type?: string
    options: TableMenuActions[][]
    columns: VxeGridPropTypes.Columns,
    row?: any
    rowIndex?: number
    column?: VxeTableDefines.ColumnInfo
    columnIndex?: number
    event?: MouseEvent
  }) => TableMenuActions[][]
export interface UseVxeTableParams<R = any> {
    id:string,
    height?:string, // 'auto' | number
    api?:Function,
    remoteSort?:boolean,
    remoteFilter?:boolean,
    defaultSort?: { field: string, order: VxeTablePropTypes.SortOrder }[],
    columns:VxeGridPropTypes.Columns<R>,
    saveColumnOrder?:boolean,
    virtualScroll?:boolean,
    pageSize?:number,
    dblClickAction?:({row, column, event}:any) => void,
    headerActions?:TableMenuActions[][],
    footerActions?:TableMenuActions[][],
    bodyActions?:TableMenuActions[][],
    visibleMethod?: TableMenuValidataMethod,
    optionalConfig?: VxeGridProps<R>
    optionalEvent?: VxeGridListeners<R>
}

interface Config extends VxeGridProps {
    proxyConfig: VxeGridPropTypes.ProxyConfig
    menuConfig: {
        header: VxeTableDefines.MenuOptions,
        body: VxeTableDefines.MenuOptions,
        footer: VxeTableDefines.MenuOptions,
    }
}

export const useVxeTable = (params: UseVxeTableParams) => {
    const { optionalConfig = {},  optionalEvent = {}, saveColumnOrder = true } = params
    const tableConfig = reactive<Config>({...{
        id: params.id,
        border: true,
        round: true,
        stripe: true,
        showOverflow: true,
        height: params.height || 'auto',
        toolbarConfig:{
            custom: saveColumnOrder ,
            slots: {
                buttons: 'toolbar_buttons'
            }
        },
        columns: params.columns || [],
        columnConfig: {
            resizable: true,
            useKey: true,
            drag: true
        },
        scrollY: {
            enabled: params.virtualScroll || false,
        },
        pagerConfig: {
            enabled: params.virtualScroll? false : true,
            pageSize : params.pageSize || 20
        },
        customConfig: {
            enabled: saveColumnOrder,
            storage: true,
            restoreStore ({ id }) {
                // TODO : move useUserPreference to a composable to store and cache tabel config
                // @ts-ignore
                const perference = useUserPreference()
                if(perference.value && perference.value.tableSettings && perference.value.tableSettings[id]) {
                    return perference.value.tableSettings[id]
                }
            },
            updateStore ({ id, storeData }) {
                // TODO : move useUserPreference to a composable to store and cache tabel config
                // @ts-ignore
                const perference = useUserPreference()
                if(!perference.value.tableSettings) perference.value.tableSettings = {}
                perference.value.tableSettings[id] = storeData
                // save perference
                return clientApi.nuxeoUserController.putSetting(perference.value)
            }
        },
        sortConfig:{
            remote: params.remoteSort || false,
            defaultSort: params.defaultSort || []
        },
        proxyConfig:{
            enabled: params.api ? true : false,
            sort: params.remoteSort || false,
            filter: params.remoteFilter || false,
        },
        menuConfig:{
            header:{
                options: params.headerActions || []
            },
            body:{
                options: params.bodyActions || []
            },
            footer:{
                options: params.footerActions || []
            },
            className: 'contextMenuContainer'
        }
    }, ...optionalConfig} as Config)

    const tableEvent = reactive<VxeGridListeners>(optionalEvent)

    // handle api differnece between virtual scroll and normal scroll
    if(params.virtualScroll){
        if(!tableConfig.proxyConfig.ajax){
            tableConfig.proxyConfig.ajax = {}
        }
        tableConfig.proxyConfig.ajax = {
            query: async(queryParams:any) => {
                if(!params?.api) {
                    throw new Error('params.api is required')
                }
                return await params?.api(queryParams)   
            }
        }
    }else{
        if(!tableConfig.proxyConfig.ajax){
            tableConfig.proxyConfig.ajax = {}
        }
        tableConfig.proxyConfig.ajax = {
            query: async(args:any) => {
                if(!params?.api) {
                    throw new Error('params.api is required')
                }
                console.log("params", args)
                const { page, sorts, filters } = args
                // 默认接收 Promise<{ result: [], page: { total: 100 } }>
                let pageParams:any = {
                    pageSize:page.pageSize, pageNum:page.currentPage - 1
                }
                if(sorts && sorts.length > 0) {
                    pageParams.orderBy = sorts[0].property
                    pageParams.isDesc = sorts[0].order === "desc"
                }
                if(filters && filters.length > 0) {
                    if(!pageParams.filter) pageParams.filter = {}
                    filters.forEach( (filter:any) => {
                        pageParams.filter[filter.property] = filter.datas.join(',')
                    })
                }
                const {data} = await params?.api(pageParams)
                return {
                    result: Array.isArray(data) ? data : data.entryList,
                    page: {
                        total: data.totalSize
                    }
                }
              }
            }
    }

    // #region handle actions column
    
    // Step 1: add actions to tableEvent
    if(params.dblClickAction){
        tableEvent.cellDblclick = params.dblClickAction
    }
    
    // Step 2: handle body actions
    if(params.bodyActions && params.bodyActions.length > 0){
        tableEvent.menuClick = ({menu, row, column}:any) => {
            if(menu.action){
                menu.action({menu, row, column});
            }
        }
        tableConfig.menuConfig.body.options = params.bodyActions
        // add column to tableConfig
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
        // add click event to action column
        tableEvent.cellClick = ({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event}:any) => {
            if(column.type === 'html' && column.title === 'dpTable_actions'){
                if(!params.visibleMethod){
                    throw new Error('visibleMethod is required')
                }
                if(!params.bodyActions){
                    throw new Error('bodyActions is required')
                }
                if(!params.columns){
                    throw new Error('columns is required')
                }
                const bus = useEventBus(EventType.TABLE_CONTEXT_MENU_OPEN)
                const evtParams:TABLE_CONTEXT_PARAMS = {
                    row,
                    column,
                    rowIndex,
                    options: params.visibleMethod({
                        options: params.bodyActions, 
                        columns: params.columns,
                        row, 
                        rowIndex, 
                        column, 
                        columnIndex, 
                        event:$event
                    }),
                    event:$event
                }
                bus.emit(evtParams)
            }
        }
        tableEvent.scroll = ({ scrollTop }:any) => {
            const bus = useEventBus(EventType.TABLE_CONTEXT_MENU_CLOSE)
            bus.emit({
                scrollTop
            })
        }
    }
    // Step 3: handle header actions
    if(params.headerActions && params.headerActions.length > 0){
        tableConfig.menuConfig.header.options = params.headerActions
    }
    // Step 4: handle footer actions
    if(params.footerActions && params.footerActions.length > 0){
        tableConfig.menuConfig.footer.options = params.footerActions
    }
    // #endregion
        
    console.log("tableConfig", tableConfig)

    return {
        tableConfig,
        tableEvent
    }
}