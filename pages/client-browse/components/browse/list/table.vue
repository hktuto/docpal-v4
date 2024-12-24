<script lang="ts" setup>
import {BrowseListProviderKey} from '#imports'
import type {VxeGridInstance} from 'vxe-table'
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

const gridSetting = reactive(createLazyLoadTableConfig({
    id: 'browseTableSetting',
    api: (pageParams:any) => loadData([], listProvider.idOrPath.value || '/'),
    columns:  [
        {
            type: 'checkbox',
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
                return mimeTypeToExtension(mimeType)
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
},{
    treeConfig: {
        transform: true,
        rowField: 'id',
        parentField: 'parentId',
        lazy:true,
        indent: 16,
        hasChildField:'isFolder',
        loadMethod: async(params) => {
            const entry = await loadAllChildren([], params.row.path)
            return entry
        }
    },
    checkboxConfig: {
        labelField: 'name',
        checkStrictly: true,
        showHeader: true
    },
    data:[]
}))

async function loadAllChildren(entry:any[] = [], path?:string, pageNum:number = 0) {
    gridSetting.loading = true
    const {data} = await listProvider?.getchildApi({idOrPath: path, pageSize:1000, pageNum})
    entry.push(...data.entryList)
    if(data.isNextPageAvailable) {
        return loadAllChildren(entry, path, pageNum + 1)
    }else{}
    gridSetting.loading = false
    // tableRef.value?.loadData([...gridSetting.data, ...entry])
    return entry
}
const gridEvent = {
    cellDblclick:({ row, column, rowIndex }) => {
        if(row.isFolder) {
            listProvider.changeRoute(row.path)
        }
    }
}

function changeRoute(){
    if(tableRef.value) {
        tableRef.value.commitProxy('reload')
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

</script>


<template>
<div ref="tableContainer" class="tableContainer">
    <VxeGrid ref="tableRef" v-bind="gridSetting" v-on="gridEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
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