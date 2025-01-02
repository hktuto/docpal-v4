import { en } from 'element-plus/es/locales.mjs';


import { clientApi } from "api"
import { useViewport } from '#imports';
import type {TABLE_CONTEXT_PARAMS} from '#imports';
import type {  VxeGridProps, VxeGridListeners, VxeGridPropTypes, VxeTableDefines, VxeTablePropTypes, VxeGridInstance, VxeGridDefines  } from 'vxe-table'

export interface TableMenuActions extends VxeTableDefines.MenuChildOption {
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
    data: any[],
    menuConfig: {
        header: VxeTableDefines.MenuOptions,
        body: VxeTableDefines.MenuOptions,
        footer: VxeTableDefines.MenuOptions,
    }
}

export const useVxeTable = (params: UseVxeTableParams) => {
    // set Defalut value for params
    const { optionalConfig = {},  optionalEvent = {}, saveColumnOrder = true } = params
    
    const tableRef = ref<VxeGridInstance<any>>()
    const viewport = useViewport()
    const tableData = ref<any>([])
    const tablePageParams = ref<any>({
        currentPage: 1,
        pageSize: 20,
        total:0,
    })
    

    
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
            storage: saveColumnOrder,
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
            ajax:{
                query: loadData
            }
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
            className: 'contextMenuContainer',
            visibleMethod: params.visibleMethod
        },
        rowConfig:{
            useKey:true,
        },
        data:[],
    }, ...optionalConfig} as Config)

    const tableEvent = reactive<VxeGridListeners>(optionalEvent)


    // #region handle actions column
    
    // Step 1: add actions to tableEvent
    if(params.dblClickAction){
        tableEvent.cellDblclick = params.dblClickAction
    }
    
    // Step 2: handle body actions
    if(params.bodyActions && params.bodyActions.length > 0){
        console.log("bodyActions", params.bodyActions)
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
            console.log("column", column)
            if(column.type === actionsColumn.type && column.title === actionsColumn.title){
                console.log("actions")
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
        tableEvent.scroll = (scrollParams:VxeGridDefines.ScrollEventParams) => {
            const bus = useEventBus(EventType.TABLE_CONTEXT_MENU_CLOSE)
            bus.emit()
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

    async function loadData(args:any) {
        if(!params?.api) {
            throw new Error('params.api is required')
        }
        if(params.virtualScroll) {
            return await params?.api(args)  
        }
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
    async function responsiveScrollHandler({scrollTop, direction}:VxeGridDefines.ScrollEventParams){
        if(params.virtualScroll || !params.api || !viewport.isLessThan('tablet')){  
            console.log("scrollTop", viewport.isLessThan('tablet'))
            return;
        }
        // 不是 virtualScroll 或者 api 或者 大于 mobile 的时候不处理 scroll
        
        console.log("scrollTop", direction)
        if(direction === 'bottom') {
            // 向下滚动
            await lazyLoad()
        }

    }

    async function lazyLoad(){
        console.log("lazyLoad")
        if(tablePageParams.value.total && tablePageParams.value.total === tableConfig.data.length ) {
            console.log("no more data")
            return 
        }
        tableConfig.loading = true
        const data = await loadData({
            page: tablePageParams.value,
            sorts: [], // TODO : get sorts from config
            filters: [] // TODO : get filters from config
        })
        tableConfig.data.push(...data.result)
        tablePageParams.value.total = data.page.total
        tablePageParams.value.currentPage += 1
        tableConfig.loading = false
        console.log("data", tablePageParams)
    }

    function setupPagingnation(){
        tableConfig.pagerConfig = {
            enabled: params.virtualScroll? false : true,
            pageSize : params.pageSize || 20
        }
        tableConfig.proxyConfig.enabled = true;
    }
    function setupLazyLoad(){
        tableConfig.pagerConfig = {
            enabled: false,
        }
        tableConfig.proxyConfig.enabled = false;
        if(!tableEvent.scrollBoundary) {
            tableEvent.scrollBoundary = (scrollParams:VxeGridDefines.ScrollEventParams) => {
                responsiveScrollHandler(scrollParams)
            }
        }
        // @ts-ignore
        tableConfig.scrollY = {
            enabled: true,
            threshold: params.pageSize || 20
        };
        tableConfig.data = [];
        tablePageParams.value.pageNum = 0;
        tablePageParams.value.total = undefined;
        tablePageParams.value.pageSize = params.pageSize || 20;
        lazyLoad()
    }

    watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
        if(viewport.isLessThan('tablet')){
            // 如果不是 virtualScroll,
            if(!params.virtualScroll && params.api) {
                setupLazyLoad()
            }
            // mobile setting for table
            return
        }
        if(viewport.isGreaterThan('mobile')){
            // desktop setting for table
            setupPagingnation()
            tablePageParams.value = {
                currentPage: 1,
                pageSize: params.pageSize || 20,
                total:undefined,
            }
            // reload()
            return
        }
    }, {
        immediate: true
    })

    function reload(){
        console.log("reload")
        tableRef.value?.commitProxy('reload')
    }

    function query(params:any){
        tableRef.value?.commitProxy('query', params)
    }

    // #endregion
    return {
        tableConfig,
        tableEvent,
        tableRef,
        reload, 
        query
    }
}