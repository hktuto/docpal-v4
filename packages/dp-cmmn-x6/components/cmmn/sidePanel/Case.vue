<script lang="ts" setup>
import { updateExtentionProperties, getExtentionProperties } from '../../../utils/cmmnConfig'
import {Graph, Node} from "@antv/x6";
const props = defineProps<{
    graph: Graph,
    node: Node
}>()
const { caseId } = useCmmnGraph();
const {node} = toRefs(props)
const state = reactive<any>({
    activeName: 'field',
    data: []
})
const dragHeader = [
    { name: 'name', label: $i18n.t('docType_label') },
    { name: 'type', label: $i18n.t('type'), i18n: 'marsterTable.type.' }
]
const isDataNormal = computed(() => props.graph && props.node && props.node.data  )
function init(nodeData: any) {
    const casePlanModel = nodeData.data.casePlanModel ? nodeData.data.casePlanModel : nodeData.data.data.casePlanModel
    state.data = getExtentionProperties(casePlanModel, 'docpal:form')
}

function handleSave() {
    const nodeData = node.value.data
    const casePlanModel = nodeData.data.casePlanModel ? nodeData.data.casePlanModel : nodeData.data.data.casePlanModel
    const data = updateExtentionProperties(casePlanModel, 'docpal:form', state.data, caseId.value)
    const newData = {
        ...nodeData,
        version: nodeData.version + 1 || 1,
        data:{
            ...nodeData.data,
            casePlanModel:{
                ...nodeData.data.casePlanModel,
                extensionElements:{
                    ...nodeData.data.casePlanModel.extensionElements,
                    'docpal:form':data
                }
            }
        }
    }
    console.log("handleSave", newData)
    node.value.setData(newData, {
        overwrite: true
    })
}
watch(node, ()=> {
    if(node.value) {
        console.log({node});
        init(node.value.data)
    }
},{
    immediate: true
})
</script>

<template>
    <div class="cmmnSidebarItemContainer">
        <CmmnSidePanelUiHeader title="Case Setting" />
        <template v-if="isDataNormal">
            <CmmnSidePanelUiLabel :node="node" />
            <!-- <CmmnSidePanelUiLabel :node="node" disabled/> -->
            <el-tabs v-model="state.activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('workflowEdior.formField')" name="field">111
                    <CmmnSidePanelDraggable 
                        :list="state.data" 
                        :dragHeader="dragHeader" 
                        formJsonUrl="field"
                        @change="handleSave">
                    </CmmnSidePanelDraggable>
                </el-tab-pane>
            </el-tabs>
        </template>
        <template v-else>
            <template v-if="!graph">
                No Case Design is loaded, please load a case design
            </template>
            <template v-else>
               something wrong : Case Node Data is not normal
                <pre>{{ node }}</pre>
            </template>
        </template>
    </div>
</template>

<style scoped lang="scss">

</style>
