<script lang="ts" setup>
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('menu manger not found')
}

const tableRef = ref()

async function openLastestVersion(data:any, openInNewTab = false){   

    // REMARK: 在列表頁面是拿不到 version 的 draftId 的，所以需要先取得 version 再打开
    // const {data:{ entryList}} = await adminApi.api.postWorkflowVersionPage({draftId:data.id, orderBy:'versionNumber', isDesc:true, pageSize:1})
    // console.log("openLastestVersion", entryList)
    const params: NewWorkflowVersionDetailParams = {
        id: data.id,
        name: data.name,
        draftId: data.id,
        versionNumber: data.latestVersion,
        versionId: data.latestVersionId
    }
    let newItem = newWorkflowEditorDetail(params) as any;
    console.log("openLatestVersion", newItem, data)
    newItem.props.currentVersion = data.latestVersion
    routerProvider?.navigateTo({...newItem}, openInNewTab)
}

function openProductionVersion(data:any, openInNewTab = false){
    // TODO: open detail page
    const praams = {
        ...data,
        versionNumber:data.productionVersion,
        versionId: data.productionVersionId,
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

function actionPermission({row, rowIndex, code}:any){
    if(code === 'delete') {
        return {
            visible: row.status === 'A',
            disabled: false
        }
    }
    // TODO : active workflow api has bug
    if(code === 'active') {
        return {
            visible: row.status === 'P',
            disabled: false
        }
    }
    return {
        visible: true,
        disabled: false
    }
}

async function deleteWorkflow(row:any){
    const {data} = await adminApi.api.deleteWorkflowProcessDefinitionRemoveDraftid(row.id)
    if(data ){
        routerProvider?.message?.success(t('dpMsg_success'))
        reload()
    }
}

async function activeWorkflow(row:any){
    await adminApi.api.postWorkflowProcessDefinitionActiveDraftid(row.id)
    routerProvider?.message?.success(t('dpMsg_success'))
    reload()
}

provide(WorkflowEditorListProviderKey,{
    saveAsNewWorkflow,
    openProductionVersion,
    openLastestVersion,
    openVersions,
    createNewWorkflow,
    actionPermission,
    deleteWorkflow,
    activeWorkflow,
    getListApi: (params) => {
        Object.keys(filter.value).forEach(key => {
            if(filter.value[key]) {
                params[key] = filter.value[key]
            }
        })
        return adminApi.api.postWorkflowProcessDefinitionDraftPage(params)
    } 
})

const ResponsiveFilterRef = ref()
const filter = ref<any>({
});
function handleFilterFormChange(formModel:any) {
    filter.value = formModel;
    reload()
}
async function getFilter() {
  const data = [
    {
        key: "status", label: "common_status", type: "string", isMultiple: false,
        options: [
            { label: 'active', value: 'A' },
            { label: 'inactive', value: 'P' }
        ]
    },
    {
        key:"publishStatus", label: "workflow_published", type: "string", isMultiple: false,
        options: [
            { label: 'published', value: 'A' },
            { label: 'unpublished', value: 'D' }
        ]
    }
  ]
  ResponsiveFilterRef.value.init(data)
  nextTick(() => {
    ResponsiveFilterRef.value.setValue('publishStatus', 'A');
  })
}

onMounted(() => {
    getFilter()
})

function reload(){
    console.log("reload")
    if(tableRef.value && tableRef.value.reload) {
        tableRef.value.reload()
    }
}

</script>

<template>
    <div class="pageContainer">
        <!-- <TablePage :config="tableConfig" /> -->
        <LazyWorkflowEditorWorkflowListTable ref="tableRef" >
            <template #toolbar_buttons>
                <div class="actions">
                    <div class="filter">

                        <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"  />
                    </div>
                <ElButton type="primary" @click="createNewWorkflow">Add New Workflow</ElButton>
                </div>
            </template>
        </LazyWorkflowEditorWorkflowListTable>
        <LazyWorkflowEditorNewDialog ref="newDialogRef" @created="reload" />
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
.actions{
    width:100%;
    display: grid;
    grid-template-columns: 1fr min-content;
}
</style>