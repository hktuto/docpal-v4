<script lang="ts" setup>

const listProvider = inject(InternalShareListProviderKey)
if(!listProvider) {
    throw new Error('InternalShareListProviderKey not found')
}

const { pageNum, pageSize, orderBy, isDesc, filters}= defineProps<{
    pageNum?: number,
    pageSize?: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();

const { tableRef, tableConfig, tableEvent, reload } = useVxeTable({
    id: 'adminInternalShareList',
    api: (pageParams:any) => listProvider.getListApi(pageParams),
    remoteSort:true,
    defaultSort: [
        {
            field: 'name',
            order: 'desc'
        }
    ],
    columns:  [
        {
            field: 'name',
            title: 'table_name',
            sortable: true,
            fixed:'left',
        },
        {
            field: 'createdDate',
            title: 'workflow_createDate',
            sortable: true,
            formatter ({ cellValue }) {
                const format = userDisplayTimeSetting();
                return dayjs(cellValue).format(format);
            },
        }
    ],
    bodyActions: [
        [
            { 
                code: 'edit', 
                name: 'Edit', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.editHandler(row)
                }
             },
            { 
                code: 'edit_new_tab', 
                name: 'Edit in new tab', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.editHandler(row, true)
                }
             },
            { code: 'promote_to_production', name: 'Promote to Production', visible: true, disabled: false },
            { code: "save_as_new_version", name: "Save as new version", visible: true, disabled: false },
        ]
    ],
    permissionMethod: (args:PermissionMethodParams) => {
        return listProvider.actionPermission(args)
    }
})
</script>

<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
            
        </template>
    </VxeGrid>

</template>