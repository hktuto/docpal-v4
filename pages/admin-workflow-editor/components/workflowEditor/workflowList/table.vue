<script lang="ts" setup>
import { WorkflowEditorListProviderKey } from '~/utils/workflowEditorProvider';
import type {VxeGridListeners} from 'vxe-table'
import dayjs from 'dayjs'

const listProvider = inject(WorkflowEditorListProviderKey)
if(!listProvider) {
    throw new Error('WorkflowEditorListProviderKey not found')
}

const gridRef = ref()
const tableConfig = createTableConfig({
    id: 'workflowEditorListTableSetting',
    api: (pageParams:any) => listProvider.getListApi(pageParams),
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
                },
                {
                    title: 'Action',
                    fixed: 'right',
                    width: 65,
                    slots:{
                        default:'action'
                    }
                }
            ],    
},{
    menuConfig:{
        body: {
            options: [
                [
                    { code: 'edit_latest_version', name: 'Edit Latest Version', visible: true, disabled: false },
                    { code: 'edit_latest_version_new_tab', name: 'Edit Latest Version in New Tab', visible: true, disabled: false },
                    { code : 'view_production', name: 'View Production', visible: true, disabled: false },
                    { code : 'view_production_new_tab', name: 'View Production in New Tab', visible: true, disabled: false },
                    { code : 'save_as_new_workflow', name: 'Save as new workflow', visible: true, disabled: false },
                    { code : 'view_versions', name: 'View Versions', visible: true, disabled: false },
                    { code : 'view_versions_new_tab', name: 'View Versions in New Tab', visible: true, disabled: false },
                ]
            ]
        }
    },
    rowConfig:{
            drag: true,
        },
    rowDragConfig:{
        showIcon: true,
    },
    sortConfig: {
        remote: true,
        defaultSort:[
            {
                field: 'name',
                order: 'asc'
            }
        ]
    },
}
)

const tableEvents: VxeGridListeners = {
    cellDblclick: ({ row, column, rowIndex }) => {
        
        listProvider.openLastestVersion(row)
    },
    menuClick: ({ menu, row, column }) => {
        switch (menu.code) {
            case 'view_production':
                listProvider.openProductionVersion(row)
                break;
            case 'view_production_new_tab':
                listProvider.openProductionVersion(row, true)
                break;
            case 'save_as_new_workflow':
                listProvider.saveAsNewWorkflow(row)
                break;
            case 'view_versions':
                listProvider.openVersions(row)
                break;
            case 'view_versions_new_tab':
                listProvider.openVersions(row, true)
                break;
            case 'edit_latest_version':
                listProvider.openLastestVersion(row)
                break;
            case 'edit_latest_version_new_tab':
                listProvider.openLastestVersion(row, true)
                break;
        }
    }
}

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
            v-on="tableEvents"
        >
        <template #toolbar_buttons>
            <ElButton type="primary" @click="listProvider.createNewWorkflow">Add New Workflow</ElButton>
        </template>
            <template #action="{row, rowIndex}"> 
                <ElDropdown >
                    <ElButton type="primary" link>
                        <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                    </ElButton>
                    <template #dropdown>
                        <ElDropdownMenu>
                            <ElDropdownItem @click="listProvider.openLastestVersion(row)">Edit latest version</ElDropdownItem>
                            <ElDropdownItem v-if="row.productionVersion" @click="listProvider.openProductionVersion(row)">View Production</ElDropdownItem>
                            <ElDropdownItem @click="listProvider.saveAsNewWorkflow(row)">Save As New Workflow</ElDropdownItem>
                            <ElDropdownItem @click="listProvider.openVersions(row)">View  Versions</ElDropdownItem>
                        </ElDropdownMenu>
                    </template>
                </ElDropdown>       
            </template>
        </vxe-grid>
</template>