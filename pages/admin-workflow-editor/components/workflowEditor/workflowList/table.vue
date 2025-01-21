<script lang="ts" setup>
import { WorkflowEditorListProviderKey } from '~/utils/workflowEditorProvider';
import dayjs from 'dayjs'

const listProvider = inject(WorkflowEditorListProviderKey)
if(!listProvider) {
    throw new Error('WorkflowEditorListProviderKey not found')
}

const gridRef = ref()
const { tableConfig , tableEvent } = useVxeTable({
    id: 'workflowEditorListTableSetting',
    api: (pageParams:any) => listProvider.getListApi(pageParams),
    dblClickAction: ({ row, column, event }:any) => {
        listProvider.openLastestVersion(row)
    },
    columns:  [
        {
            field: 'name',
            title: 'Name',
            fixed: 'left',
            sortable: true,
        },
        {
            field: 'productionVersion',
            title: 'productionVersion',
            minWidth: 120,
            
        },
        {
            field: 'latestVersion',
            title: 'latestVersion',
            minWidth: 120,
        },
        {
            field:'modifiedBy',
            title: 'modifiedBy',
            minWidth: 120,
            sortable: true,
        },
        {
            field: 'modifiedDate',
            title: 'modifiedDate',
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
            { 
                code: 'edit_latest_version_new_tab', 
                name: 'Edit Latest Version in New Tab', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.openLastestVersion(row, true)
                }
            },
            { 
                code : 'view_production', 
                name: 'View Production', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.openProductionVersion(row)
                }
            },
            { 
                code : 'view_production_new_tab', 
                name: 'View Production in New Tab', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.openProductionVersion(row, true)
                }
            },
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
            { 
                code : 'view_versions_new_tab', 
                name: 'View Versions in New Tab', 
                visible: true, 
                disabled: false,
                action: ({row}:any) => {
                    listProvider.openVersions(row, true)
                }
            },
        ]
    ],
    permissionMethod: listProvider.actionPermission
})


function reload(){
    const $grid = gridRef.value
  if ($grid) {
    $grid.commitProxy('reload')
  }
}

defineExpose({
    reload
})

</script>

<template>
    <vxe-grid
            ref="gridRef"
            v-bind="tableConfig"
            v-on="tableEvent"
        >
        <template #toolbar_buttons>
            <ElButton type="primary" @click="listProvider.createNewWorkflow">Add New Workflow</ElButton>
        </template>
        </vxe-grid>
</template>