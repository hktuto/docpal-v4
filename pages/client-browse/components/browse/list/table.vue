<script lang="tsx" setup>
import {BrowseListProviderKey} from '#imports'
import {Grid, type VxeGridInstance, type VxeGridListeners} from 'vxe-table'
import { createLazyLoadTableConfig } from '../../../../../packages/base/utils/tableHelper';

const listProvider = inject(BrowseListProviderKey);
if(!listProvider) {
    throw new Error('BrowseListProviderKey not found')
}
const tableRef = ref<VxeGridInstance<any>>()
const tableContainer = ref<HTMLElement>()
async function loadData(entry:any[], path?:string, pageNum:number = 0) {
    const {data} = await listProvider?.getchildApi({idOrPath: path, pageSize:1000, pageNum})
    entry.push(...data.entryList)
    if(data.isNextPageAvailable) {
        return loadData(entry, path, pageNum + 1)
    }else{
        return entry
    }
}
const { tableConfig, tableEvent } = useVxeTable({
    id: 'browseTableSetting',
    api: (pageParams:any) => loadData([], listProvider.idOrPath.value || '/'),
    columns:  [
        {
            type: 'checkbox',
            fixed: 'left',
            width:50,
        },
        {
            field: 'name',
            title: 'Name',
            minWidth: 60,
            treeNode: true,
            sortable: true
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
    virtualScroll: true,
    remoteSort: false,
    remoteFilter: false,
    dblClickAction: ({ row, column, event }) => {
            if(row.isFolder) {
                listProvider.changeRoute(row.path)
            }
    },
    bodyActions: [
        [
            {
                code: 'open',
                name: 'Open',
                action: (row:any) => {
                    if(row.isFolder) {
                        listProvider.changeRoute(row.path)
                    }
                }
            },
            {
                name: "subnmenu",
                children: [
                    {
                        code: 'edit',
                        name: 'Edit',
                        action: (row:any) => {
                            console.log("edit", row)
                        }
                    },
                    {
                        code: 'delete',
                        name: 'Delete',
                        action: (row:any) => {
                            console.log("delete", row)
                        }
                    }
                ]
            }
        ]
    ],
    visibleMethod: ({options, column, row, rowIndex}:any) => {
        console.log(options, column, row, rowIndex)
        return true
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
    optionalEvent:{
        checkboxChange:({ row, column, rowIndex }) => {
            console.log("check box change", row, column, rowIndex)
        },
    }
})



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
        tableRef.value.toggleAllCheckboxRow();
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
})

</script>


<template>
<div ref="tableContainer" class="tableContainer">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        <template #actions="{row}">
            <SvgIcon src="/icons/dots.svg"></SvgIcon>
        </template>
    </VxeGrid>
</div>
</template>

<style lang="scss" scoped>
.tableContainer{
    height: 100%;
    position: relative;

}
</style>