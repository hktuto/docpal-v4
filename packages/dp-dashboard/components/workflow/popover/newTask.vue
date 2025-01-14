<template>
<el-dropdown popper-class="auto" trigger="click" @command="workflowClickHandler">
    <el-button type="primary">
        {{$t('workflow_newWorkflow')}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item v-for="wf in state.availableWorkflow" :key="wf.id"
                :command="wf">{{wf.name}}</el-dropdown-item>
        </el-dropdown-menu>
    </template>
</el-dropdown>
<el-dialog v-model="state.formDialogVisible" :title="state.selectedWorkflow.name"
    destroy-on-close append-to-body width="60%"
    :close-on-click-modal="false"
    class="scroll-dialog"
    >
  <ElTabs v-if="!state.loading" v-model="activeName" @tab-change="tabChangeHandler">
    <ElTabPane :label="$t('workflow_form')" name="Form">
      <WorkflowDetailFormRender ref="vFormRef" />
    </ElTabPane>
    <ElTabPane :label="$t('workflow_graph')"  name="Graph">
      <BpmnViewer v-if="activeName === 'Graph'" ref="graphEl" class="graphContent"  step="start" @graphReady="graphReady"/>
    </ElTabPane>
  </ElTabs>


    <template #footer>
        <el-button v-if="activeName === 'Form'" :loading="state.loading" @click="checkAndSubmit">{{$t('workflow_startWorkflow')}}</el-button>
    </template>
</el-dialog>

</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

import {useWorkflow} from "~/composables/useWorkflow";
import { publicApi, adminApi, clientApi } from 'api';
const { formStartHandle } = useWorkflow()
const router = useRouter()
const graphEl = ref()
const emits = defineEmits(['created']);
const activeName = ref('Form')
const state = reactive({
    availableWorkflow: [],
    formDialogVisible: false,
    selectedWorkflow: {},
    bpmnXml: null,
    loading: false
})

function tabChangeHandler(){
    console.log(activeName.value)
    if(activeName.value === 'Graph'){
        nextTick( async() => {
            console.log(state.selectedWorkflow)
            graphEl.value.init(state.bpmnXml)
        })
    }
}
const modelProps = ref('form')

async function getAvailableWorkflow () {
    state.availableWorkflow = await publicApi.api.postWorkflowProcessList({}).then(res => res.data)
}
async function workflowClickHandler (item: Workflow) {
    let step = 'start'
    if (formStartHandle.value[item.key]) {
        const result = formStartHandle.value[item.key].cb(item.key)
        if (result && result.step) {
            step = result.step
        } 
        if (!formStartHandle.value[item.key].isContinue) {
            return
        }
    }
    
    state.formDialogVisible = true
    state.selectedWorkflow = deepCopy(item)
    initForm(item.key, step)
    // createWorkflowForm.value = await workflowStore.getFromProperties(item.key)

    // opened.value = true

    // // vform
    // const formData = await formInit(createWorkflowForm.value)
    // const formJson = await handleTaskFormJsonGet(selectedWorkflow.value)
    // VformRenderRef.value.setFormDataAndJson(formJson, formData, createWorkflowForm.value)
}
// #region module: vform
    const vFormRef = ref()
    async function checkAndSubmit () {
        const data = await vFormRef.value.getFormData()
        if(data) {
            const form = {
                processKey: state.selectedWorkflow.key,
                businessKey: data.businessKey || "",
                properties: Object.entries(data).reduce((newObj, [key, val]) => {
                    if (val || val === false) newObj[key]= val
                    return newObj;
                },{}),
            }
            state.loading = true
            try {
                await clientApi.api.postWorkflowProcessStart(form).then(res => res.data)
                state.formDialogVisible = false
                ElMessage.success('Workflow created')
                emits('created')
            } catch (error) {

            }
        }
        state.loading = false
    }
    async function initForm (processKey) {
        const props = await clientApi.api.postWorkflowProperties({ processKey }).then(res => res.data)
        const formData = formDataGet(props)
        const formJson = await formJsonGet('start', processKey)
        setTimeout(() => {
            vFormRef.value.setForm(formJson, formData, props)
        })
        const blob = await clientApi.api.postWorkflowProcessModel({ processKey }, {
            format: 'blob'
        })
        const text = await blob.text()
        state.bpmnXml = text
        
    }
    function graphReady(){
        graphEl.value.autoLayout(state.bpmnXml)
    }
    function formDataGet (propList) {
        return propList.reduce((prev, item) => {
                    prev[item.id] = item.value
                    return prev
                }, {})
    }
    async function formJsonGet (userTaskId:string, processKey:string) {
        const response = await clientApi.api.getRelationQuery({relation:{userTaskId, processKey}}).then(res => res.data)
        if (!response[0] ||
            response[0] && !response[0].jsonValue) return {}
        return JSON.parse(response[0].jsonValue)
    }
// #endregion
onMounted(() => {
    getAvailableWorkflow()
})
defineExpose({ workflowClickHandler })
</script>
<style lang="scss" scoped>
.graphContent{
    height: 500px;
}
</style>
