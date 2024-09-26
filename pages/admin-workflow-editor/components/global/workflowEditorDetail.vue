<script lang="ts" setup>
import {MenuRouterKey} from '#imports'
import { ElMessageBox } from 'element-plus'
import { adminApi } from 'api';
const menuManager = inject(MenuRouterKey)
const { t } = useI18n()
if(!menuManager) {
    throw createError('menu manger not found')
}
const { id } = defineProps<{
    id:string
}>()

const bpmnFile = ref()
const WorkflowEditorRef = ref()
const state = reactive<any>({
    detail: {},
    loading: false,
    newStatus: false
})

async function getDetail(id: string) {
    const {data } = await adminApi.workflowProcessDefinitionController.getDraft(id)
     state.detail = data
}

async function getXML(id: string) {
    const blob = await adminApi.workflowProcessDefinitionController.getXml(id, {
        format: 'blob'
    }) 
    // @ts-ignore
    const file = await blob.text()
    bpmnFile.value = file
    WorkflowEditorRef.value.init( bpmnFile.value)
}
async function handleSave(isDraft: boolean = true) {

    const formRequest = await WorkflowEditorRef.value.validateForm()
    if(!state.detail.draftId) return
    console.log("handleSave")
    state.loading = true
    try {
        const { blob, name, key } = WorkflowEditorRef.value.save()
        const formData = new FormData();
        
        formData.append('name', name)
        formData.append('key', key)
        formData.append('draftId', state.detail.draftId)
        formData.append('file', blob, 'workflow.bpmn.xml')
        formData.append('isDraft', isDraft)
        const { data } = await adminApi.workflowProcessDefinitionController.postUpload({},formData)
        state.detail = await data
        if(!isDraft){
        
        await Promise.all(formRequest.map((param: any) => {
             return adminApi.formPropertiesRelationController.postSave(param)
        }))
        }
    } catch (error) {
    console.log(error)
    }

    state.loading = false
}
async function handleDeactive() {
    const action = await ElMessageBox.confirm(`${t('msg.confirmWhetherToDeactivate')}`)
    if(action !== 'confirm') return
    state.loading = true
    try {
        await adminApi.workflowProcessDefinitionController.deleteSuspend(state.detail.draftId)
        getDetail(id as string)
    } catch (error) {
    }
    state.loading = false
    }
async function handleActive() {
    state.loading = true
    try {
        await adminApi.workflowProcessDefinitionController.postActive(state.detail.draftId)
        // await ActiveWorkflowApi(state.detail.draftId)
        getDetail(id as string)
    } catch (error) {
    }
    state.loading = false
}

onActivated(() => {
    getDetail(id)
    getXML(id)
})

</script>

<template>
    <div class="pageContainer">
        <BpmnEditor ref="WorkflowEditorRef"  >
            <template #actions>
                <el-button v-if="state.detail.publishStatus === 'A' && state.detail.status === 'A'" :loading="state.loading" type="info" @click="handleDeactive()">{{$t('actions.inactive')}}</el-button>
                <el-button v-else-if="state.detail.status === 'A'" :loading="state.loading" type="info" @click="handleActive()">{{$t('actions.active')}}</el-button>
                <el-button :loading="state.loading" type="primary" @click="handleSave(true)">{{$t('button.saveDraft')}}</el-button>
                <el-button v-if="state.detail.status !== 'A'" :loading="state.loading"  type="primary" @click="handleSave(false)">{{$t('button.publish')}}</el-button>
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