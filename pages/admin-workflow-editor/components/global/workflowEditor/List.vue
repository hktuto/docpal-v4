<script lang="ts" setup>
import dayjs from 'dayjs'
import {TabManagerKey, useI18n, workflowEditorListTableSetting} from '#imports'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';
import { createTableConfig } from '../../../../../packages/base/utils/tableHelper';
import type {VxeGridListeners} from 'vxe-table'

const gridRef = ref();
const tabManager = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
if(!tabManager || !routerProvider) {
    throw createError('menu manger not found')
}
const { t } = useI18n()

const tableConfig : TableConfigWithPagerParams = {
    id: 'workflowEditorListTableSetting',
    apiString: 'adminApi.workflowProcessDefinitionController.postPage',
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
}

const config = createTableConfig({
    id: 'workflowEditorListTableSetting',
    api: (pageParams:any) => adminApi.workflowProcessDefinitionController.postPage(pageParams),
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
                ]
            ]
        }
    },
    rowConfig:{
            drag: true,
        },
    rowDragConfig:{
        showIcon: true,
        
        visibleMethod: ({ row }:any) => {
            return true
        },
        dragStartMethod: (params:any) => {
            console.log('drag start', params)
            return true;
        },
        dragEndMethod: (params:any) => {
            console.log('drag end', params)
            return true;
        }

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
        handleDblclick(row)
    },
    menuClick: ({ menu, row, column }) => {
        switch (menu.code) {
            case 'edit_latest_version':
                openLastestVersion(row)
                break;
            case 'edit_latest_version_new_tab':
                openLastestVersion(row, true)
                break;
        }
    }
}

function handleDblclick(data:any){
    // TODO: open detail page
    const newItem = newWorkflowEditorDetail(data);
    
    routerProvider?.navigateTo(newItem)
    // tabManager?.openTab(newItem)
}

function openLastestVersion(data:any, openInNewTab = false){
    // TODO: open detail page
    const newItem: any = {
        menuKey: routerProvider?.menuSymbol,
        id: "workflow-editor-detail-" + new Date().getTime(),
        name: "workflow-editor-detail-" + data.id,
        icon: 'dp-icon:flow-outline',
        label: data.name,
        component: 'LazyWorkflowEditorDetail',
        props: {
            id: data.id,
            currentVersion: data.latestVersion,
            productionVersion: data.productionVersion,
            name: data.name,
            item: data,
        }
    }
    if(!openInNewTab){
        routerProvider?.navigateTo({...newItem})
    }else{
        tabManager?.openTab({...newItem})
    }
}

function openProductionVersion(data:any){
    console.log('item clicked', data)
    // TODO: open detail page
    const newItem: any = {
        menuKey: routerProvider?.menuSymbol,
        id: "workflow-editor-detail-" + new Date().getTime(),
        name: "workflow-editor-detail-" + data.id,
        icon: 'dp-icon:flow-outline',
        label: data.name,
        component: 'LazyWorkflowEditorDetail',
        props: {
            id: data.id,
            currentVersion: data.productionVersion,
            productionVersion: data.productionVersion,
            name: data.name,
            item: data,
        }
    }        
    routerProvider?.navigateTo({...newItem})
    // tabManager?.openTab(newItem)
}

function saveAsNewWorkflow(data:any){

}

function openVersions(data:any){
    console.log('open versions', data)
    const newItem:any = {
        menuKey: routerProvider?.menuSymbol,
        id: "workflow-editor-versions-" + new Date().getTime(),
        name: "workflow-editor-versions-" + data.id,
        icon: 'dp-icon:flow-outline',
        label: data.name,
        component: 'LazyWorkflowEditorVersion',
        props: {
            id: data.id,
            draftId: data.draftId,
            latestVersion: data.latestVersion,
            productionVersion: data.productionVersion,
            name: data.name,
            item: data,
        }
    }
    routerProvider?.navigateTo({...newItem})
}

const newDialogRef = ref()
function createNewWorkflow(){
    newDialogRef.value.handleOpen()
}

function reload(){
    const $grid = gridRef.value
  if ($grid) {
    $grid.commitProxy('reload')
  }
}

</script>

<template>
    <div class="pageContainer">
        <TablePage :config="tableConfig" />
        <!-- <vxe-grid
            ref="gridRef"
            v-bind="config"
            v-on="tableEvents"
        >
        <template #toolbar_buttons>
            <ElButton type="primary" @click="createNewWorkflow">Add New Workflow</ElButton>
        </template>
            <template #action="{row, rowIndex}"> 
                <ElDropdown >
                    <ElButton type="primary" link>
                        <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                    </ElButton>
                    <template #dropdown>
                        <ElDropdownMenu>
                            <ElDropdownItem @click="openLastestVersion(row)">Edit latest version</ElDropdownItem>
                            <ElDropdownItem v-if="row.productionVersion" @click="openProductionVersion(row)">View Production</ElDropdownItem>
                            <ElDropdownItem @click="handleDblclick(row)">Save As New Workflow</ElDropdownItem>
                            <ElDropdownItem @click="openVersions(row)">View  Versions</ElDropdownItem>
                            
                        </ElDropdownMenu>
                    </template>
                </ElDropdown>       
            </template>
        </vxe-grid> -->
        <WorkflowEditorNewDialog ref="newDialogRef" @click="reload" />
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    padding: var(--app-space-s);
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>