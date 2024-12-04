<script lang="ts" setup>
import {CONDITION_PROVIDER} from '#imports'
import type { Node } from '@antv/x6'
import { adminApi } from 'api';
const { node } = defineProps<{
    node:Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
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
    console.log("refreshData", node.data.data.extensionElements['docpal:decisionTable'].orConditionElements)
    form.value = JSON.parse(JSON.stringify(node.data.data.extensionElements['docpal:decisionTable'].orConditionElements))
}

function updateNode(){
    graphProvider?.graph.value?.startBatch('update-node-data');
    const newData = {
        ...node.data,
        version: node.data.version+1 || 0,
        data:{
            ...JSON.parse(JSON.stringify(node.data.data)),
            extensionElements:{
                ...JSON.parse(JSON.stringify(node.data.data.extensionElements)),
                "docpal:decisionTable":{
                    orConditionElements: [...JSON.parse(JSON.stringify(form.value))]
                }
            }
        }
    }
    node.setData(newData,{ overwrite: true, deep: true, silent:false })
    graphProvider?.graph.value?.stopBatch('update-node-data')

    console.log("condition change", node.data)
}

function addNewCondition(){
    const newData = {
        attr_id: 'element_' + new Date().getTime(),
        attr_type:"String_Validation" ,
        attr_source:"form",
        attr_fieldName:'',
        attr_condition:"is",
        attr_target:"string",
        attr_targetValue:""
    }
    form.value.push({
        element:[newData]
    })
    updateNode();
}

function deleteCondition(index:number){
    form.value.splice(index, 1)
    updateNode();
}

function updateCondition(newVal:any, index:number){
    form.value[index].element = newVal
    updateNode();
}

const userGroupOption = ref<any[]>([]);
async function getUserGroup() {
    const data = await adminApi.identityNuxeo.postGroups3();
    if(data.data){
        userGroupOption.value = data.data
    }
}
const masterTableOption = ref<any[]>([]);
async function getMasterTable() {
    const data = await adminApi.masterTableController.getTables();
    
    if(data.data){
        masterTableOption.value = data.data
    }else{
        masterTableOption.value = []
    }
    console.log("getMasterTable", masterTableOption.value)
}

const caseTableOption = ref<any[]>([]);
async function getCaseTable() {
    const data = await adminApi.caseTableController.getTables();
    
    if(data.data){
        caseTableOption.value = data.data
    }else{
        caseTableOption.value = []
    }
    console.log("getCaseTable", caseTableOption.value)
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
    getUserGroup()
    getMasterTable()
    getCaseTable()
})
watch(() => node, ()=> {
  if(node) {
    refreshData()
  }
},{
  immediate: true,
  deep: true
})

provide(CONDITION_PROVIDER,{
    masterTableOption,
    userGroupOption,
    caseTableOption
})

</script>

<template>
    <div class="formContainer">
        <BpmnSidebarEditLabel :node="node" />
        <div class="listContainer">
            <div class="title">Conditions</div>
            <div class="conditions">
                <div v-for="(element,index) in form" :key="index" class="group">
                    <BpmnSidebarConditionGroup  
                        :elements="element.element" 
                        :index="index"
                        @delete="deleteCondition" 
                        @update="(newVal:any) => updateCondition(newVal, index)" 
                    />
                    <div class="addNewContainer" @click="addNewCondition">
                        <Icon name="lucide:circle-plus" />
                        <div class="label">And</div>  
                    </div>
                </div>
                <div v-if="form.length === 0" class="addNewContainer" @click="addNewCondition">
                        <Icon name="lucide:circle-plus" />
                        <div class="label">And</div>  
                    </div>
               
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
    overflow: hidden;
    display: grid;
    grid-template-rows: min-content 1fr ;
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
    height: 100%;
    overflow: auto;
    > * {
        width: 100%;
        flex: 0 0 auto;
    }
}
</style>