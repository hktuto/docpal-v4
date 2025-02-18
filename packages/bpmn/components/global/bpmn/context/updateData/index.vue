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
    attr_source: "form",
    attr_updateFieldName: "",
    attr_step: "1"
}
const conditions = ref();


function refreshData() {
    console.log("refreshData")
    const nodeData = node.getData()
    if(nodeData.data?.extensionElements && nodeData.data?.extensionElements['flowable:field']) {  
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

function updateCondition() {
    const nodeData = node.getData()
    const newData = {
        ...nodeData,
        version: nodeData.version + 1 || 1,
        data:{
            ...nodeData.data,
            extensionElements:{
                ...nodeData.data.extensionElements,
                'flowable:field': JSON.parse(JSON.stringify(conditions.value))
            }
        }
    } 
    console.log("condition update", newData)
    node.setData(newData, { overwrite: true, deep: true })
}

watch(conditions, (newVal) => {
    if(newVal){
        updateCondition()
    }
},{
    deep: true
})

onMounted(async () => {
    setUpListener()
    refreshData()
})

</script>


<template>
    <div class="formContainer">
        <BpmnSidebarEditLabel :node="node" />
        <div class="conditionContainer">
            <BpmnContextUpdateDataCondition v-for="(item, index) in conditions" :key="index" :condition="item" :disabled="editorProvider.readonly.value" @remove="removeCondition(index)" />
            <div class="addCondition">
                <ElButton text :disabled="editorProvider.readonly.value" @click="addCondition">Add</ElButton>
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
    place-items: center;
}
</style>
