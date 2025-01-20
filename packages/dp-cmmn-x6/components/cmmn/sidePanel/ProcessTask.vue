<script lang="ts" setup>
import { updateExtentionProperties, getExtentionProperties } from '../../../utils/cmmnConfig'
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
    { name: 'target', label: 'Case Infomation' }
]
function handleSave(type: 'flowable:in'|'flowable:out', data) {
    const nodeData = node.value.data
    updateExtentionProperties(nodeData.data, type, data)
}
function init(nodeData: any) {
    try {
        state.inData = getExtentionProperties(nodeData.data, 'flowable:in')
        state.outData = getExtentionProperties(nodeData.data, 'flowable:out')
    } catch (error) {
    }
}
function handleClick() {}
watch(node, ()=> {
    if(node.value) {
        init(node.value.data)
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
            <el-tab-pane :label="$t('cmmn.input')" name="input">
                <CmmnSidePanelDraggable :list="state.inData" 
                    :node="node" :graph="graph"
                    :dragHeader="inputHeader" 
                    formJsonUrl="flowableIn"
                    @change="handleSave('flowable:in', state.inData)">
                </CmmnSidePanelDraggable>
            </el-tab-pane>
            <el-tab-pane :label="$t('cmmn.output')" name="output">
                <CmmnSidePanelDraggable 
                    :node="node" :graph="graph"
                    :list="state.outData" 
                    :dragHeader="outputHeader" 
                    formJsonUrl="flowableOut"
                    @change="handleSave('flowable:out', state.outData)">
                </CmmnSidePanelDraggable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">

</style>