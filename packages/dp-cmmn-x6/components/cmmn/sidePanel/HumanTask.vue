<script lang="ts" setup>
import { updateExtentionProperties, getExtentionProperties } from '../../../utils/cmmnConfig'
const props = defineProps(['graph', 'node'])
const {node} = toRefs(props)
const { caseId } = useCmmnGraph();
const state = reactive<any>({
    data: [],
    activeName: 'field',
    isStartTask: false
})
const dragHeader = [
    { name: 'name', label: $i18n.t('docType_label') },
    { name: 'type', label: $i18n.t('type'), i18n: 'marsterTable.type.' }
]
function handleSave() {
    const nodeData = node.value.data
    const data = updateExtentionProperties(nodeData.data, 'docpal:form', state.data, caseId.value)
    return state.data
}
function handleSaveStartTask() {
    const cmmnDefaultProps = {
        value: state.isStartTask
    }
    const nodeData = node.value.data
    const data = updateExtentionProperties(nodeData.data, 'docpal:isStartingTask', cmmnDefaultProps , caseId.value)
}
function init(nodeData: any) {
    state.data = getExtentionProperties(nodeData.data, 'docpal:form')
    const isStartingTask = getExtentionProperties(nodeData.data, 'docpal:isStartingTask')
    
    state.isStartTask = isStartingTask && isStartingTask[0] && isStartingTask[0].value
}

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
        <CmmnSidePanelUiHeader title="Human Task" />
        <CmmnSidePanelUiLabel :node="node"/>
        <CmmnSidePanelUiItemControl :node="node"/>
        <CmmnSidePanelUiIsStartTask v-model="state.isStartTask" @change="handleSaveStartTask" />
<!--        <CmmnSidePanelUiAssignee :node="node" :graph="graph" />-->
        <el-tabs v-model="state.activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('workflowEdior.formField')" name="field">
                <CmmnSidePanelDraggable :list="state.data" :graph="graph"
                    :dragHeader="dragHeader" 
                    formJsonUrl="humanTaskFields"
                    @change="handleSave">
                </CmmnSidePanelDraggable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">

</style>
