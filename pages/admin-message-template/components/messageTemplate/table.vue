<script lang="ts" setup>
import {useVxeTable} from '#imports'
import {MessageTemplateProviderKey }  from '~/utils/messageTemplateHelper'

const listProvider = inject(MessageTemplateProviderKey)
if(!listProvider) throw new Error("MessageTemplateProviderKey not found")

const { tableConfig, tableEvent, tableRef, reload} = useVxeTable({
    id: 'admin-message-template',
    api: async(params:any) => {
        if(!params.orderBy) {
            params.orderBy = 'modifiedDate'
            params.isDesc = true
        }
        return await listProvider?.getListApi(params)
    },
    remoteSort: true,
    columns:[
        {
            field: "templateName",
            title: "name",
            fixed: "left",
            sortable: true,
        },
        {
            field: 'usage',
            title: "usage",
            formatter: ({ cellValue }) => {
                if(!cellValue || cellValue.length === 0) return ''
                return cellValue.join(',')
            }
        },
        {
            field: 'language',
            title: "language",
            sortable: true,
        },
        {
            field: "whatsAppStatus",
            title: "status",
            type: 'html',
            sortable: true,
            formatter: ({ cellValue }) => {
                return cellValue ? `<div class="${cellValue} tag">${cellValue}</div>` : ""
            }
        },
        {
            field:"createdBy",
            title: "createdBy",
            sortable: true,
        },
        {
            field: "modifiedBy",
            title: "modifiedBy",
            sortable: true,
        },
        {
            field: "modifiedDate",
            title: "modifiedDate",
            sortable: true,
            formatter: ({ cellValue }) => {
                return formatDate(cellValue)
            }
        }    

    ],
    bodyActions:[
        [
            {
                code: 'VIEW_DETAILS',
                name: "View Details",
                action: async ({row}) => {
                    listProvider.openDetail(row)
                }
            },
            {
                code :'EDIT_TEMPLATE',
                name: "Edit Template",
                action: async ({row}) => {
                    listProvider.openTemplate(row)
                }
            },
            {
                code : "DUPLICATE_TEMPLATE",
                name: "Duplicate",
                action: async ({row}) => {
                    listProvider.duplicate(row)
                }
            },
            {
                code: "DELETE_TEMPLATE",
                name: "Delete",
                action: async ({row}) => {
                    listProvider.delete(row)
                }
            }
        ]
    ],
    defaultSort:[
        {
            field: 'modifiedDate',
            order: 'desc'
        }
    ],
    dblClickAction: ({ row, column, event }) => {
        listProvider.openDetail(row)
    },
})

defineExpose({
    reload
})
</script>


<template>
    <VxeGrid v-bind="tableConfig" v-on="tableEvent" ref="tableRef" >
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
    </VxeGrid>
</template>

<style lang="scss" scoped>
.vxe-grid{
    :deep(.tag) {
        display: inline-block;
        padding-inline: var(--app-space-xs);
        &.REJECTED{
            background: var(--app-error-color);
            color: #fff;
        }
        &.PENDING, &.PENDING_DELETION, &.DISABLED, &.IN_APPEAL, &.PAUSED{
            background: var(--app-info-color);
            color: #fff;
        }
        &.APPROVED{
            background: var(--app-success-color);
            color: #fff;
        }
    }
}
  
</style>