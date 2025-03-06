<script lang="ts" setup>
const auditProvider = inject(AuditProviderKey)
if(!auditProvider) { 
    throw new Error('AuditProviderKey not found')
}
const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
    id: 'auditListTableSetting',
    api: (pageParams:any) => auditProvider?.getListApi(pageParams),
    columns:  [
        {
            field: 'principalName',
            title: 'User',
            fixed: 'left',
        },
        {
            field: 'currentPath',
            title: 'table_path',
            slots:{
                default:'currentPath'
            },
        },
         { field: 'eventCategory', title: 'category',},
         { field:'label', title: 'log_auditEvent',},
         { field: 'eventDate', title: 'log_auditFilterDate', sortable: true,
            formatter ({ cellValue }:any) {
                return formatDate(cellValue)
            }
        },
    ],    
})

defineExpose({ reload, query })

</script>


<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent"  >
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        <template #currentPath="{row}">
            <span v-if="row.currentPath" class="pathButton"  @click="auditProvider.goClientPath(row.currentPath)">{{ row.logicalPath }}</span>
        </template>
    </VxeGrid>
</template>