<script lang="ts" setup>
import { WorkflowEditorListProviderKey } from '~/utils/workflowEditorProvider';
import dayjs from 'dayjs'

const listProvider = inject(WorkflowEditorListProviderKey)
if(!listProvider) {
    throw new Error('WorkflowEditorListProviderKey not found')
}

const { tableConfig , tableEvent, tableRef, reload } = useVxeTable({
    id: 'workflowEditorListTableSetting',
    api: (pageParams:any) => {
        if(!pageParams.orderBy){
            pageParams.orderBy = 'modifiedDate'
            pageParams.isDesc = true
        } 
        console.log("pageParams", pageParams)
        return listProvider.getListApi(pageParams)
    },
    dblClickAction: ({ row, column, event }:any) => {
        listProvider.openLastestVersion(row)
    },
    remoteSort:true,
    defaultSort:[
        {
            field:"modifiedDate",
            order: "desc"
        }
    ],
    columns:  [
        {
            field: 'name',
            title: 'Name',
            fixed: 'left',
            sortable: true,
        },
        {
            field: 'productionVersion',
            title: 'dpTable.productionVersion',
            minWidth: 120,
            
        },
        {
            field: 'latestVersion',
            title: 'dpTable.latestVersion',
            minWidth: 120,
        },
        {
            field:'modifiedBy',
            title: 'modified_by',
            minWidth: 120,
            sortable: true,
        },
        {
            field: 'modifiedDate',
            title: 'search.modifiedDate',
            minWidth: 120,
            sortable: true,
            formatter ({ cellValue }:any) {
                return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
            }
        }
    ], 
    bodyActions: [
        [
            { 
                code: 'edit_latest_version', 
                name: 'Edit Latest Version', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.openLastestVersion(row)
                }
            },
            // { 
            //     code: 'edit_latest_version_new_tab', 
            //     name: 'Edit Latest Version in New Tab', 
            //     visible: true, 
            //     disabled: false,
            //     action: ({row}:any) => {
            //         listProvider.openLastestVersion(row, true)
            //     }
            // },
            { 
                code : 'view_production', 
                name: 'View Production', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.openProductionVersion(row)
                }
            },
            // { 
            //     code : 'view_production_new_tab', 
            //     name: 'View Production in New Tab', 
            //     visible: true, 
            //     disabled: false,
            //     action: ({row}:any) => {
            //         listProvider.openProductionVersion(row, true)
            //     }
            // },
            { 
                code : 'save_as_new_workflow', 
                name: 'Save as new workflow', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.saveAsNewWorkflow(row)
                }
            },
            { 
                code : 'view_versions', 
                name: 'View Versions', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.openVersions(row)
                }
            },
            // { 
            //     code : 'view_versions_new_tab', 
            //     name: 'View Versions in New Tab', 
            //     visible: true, 
            //     disabled: false,
            //     action: ({row}:any) => {
            //         listProvider.openVersions(row, true)
            //     }
            // },
        ]
    ],
    permissionMethod: listProvider.actionPermission
})


defineExpose({
    reload
})

</script>

<template>
    <vxe-grid
            ref="tableRef"
            v-bind="tableConfig"
            v-on="tableEvent"
        >
        <template #toolbar_buttons>
            <ElButton type="primary" @click="listProvider.createNewWorkflow">Add New Workflow</ElButton>
        </template>
        </vxe-grid>
</template>