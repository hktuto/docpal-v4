<script lang="tsx" setup>
import {BrowseListProviderKey} from '#imports'
import {Grid, type VxeGridInstance, type VxeGridListeners} from 'vxe-table'

const listProvider = inject(BrowseListProviderKey);
const routerProvider = inject(MenuRouterKey)
if(!listProvider || !routerProvider) {
    throw new Error('BrowseListProviderKey not found')
}
const tableContainer = ref<HTMLElement>()
const emits = defineEmits(['selectedChange'])
async function loadData(entry:any[], path?:string, pageNum:number = 0) {
    const {data} = await listProvider?.getchildApi({idOrPath: path, pageSize:1000, pageNum})
    entry.push(...data.entryList)
    if(data.isNextPageAvailable) {
        return loadData(entry, path, pageNum + 1)
    }else{
        return entry
    }
}
const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
    id: 'browseTableSetting',
    api: (pageParams:any) => loadData([], listProvider.idOrPath.value || '/'),
    columns:  [
        {
            field: 'name',
            title: 'Name',
            minWidth: 120,
            treeNode: true,
            sortable: true,
            type:'html',
            formatter: ({ cellValue, row }:any) => {
                let icon = '/icons/doc/file.svg';
                if(row.isFolder){
                    icon = '/icons/doc/folder.svg';
                }
                return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue}</span>`
            }
        },
        {
            field: 'mimeType',
            title: 'mimeType',
            minWidth: 60,
            formatter: ({ cellValue }:any) => {
                return mimeTypeToExtension(cellValue)
            },
        },
        {
            field: 'documentType',
            title: 'documentType',
            minWidth: 120,
        },
        {
            field: 'fileSize',
            title: 'fileSize',
            formatter: ({ cellValue }:any) => {
                return formatFileSize(cellValue)
            },
        },
    ],
    customeToolBar:false,
    virtualScroll: true,
    remoteSort: false,
    remoteFilter: false,
    saveColumnOrder:false,
    dblClickAction: ({ row, column, event }) => {
        dblClickHandler(row)
    },
    bodyActions: [
        [
            {
                code: 'open',
                name: 'Open',
                action: ({row}:any) => {
                    dblClickHandler(row)
                }
            },
        ]
    ],
    permissionMethod: ({options, column, row, rowIndex}:any) => {
        return {
            visible: true,
            disabled: false
        }
    },
    selectChangeHander:(selectedRows:any[]) => {
        emits('selectedChange', selectedRows)
    },
    optionalConfig: {
        treeConfig: {
            transform: true,
            rowField: 'id',
            parentField: 'parentId',
            lazy:true,
            indent: 20,
            showLine: true,
            hasChildField:'isFolder',
            loadMethod: async(params) => {
                const entry = await loadAllChildren([], params.row.path)
                return entry
            }
        },
        checkboxConfig: {
            checkStrictly: true,
            showHeader: false,
            highlight: true,
            range: false,
        },
        rowConfig:{
            height: 60,
            isCurrent: true,
            isHover: true,
            useKey: true
        }
    },
})


function dblClickHandler(row:any) {
    if(row.isFolder) {
        listProvider.changeRoute(row.path)
    }else{
        // TODO : open dialog
        const params = createDetailPageParams({
            idOrPath: row.id,
            docName: row.name,
        })
        routerProvider?.navigateTo(params)
    }
}


async function loadAllChildren(entry:any[] = [], path?:string, pageNum:number = 0) {
    tableConfig.loading = true
    const {data} = await listProvider?.getchildApi({idOrPath: path, pageSize:1000, pageNum})
    entry.push(...data.entryList)
    if(data.isNextPageAvailable) {
        return loadAllChildren(entry, path, pageNum + 1)
    }
    tableConfig.loading = false
    // tableRef.value?.loadData([...tableConfig.data, ...entry])
    return entry
}


function changeRoute(){
    if(tableRef.value) {
        tableRef.value.commitProxy('reload')
    }
}


function selectAll(){
    if(tableRef.value) {
        tableRef.value.toggleAllCheckboxRow();
    }
}

function cleanSelected(){
    if(tableRef.value) {
        tableRef.value.setAllCheckboxRow(false);
        emits('selectedChange', [])
    }
}


watch(() => listProvider.idOrPath, ()=> {
  if(listProvider.idOrPath.value) {
    changeRoute()
  }
},{
  immediate: true,
  deep: true
})


defineExpose({
    selectAll,
    cleanSelected,
    reload
})

</script>


<template>
<div ref="tableContainer" class="tableContainer">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        <template #toolbarTools>
            <slot name="toolbarTools" />
        </template>
    </VxeGrid>
</div>
</template>

<style lang="scss" scoped>
.tableContainer{
    height: 100%;
    position: relative;
    
    &.selected{
        :deep(.vxe-buttons--wrapper){
            border-radius: var(--app-border-radius-m);
            overflow: hidden;
            background: var(--app-grey-900);
            padding-block: var(--app-space-xs);
            --vxe-ui-layout-background-color: var(--app-grey-900);
        }
    }
    :deep(.browseFileIcon){
        width: var(--app-space-m)
    }
    :deep(.browseNameCell){
        display: flex;
        align-items: center;
        gap: var(--app-space-s);
        cursor: pointer;
    }
}
</style>