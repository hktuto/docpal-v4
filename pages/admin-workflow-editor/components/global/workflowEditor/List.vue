<script lang="ts" setup>
import dayjs from 'dayjs'
import {TabManagerKey, useI18n, workflowEditorListTableSetting} from '#imports'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';
import { createTableConfig } from '../../../../../packages/base/utils/tableHelper';

const tabManager = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
if(!tabManager || !routerProvider) {
    throw createError('menu manger not found')
}

const tableRef = ref()

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

function openProductionVersion(data:any, openInNewTab = false){
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
    if(!openInNewTab){
        routerProvider?.navigateTo({...newItem})
    }else{
        tabManager?.openTab({...newItem})
    }
    // tabManager?.openTab(newItem)
}

const saveAsDialogRef = ref()
const newWorkflowDialogData = ref({
    latestVersion:"V1"
})
function saveAsNewWorkflow(data:any){
    newWorkflowDialogData.value = data
    saveAsDialogRef.value.open()
}

function openVersions(data:any , openInNewTab = false){
    const newItem = newWorkflowEditorVerionList(data);
    console.log('newItem', newItem, data)
    
    if(!openInNewTab){
        routerProvider?.navigateTo({...newItem})
    }else{
        tabManager?.openTab({...newItem})
    }
}

const newDialogRef = ref()
function createNewWorkflow(){
    newDialogRef.value.handleOpen()
}

provide(WorkflowEditorListProviderKey,{
    saveAsNewWorkflow,
    openProductionVersion,
    openLastestVersion,
    openVersions,
    createNewWorkflow,
    getListApi: adminApi.workflowProcessDefinitionController.postPage
})

function reload(){
    if(tableRef.value && tableRef.value.reload) {
        tableRef.value.reload()
    }
}

</script>

<template>
    <div class="pageContainer">
        <!-- <TablePage :config="tableConfig" /> -->
        <WorkflowEditorWorkflowListTable ref="tableRef" />
        <WorkflowEditorNewDialog ref="newDialogRef" @click="reload" />
        <WorkflowEditorSaveAsDialog ref="saveAsDialogRef" :copyVersion="newWorkflowDialogData.latestVersion" :data="newWorkflowDialogData" @close="reload" />
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