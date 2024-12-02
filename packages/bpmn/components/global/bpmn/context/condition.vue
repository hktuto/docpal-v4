<script lang="ts" setup>

import type { Node } from '@antv/x6'
const { node } = defineProps<{
    node:Node
}>()

const form = ref();

function refreshData() {
    if(!node.data || !node.data.data || !node.data.data.extensionElements || !node.data.data.extensionElements['"docpal:decisionTable']){
        node.setData({
            ...node.data,
            data:{
                ...node.data.data,
                extensionElements:{
                    ...node.data.data.extensionElements,
                    "docpal:decisionTable":{
                        orConditionElements:[]
                    }
                }
            }
        })
    }
    form.value = node.data.data.extensionElements['docpal:decisionTable'].orConditionElements
}

function addNewCondition(){
    const newData = {
        type:"String_Validation" ,
        source:"form",
        fieldName:'',
        condition:"is",
        target:"string",
        targetValue:""
    }
    form.value.push({
        element:[newData]
    })
}

watch(() => node, ()=> {
  if(node) {
    refreshData()
  }
},{
  immediate: true,
  deep: true
})

</script>

<template>
    <div class="formContainer">
        <BpmnSidebarEditLabel :node="node" />
        <div class="listContainer">
            <div class="title">Conditions</div>
            <div class="conditions">
                <BpmnSidebarConditionGroup v-for="(element,index) in form" :key="index" :elements="element.element" :index="index" />
            </div>
            <div class="addNewContainer" @click="addNewCondition">
                  <Icon name="lucide:circle-plus" />
                  <div class="label">And</div>  
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.formContainer{
    display: grid;
    grid-template-rows: min-content 1fr;
    gap: var(--app-space-xs);
    height: 100%;
    overflow: hidden;
    position: relative;
}
.listContainer{
    height: 100%;
    overflow: auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-xs);
    width:100%;
}
.addNewContainer{
    width:100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: var(--app-space-xs);
    cursor: pointer;
    font-size: var(--app-font-size-s);
    &:hover {
        color: var(--app-main-color);
    }
}
.conditions{
    min-height: var(--app-space-s);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-xs);
}
</style>