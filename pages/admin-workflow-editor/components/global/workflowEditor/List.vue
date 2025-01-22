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
    console.log("openLastestVersion", data)
    // REMARK: 在列表頁面是拿不到 version 的 draftId 的，所以需要先取得 version 再打开
    // const {data:{ entryList}} = await adminApi.api.postWorkflowVersionPage({draftId:data.id, orderBy:'versionNumber', isDesc:true, pageSize:1})
    // console.log("openLastestVersion", entryList)
    const praams = {
        ...data,
        draftId: data.id,
    }
    let newItem = newWorkflowEditorDetail(praams) as any;
    newItem.props.currentVersion = data.latestVersion
    routerProvider?.navigateTo({...newItem}, openInNewTab)
}

function openProductionVersion(data:any, openInNewTab = false){
    // TODO: open detail page
    const praams = {
        ...data,
        draftId: data.id,
    }
    const newItem = newWorkflowEditorDetail(praams) as any;
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