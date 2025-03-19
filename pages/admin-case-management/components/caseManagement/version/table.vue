<script lang="ts" setup>
import type {VxeGridInstance, VxeGridListeners} from 'vxe-table'
const listProvider = inject(CaseManagementVersionProviderKey)
if(!listProvider) {
    throw new Error('CaseManagementListProviderKey not found')
}
// const gridRef = ref<VxeGridInstance<any>>()

const {pageNum, pageSize, orderBy, isDesc, filters}= defineProps<{
    pageNum?: number,
    pageSize?: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();


const { tableConfig , tableEvent, tableRef, reload, qyery } = useVxeTable({
    id: 'adminCaseManagementVersionList',
    api: (pageParams:any) => listProvider?.getListApi(pageParams),
    remoteSort: true,
    defaultSort: orderBy ? [{field: orderBy, order: isDesc ? 'desc' : 'asc'}] : [],
    pageSize,
    columns:  [
        {
            field:'versionNumber',
            title: 'file_versionNumber',
            sortable: true,
            fixed:'left',
        },
        {
            field:"production",
            title: "tableHeader_status",
            sortable: true,
            formatter ({ cellValue }:any) {
                return cellValue ? 'production' : ''
            }
        },
        {
            field:"modifiedDate",
            title: "table_modifiedDate",
            sortable: true,
            formatter ({ cellValue }:any) {
                return formatDate(cellValue)
            }
        },
        {
            field:"modifiedBy",
            title: "modified_by",
            sortable: true,
        },
        {
            field:"createdDate",
            title: "workflow_createDate",
            sortable: true,
            formatter ({ cellValue }:any) {
                return formatDate(cellValue)
            }
        },
        {
            field:"createdBy",
            title: "info_by",
            sortable: true,
        },
    ],
    dblClickAction: ({ row, column, event }:any) => {
        listProvider.openVersionDetail(row)
    },
    bodyActions: [
        [
            {
                code:'dpTool_edit',
                name: "edit",
                action: ({row}:any) => {
                            listProvider.openVersionDetail(row)
                        }
            },
            {
                name:'workflowEditor_saveAsNewVersion',
                code: 'save_as_new_version',
                action: ({row}:any) => {
                    listProvider.saveAsNewVersion(row)
                }
            },
            {
                code: "promote_version",
                name:"promote",
                action: ({row}:any) => {
                    listProvider.promoteVersion(row)
                }
            }
        ]
    ],
    permissionMethod: listProvider.actionPermission,
})

defineExpose({ reload, qyery })
</script>

<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        
    </VxeGrid>
</template>