<script lang="ts" setup>
import dayjs from 'dayjs'
import {useI18n, workflowEditorListTableSetting} from '#imports'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('menu manger not found')
}

const tableRef = ref()

async function openLastestVersion(data:any, openInNewTab = false){
    // TODO: open detail page'
    
    // get lastest version draft id
    const {data:{ entryList}} = await adminApi.api.postWorkflowVersionPage({draftId:data.id, orderBy:'versionNumber', isDesc:true, pageSize:1})
    if(!entryList || entryList.length === 0) {
        throw new Error('no version found')
    }
    let newItem = newWorkflowEditorDetail(entryList[0]) as any;
    newItem.props.currentVersion = data.latestVersion
    routerProvider?.navigateTo({...newItem}, openInNewTab)
}

function openProductionVersion(data:any, openInNewTab = false){
    // TODO: open detail page
    const newItem: any = {
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
    routerProvider?.navigateTo({...newItem}, openInNewTab)

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
    console.log("openVersions", newItem)
    
    routerProvider?.navigateTo({...newItem}, openInNewTab)
}

const newDialogRef = ref()
function createNewWorkflow(){
    newDialogRef.value.handleOpen()
}

function actionPermission({row, rowIndex, code}:PermissionMethodParams){
    return {
        visible: true,
        disabled: false
    }
}

provide(WorkflowEditorListProviderKey,{
    saveAsNewWorkflow,
    openProductionVersion,
    openLastestVersion,
    openVersions,
    createNewWorkflow,
    actionPermission,
    getListApi: adminApi.api.postWorkflowProcessDefinitionDraftPage
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
        <LazyWorkflowEditorWorkflowListTable ref="tableRef" />
        <LazyWorkflowEditorNewDialog ref="newDialogRef" @click="reload" />
        <LazyWorkflowEditorSaveAsDialog ref="saveAsDialogRef" :copyVersion="newWorkflowDialogData.latestVersion" :data="newWorkflowDialogData" @close="reload" />
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