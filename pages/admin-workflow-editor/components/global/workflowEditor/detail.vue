<script lang="ts" setup>
import {MenuRouterKey} from '#imports'
import { ElMessageBox, ElNotification } from 'element-plus'
import { adminApi } from 'api';
const { t } = useI18n()

const { id, currentVersion, productionVersion, name, item } = defineProps<{
    id:string
    currentVersion: string,
    productionVersion: string,
    name:string
    item:any
}>()

const draftDetail = ref<any>({})

const routerInject = inject(MenuRouterKey)

const bpmnFile = ref()
const WorkflowEditorRef = ref()
const state = reactive<any>({
    detail: {},
    loading: false,
    newStatus: false
})


async function getWorkflow() {
    const data = await adminApi.workflowProcessDefinitionController.getDraft(id)
    const blob = await adminApi.workflowVersionController.getBpmnxml({draftId:id, versionNumber:currentVersion}, {
        format: 'blob'
    }) 
    const json = await adminApi.workflowVersionController.getJson({draftId:id, versionNumber:currentVersion}, {})
    // @ts-ignore
    const file = await blob.text()
    draftDetail.value = data.data;
    bpmnFile.value = file
    if(json && json.data){
        WorkflowEditorRef.value.init( bpmnFile.value, JSON.parse(json.data))
    }else{
        WorkflowEditorRef.value.init( bpmnFile.value)
    }
    routerInject?.updateTabName(name + ` - (${currentVersion})`)
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
    if(newName !== name) {
        routerInject?.updateTabName(newName + ` - (${currentVersion})`)
    }
}

provide('workflowDetail',{
    saveDraft,
})

async function saveAsNewVersion(){
    const { xml, x6Json } = WorkflowEditorRef.value.getData()
    const blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
    const form:any = new FormData();
    form.append('id', currentVersion)
    form.append('draftId', id)
    form.append('jsonValue', JSON.stringify(x6Json))
    form.append('file', blob, 'workflow.bpmn.xml')
    
    const {data}:any = await adminApi.workflowVersionController.postNew({requestDTO:{}},form)
    ElNotification.success(t('common.success'))
    routerInject?.updateProps({
        id,
        currentVersion: data.versionNumber,
        productionVersion: data.productionVersion
    })

}

watch(() => id, (newWorkflowId) => {
    if(newWorkflowId) {
        getWorkflow()
    }
},{
    immediate:true
})



</script>

<template>
    <div class="pageContainer">
        <BpmnEditor ref="WorkflowEditorRef" :workflow-data="item" :currentVersion="currentVersion" :id="id" >
            
            <template #actions>
                <template v-if="!productionVersion || productionVersion !== currentVersion">
                    <ElButton type="primary">Promote To Prodocution : {{ currentVersion }}</ElButton>
                </template>
                <ElButton type="primary" @click="saveAsNewVersion">Save As New Version</ElButton>
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
    overflow: hidden;
}
</style>