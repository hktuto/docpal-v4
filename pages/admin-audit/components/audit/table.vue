<script lang="ts" setup>
import dayjs from 'dayjs'
const auditProvider = inject(AuditProviderKey)
if(!auditProvider) { 
    throw new Error('AuditProviderKey not found')
}
const tableConfig = createTableConfig({
    id: 'auditListTableSetting',
    api: (pageParams:any) => auditProvider?.getListApi(pageParams),
    columns:  [
                {
                    id: "10",
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
                {
                    field: 'eventCategory',
                    title: 'category',
                },
                {
                    field:'label',
                    title: 'Event',
                   
                },
                {
                    field: 'eventDate',
                    title: 'Date',
                    sortable: true,
                    formatter ({ cellValue }:any) {
                        const format = userDisplayTimeSetting()
                        return dayjs(cellValue).format(format)
                    }
                },
            ],    
},{
    rowConfig:{
        useKey:true,
            drag: true,
        },
    rowDragConfig:{
        showIcon: true,
    },
    sortConfig: {
        remote: true,
        defaultSort:[
        ]
    },
}
)
const gridRef = ref()
function query() {
    gridRef.value.commitProxy('query')
}

function reload() {
    gridRef.value.commitProxy('reload')
}
defineExpose({ reload, query })

</script>


<template>111
    <VxeGrid ref="gridRef" v-bind="tableConfig"  >
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        <template #currentPath="{row}">222
            <span v-if="row.currentPath" class="pathButton"  @click="auditProvider.goClientPath(row.currentPath)">{{ row.logicalPath }}</span>
        </template>
    </VxeGrid>
</template>