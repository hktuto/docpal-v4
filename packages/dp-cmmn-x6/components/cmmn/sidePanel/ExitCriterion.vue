<script lang="ts" setup>
import { getCriterias, setCriterias } from '../../../utils/cmmnConfig'
const props = defineProps(['graph', 'node'])
const {node} = toRefs(props)
type criteria = {
    properties: string,
    calc: 'notEmpty' | 'true' | 'false'
} 
const dragHeader = [
    { name: 'properties', label: 'Properties' },
    { name: 'calc', label: 'Calc' },
    { name: 'value', label: 'Value' }
]
const criteriaList = ref<criteria[]>([])
const state = reactive<any>({
    activeName: 'criteria'
})
function init(nodeDate: any) {
    criteriaList.value = getCriterias(nodeDate)
}
function handleSave() {
    const nodeData = node.value.data
    const data = setCriterias(nodeData, criteriaList.value)
    return criteriaList.value
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
        <CmmnSidePanelUiHeader title="Exit Criterion" />
        <CmmnSidePanelUiLabel :node="node"/>
        <el-tabs v-model="state.activeName" @tab-click="handleClick">
            <el-tab-pane label="Criteria" name="criteria">
                <CmmnSidePanelDraggable :list="criteriaList" :graph="graph"
                    :dragHeader="dragHeader" 
                    formJsonUrl="sentry"
                    @change="handleSave">
                </CmmnSidePanelDraggable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">

</style>