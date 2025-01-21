<template>
  <el-form ref="FormRef" label-position="top"
    :model="form" @submit.prevent>
    <el-formItem label="workflow" prop="workflow"
        :rules="[{ required: true, message: $t('form_common_requird')}]">
        <el-select v-model="form.workflow" filterable allow-create @change="handleChange">
          <el-option v-for="item in state.options" :key="item.key" 
            :label="item.name" :value="item.key">
          </el-option>
        </el-select>
    </el-formItem>
  </el-form>
  <div v-if="bpmnFile" class="bpmn-container">
    <WorkflowEditorViewer v-loading="state.workflowLoading" :bpmn="bpmnFile">
    </WorkflowEditorViewer>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Graph, Node } from "@antv/x6";

import { adminApi } from 'api'

const caseManagementDetailProvider = inject(CaseManagementDetailProviderKey)
if(!caseManagementDetailProvider) {
    throw new Error('CaseManagementDetailProviderKey not found')
}

const props = withDefaults(defineProps<{
  graph: Graph,
  node: Node
}>(),{
})
const {node} = toRefs(props)
const form = ref<any>({
  workflow: ''
})
const state = reactive<any>({
  options: [],
  workflowLoading: false
})
const bpmnFile = ref()
function init(nodeData: any) {
  try {
    form.value.workflow = nodeData.data.processRefExpression.__cdata
    if(form.value.workflow) getBpmn(form.value.workflow)
  } catch (error) {
    
  }
}
function handleChange(value: string) {
  try {
    const nodeData = node.value.data
    if(!nodeData.data.processRefExpression) nodeData.data.processRefExpression = {}
    nodeData.data.processRefExpression.__cdata = value
    getBpmn(value)
  } catch (error) {
    dpLog('processRefExpression error')
  }
}
const getBpmn = async (processKey: string) => {
  state.workflowLoading = true
  try {
    const blob = await adminApi.api.postWorkflowProcessModel({
      processKey
    }, {
      format: 'blob'
    })
    const text = await blob.text()
    bpmnFile.value = text
  } catch (error) {
    
  }
  state.workflowLoading = false
}
onMounted(async() => {
  const { data} = await adminApi.api.postWorkProcessList({requestDTO:{}})
  state.options = data
})
watch(node, ()=> {
  if(node.value) {
    init(node.value.data)
  }
},{
  immediate: true
})
</script>
<style lang="scss" scoped>
.bpmn-container {
  height: 200px;
  width: 100%;
  .workflowEditorViewerContainer {
    border: 1px solid #ddd;
  }
}
</style>