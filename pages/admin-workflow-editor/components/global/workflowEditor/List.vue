<script lang="ts" setup>
import {TabManagerKey, useI18n, workflowEditorListTableSetting} from '#imports'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';
import { createTableConfig } from '../../../../../packages/base/utils/tableHelper';
import type {VxeGridListeners} from 'vxe-table'


const tabManager = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
if(!tabManager || !routerProvider) {
    throw createError('menu manger not found')
}
const { t } = useI18n()

const config = createTableConfig({
    id: 'workflowEditorListTableSetting',
    api: adminApi.workflowProcessDefinitionController.postPage,
    columns:  [
                {
                    field: 'name',
                    title: 'Name',
                    fixed: 'left',
                    minWidth: 100,
                },
                {
                    field: 'productionVersion',
                    title: 'productionVersion',
                    minWidth: 60,
                },
                {
                    field: 'latestVersion',
                    title: 'latestVersion',
                    minWidth: 60,
                },
                {
                    field:'modifiedBy',
                    title: 'modifiedBy',
                    minWidth: 200,
                },
                {
                    title: 'Action',
                    fixed: 'right',
                    minWidth: 40,
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

    }
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
            currentVersion: data.latestVersion,
            productionVersion: data.productionVersion,
            name: data.name,
            item: data,
        }
    }
    routerProvider?.navigateTo(newItem)
    // tabManager?.openTab(newItem)
}

function openLastestVersion(data:any, openInNewTab = false){
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
            currentVersion: data.latestVersion,
            productionVersion: data.productionVersion,
            name: data.name,
            item: data,
        }
    }
    if(!openInNewTab){
        routerProvider?.navigateTo(newItem)
    }else{
        tabManager?.openTab(newItem)
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
    routerProvider?.navigateTo(newItem)
    // tabManager?.openTab(newItem)
}

function saveAsNewWorkflow(data:any){

}

function openVersions(data:any){
    const newItem:any = {
        menuKey: routerProvider?.menuSymbol,
        id: "workflow-editor-versions-" + new Date().getTime(),
        name: "workflow-editor-versions-" + data.id,
        icon: 'dp-icon:flow-outline',
        label: data.name,
        component: 'LazyWorkflowEditorVersion',
        props: {
            id: data.id,
            currentVersion: data.productionVersion,
            productionVersion: data.productionVersion,
            name: data.name,
            item: data,
        }
    }
    routerProvider?.navigateTo(newItem)
}

function createNewWorkflow(){

}

</script>

<template>
    <div class="pageContainer">
        <vxe-grid
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
                            <ElDropdownItem @click="handleDblclick(row)">View  Versions</ElDropdownItem>
                            
                        </ElDropdownMenu>
                    </template>
                </ElDropdown>       
            </template>
        </vxe-grid>

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