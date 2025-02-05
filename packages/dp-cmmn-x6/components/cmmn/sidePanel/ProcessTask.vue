<script lang="ts" setup>
import { updateExtentionProperties, getExtentionProperties } from '../../../utils/cmmnConfig'
import {adminApi} from 'api'
const props = defineProps(['graph', 'node'])
const {node} = toRefs(props)
const state = reactive<any>({
    inData: [],
    outData: [],
    activeName: 'workflow'
})
const inputHeader = [
    { name: 'source', label: 'Case Infomation' },
    { name: 'target', label: 'Workflow Variables' }
]
const outputHeader = [
    { name: 'source', label: 'Workflow Variables' },
    { name: 'target', label: 'Case Information' }
]
function handleSave(type: 'flowable:in'|'flowable:out', data) {
    const nodeData = node.value.data
    updateExtentionProperties(nodeData.data, type, data)
}

const workflowVariable = ref<any[] | null>();
async function init(nodeData: any) {
    try {
        if(nodeData.data.processRefExpression.__cdata) {
            const {data} = await adminApi.api.postWorkflowProperties({processKey:nodeData.data.processRefExpression.__cdata})
            workflowVariable.value = data
        }else{
            workflowVariable.value = null
        }
        state.inData = getExtentionProperties(nodeData.data, 'flowable:in')
        // state.outData = getExtentionProperties(nodeData.data, 'flowable:out')
    } catch (error) {
        workflowVariable.value = null
    }
}
function handleClick() {}
watch(node, async()=> {
    if(node.value) {
        await init(node.value.data)
    }
},{
    immediate: true,
    deep: true
})
</script>

<template>
    <div class="cmmnSidebarItemContainer">
        <CmmnSidePanelUiHeader title="Process Task" />
        <CmmnSidePanelUiLabel :node="node"/>
        <CmmnSidePanelUiItemControl :node="node"/>
        <el-tabs v-model="state.activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('workflow_workflow')" name="workflow">
                <CmmnSidePanelUiWorkflow :node="node" />
            </el-tab-pane>
            <el-tab-pane v-if="workflowVariable" :label="$t('cmmn.input')" name="input">
                <CmmnSidePanelUiWorkflowInOut type="in" :workflowInfos="workflowVariable" />
                <!-- <CmmnSidePanelDraggable :list="state.inData" 
                    :node="node" :graph="graph"
                    :dragHeader="inputHeader" 
                    formJsonUrl="flowableIn"
                    @change="handleSave('flowable:in', state.inData)">
                </CmmnSidePanelDraggable> -->
            </el-tab-pane>
            <el-tab-pane v-if="workflowVariable" :label="$t('cmmn.output')" name="output">
                <CmmnSidePanelUiWorkflowInOut type="out" :workflowInfos="workflowVariable" />
                
                <!-- <CmmnSidePanelDraggable 
                    :node="node" :graph="graph"
                    :list="state.outData" 
                    :dragHeader="outputHeader" 
                    formJsonUrl="flowableOut"
                    @change="handleSave('flowable:out', state.outData)">
                </CmmnSidePanelDraggable> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">

</style>