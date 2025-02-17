<script lang="ts" setup>
import type { Node } from '@antv/x6'
const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);
if(!graphProvider || !editorProvider) {
    throw createError('graph provider not found')   
}


const defaultCondition = {
    attr_type: "Update_Number",
    attr_function: "Increase_By",
    source: "",
    updateFieldName: "",
    step: "1"
}
const conditions = ref();


function refreshData() {
    const nodeData = node.getData()
    if(nodeData.data?.extensionElement && nodeData.data?.extensionElements['flowable:field']) {
        conditions.value = nodeData.data.extensionElements['flowable:field']
    }else{
        conditions.value = [{...defaultCondition}]
    }

}

function addCondition(){
    conditions.value.push({...defaultCondition})
}
function removeCondition(index:number){
    if(conditions.value.length === 1) return 
    conditions.value.splice(index, 1)
}

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
      refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
      refreshData()
    })
}

onMounted(async () => {
    setUpListener()
    refreshData()
})

</script>


<template>
    <div class="formContainer">
        <BpmnSidebarEditLabel :node="node" />
        <div class="conditionContainer">
            <BpmnContextUpdateDataCondition v-for="(item, index) in conditions" :key="index" :condition="item" @remove="removeCondition(index)" />
            <div class="addCondition">
                <ElButton text @click="addCondition">Add</ElButton>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.conditionContainer{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-s);
}
.addCondition{
    width: 100%;
    display: grid;
    place-item: center;
}
</style>
