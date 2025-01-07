<script lang="ts" setup>

const listProvider = inject(BulkImportListProviderKey)
if(!listProvider) {
    throw new Error('BulkImportListProviderKey is not provided')
}

const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
    id:'ADMIN_BULK_IMPORT',
    api: listProvider.getListApi,
    virtualScroll: true,
    remoteFilter: false,
    remoteSort: false,
    columns: [
        {
            title:'',
            width: 50,
            slots:{
                default: "icon"
            },
            fixed:'left',
        },
        {
            field: 'documentType',
            title: 'docType_documentType',

        },
        {
            title:'docType_metaMapping',
            slots:{
                default:'metaMapping'
            }
        },
        {
            title:'docType_captureProfile',
            slots:{
                default:'bulkImportConfig'
            }
        }

    ],
    bodyActions:[
       [ 
        {
            name: 'common_edit',
            action: ({row}:any) => listProvider.handelDblclick(row)    
        },
        {
            name: 'common_delete',
            action: ({row}:any) => listProvider.handelDelete(row)    
        },
        ]
    ],
    dblClickAction: ({row}:any) => listProvider.handelDblclick(row),
    permissionMethod: listProvider.permissionMethod
})

defineExpose({
    reload
})


</script>

<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent" >
        <template #toolbar_buttons>
            <slot name="toolbar_buttons"></slot>
        </template>
        <template #icon="{ row }">
            <BrowseItemIcon class="el-icon--left" :type="row.isFolder ? 'folder' : 'file'"/>
        </template>
        <template #metaMapping="{ row }">
                <el-tag class="el-icon--left" v-for="(value, key) in row.mappingMeta" :key="key">{{value}}</el-tag>
        </template>
        <template #bulkImportConfig="{ row }">
            <el-tag class="el-icon--left" v-for="(item, index) in row.bulkImportConfigs" :key="index">{{item}}</el-tag>
        </template>
    </VxeGrid>
</template>

