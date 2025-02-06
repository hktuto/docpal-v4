<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Graph, Node } from "@antv/x6";

import { adminApi } from 'api'

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
        console.log("init", form.value.workflow)
        if(form.value.workflow){

            getBpmn(form.value.workflow)
        }
    } catch (error) {
        console.log("error", error)
    }
}
const bpmnViewerRef = ref();
function handleChange(value: string) {
    try {
        const nodeData = node.value.data
        if(!nodeData.data.processRefExpression) nodeData.data.processRefExpression = {}
        nodeData.data.processRefExpression.__cdata = value
        getBpmn(value)
    } catch (error) {

    }
}
const getBpmn = async (processKey: string) => {
    console.log("getBpmn", processKey)
    state.workflowLoading = true
    try {
        const blob = await adminApi.api.postWorkflowProcessModel({
            processKey
        }, {
            format: 'blob'
        })
        const text = await blob.text()
        bpmnFile.value = text
        nextTick(() => {
            bpmnViewerRef.value.init(text)
        })
    } catch (error) {
        console.log("error", error)
    }
    state.workflowLoading = false
}
onMounted(async() => {
    const { data} = await adminApi.api.postWorkflowProcessList({requestDTO:{}})
    state.options = data
})
watch(node, ()=> {
    console.log("watch node", node.value)
    if(node.value) {
        init(node.value.data)
    }
},{
    immediate: true
})
</script>

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
    <BpmnViewer  ref="bpmnViewerRef">
    </BpmnViewer>
  </div>
</template>

<style lang="scss" scoped>
.bpmn-container {
  height: 400px;
  width: 100%;
  .workflowEditorViewerContainer {
    border: 1px solid #ddd;
  }
}
</style>