<script lang="ts" setup>
import { DocumentTemplateProviderKey } from '#imports';
import dayjs from 'dayjs'

const listProvider = inject(DocumentTemplateProviderKey)
if(!listProvider) {
    throw createError('DocumentTemplateProviderKey is not define') 
}

const {pageNum, pageSize, orderBy, isDesc, filters}= defineProps<{
    pageNum?: number,
    pageSize?: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();

const { tableRef, tableConfig, tableEvent, reload } = useVxeTable({
    id: 'admin-document-template-table',
    api: listProvider?.getListApi,
    columns: [
        {
            title: '', 
            fixed: 'left',
            width: 44,
            slots:{
                default: 'iconName'
            }
        },
        {
            title:'tableHeader_name',
            field: 'name',
        },
        {
            title:"info_type",
            field:'fileType'
        },
        {
            title:"role.creator",
            field:'createdBy'
        },
        {
            title:'workflow_createDate',
            field: 'createdDate',
            formatter ({ cellValue }) {
                const format = userDisplayTimeSetting();
                return dayjs(cellValue).format(format);
            },
        }
    ],
    bodyActions:[
        [
            {
                code:"preview",
                name:"common_preview",
                action: ({row}) => listProvider.dblClickHandle(row)
            },
            {
                code:"replace",
                name:"tip.templateReplace",
                action: ({row}) => listProvider.handleReplace(row, true)
            },
            {
                code:"edit",
               name: 'template.edit',
               action: ({row}) => listProvider.handleEdit(row)
            },
            {
                code:"info",
                name: "template.editInfo",
                action: ({row}) => listProvider.handleEditInfo(row)
            },
            {
                code:"delete",
                name:"common_delete",
                action: ({row}) => listProvider.handleDelete(row)
            },
            {
                code:"download",
                name:"template.download",
                action: ({row}) => listProvider.handleDownload(row)
            }
        ]
    ],
    permissionMethod: (args:PermissionMethodParams) => {
        return listProvider.actionPermission(args)
    },
    dblClickAction: ({ row, column, event }:any) => {
        listProvider.dblClickHandle(row)
    },
    optionalConfig:{
        sortConfig:{
            remote: true,
            defaultSort: orderBy ? [{field: orderBy, order: isDesc ? 'desc' : 'asc'}] : []
        },
    }
})

const ExtensionMimeTypeMap = {
    'PPT': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'Word': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'Excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'PDF': 'application/pdf'
}
function getMimeType(type:string) {
    return ExtensionMimeTypeMap[type] || 'application/pdf'
}


defineExpose({ reload })

</script>


<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons"/>
        </template>
        <template #iconName="{ row }">
            <BrowseItemIcon v-if="row.fileType" class="icon" type="file" :mimeType="getMimeType(row.fileType)" status="general"/>
        </template>
    </VxeGrid>

</template>