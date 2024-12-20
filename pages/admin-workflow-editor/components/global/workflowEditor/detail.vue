<script lang="ts" setup>
import {MenuRouterKey} from '#imports'
import { ElMessageBox, ElNotification } from 'element-plus'
import { adminApi } from 'api';
import type { ToolBar } from '../../../../../packages/base/components/app/toolbar/index.vue';
import { saveWorkflowFormToNewVersion } from '~/utils/workflowEditorhelpers';
const { t } = useI18n()


const { id, currentVersion } = defineProps<{
    id:string
    currentVersion: string,
}>()

const draftDetail = ref<any>({})
const routerInject = inject(MenuRouterKey)
const readonly = ref(true);
const bpmnFile = ref()
const WorkflowEditorRef = ref()
const workflowData = ref()
const state = reactive<any>({
    detail: {},
    loading: false,
    newStatus: false
})

const productionVersion = ref()
const lastestVewsion = ref()
async function getWorkflow() {
    console.log("getWorkflow", id, currentVersion)
    const data = await adminApi.workflowProcessDefinitionController.getDraft(id)
    const blob = await adminApi.workflowVersionController.getBpmnxml({draftId:id, versionNumber:currentVersion}, {
        format: 'blob'
    }) 
    const json = await adminApi.workflowVersionController.getJson({draftId:id, versionNumber:currentVersion}, {})
    // @ts-ignore
    const file = await blob.text()
    draftDetail.value = data.data;
    bpmnFile.value = file
    
    const {data: draftData}:any = await adminApi.workflowProcessDefinitionController.getDraft(id)
    if(!draftData ){
        throw createError("draft not found")
    }
    productionVersion.value = draftData.productionVersion
    lastestVewsion.value = draftData.latestVersion 
    
    // check read only logic
    if(currentVersion !== lastestVewsion.value || productionVersion.value && currentVersion === productionVersion.value) {
        readonly.value = true
    }else{
        readonly.value = false
    }
    workflowData.value = draftData
    routerInject?.updateTabName(draftData.name + ` - (${currentVersion})`)
    nextTick(() => {
        
        if(json && json.data){
            WorkflowEditorRef.value.init( bpmnFile.value, JSON.parse(json.data))
        }else{
            WorkflowEditorRef.value.init( bpmnFile.value)
        }    
    })
}


async function saveDraft() {
    const { xml, json, x6Json } = WorkflowEditorRef.value.getData()
    const newName = json.definitions.process.attr_name
    const blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
    const form:any = new FormData();
    form.append('name', newName)
    form.append('versionId', currentVersion)
    form.append('draftId', id)
    form.append('jsonValue', JSON.stringify(x6Json))
    form.append('file', blob, 'workflow.bpmn.xml')
    form.append('isDraft', true)
    await adminApi.workflowProcessDefinitionController.postUpload({requestDTO:{}},form)
    // 如果是修改了名称，则更新 tab 的名称
    routerInject?.updateTabName(newName + ` - (${currentVersion})`)
}

provide('workflowDetail',{
    saveDraft,
})

function openVersionList(){
    const newItem = newWorkflowEditorVerionList(workflowData.value);
    
    routerInject?.navigateTo(newItem)
}



async function saveAsNewVersion(){
    const { xml, x6Json } = WorkflowEditorRef.value.getData()
    const blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
    const form:any = new FormData();
    form.append('jsonValue', JSON.stringify(x6Json))
    form.append('draftId', id)
    form.append('file', blob, 'workflow.bpmn.xml')

    // save all forms to new version
    
    const {data}:any = await adminApi.workflowVersionController.postNew({requestDTO:{}},form)
    await saveWorkflowFormToNewVersion(WorkflowEditorRef.value.getGraphValue, currentVersion, data.versionNumber)

    ElNotification.success(t('common.success'))

    
    routerInject?.updateProps({
        id,
        currentVersion: data.versionNumber,
        productionVersion: data.productionVersion
    })

}


watch(() => [id,currentVersion], (newWorkflowId) => {
    if(newWorkflowId[0] && newWorkflowId[1]) {
        getWorkflow()
    }
},{
    immediate:true
})



</script>

<template>
    <div class="pageContainer">
        <BpmnEditor ref="WorkflowEditorRef" :workflow-data="workflowData" :currentVersion="currentVersion" :id="id" :readonly="readonly">
            
            <template #actions>
                <template v-if="!productionVersion || productionVersion !== currentVersion">
                    <ElButton type="primary">Promote To Prodocution : {{ currentVersion }}</ElButton>
                </template>
                <ElButton type="primary" @click="saveAsNewVersion">Save As New Version</ElButton>
                <ElButton @click="openVersionList" type="primary">Version List</ElButton>
                <!-- <el-button v-if="state.detail.publishStatus === 'A' && state.detail.status === 'A'" :loading="state.loading" type="info" @click="handleDeactive()">{{$t('actions.inactive')}}</el-button> -->
                <!-- <el-button v-else-if="state.detail.status === 'A'" :loading="state.loading" type="info" @click="handleActive()">{{$t('actions.active')}}</el-button> -->
                <!-- <el-button :loading="state.loading" type="primary" @click="handleSave(true)">{{$t('button.saveDraft')}}</el-button> -->
                <!-- <el-button v-if="state.detail.status !== 'A'" :loading="state.loading"  type="primary" @click="handleSave(false)">{{$t('button.publish')}}</el-button> -->
            </template>
        </BpmnEditor>
    </div>
</template>



<style lang="scss" scoped>

.pageContainer{
    width:100%;
    height:100%;
}
</style>