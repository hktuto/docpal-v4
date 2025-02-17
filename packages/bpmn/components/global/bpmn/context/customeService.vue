<script lang="ts" setup>
import type { Node } from '@antv/x6'
const { t } = useI18n()
const {node } = defineProps<{
    node: any
}>();

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider){
    throw new Error('Missing provider')
}

const xml = ref("");

function refreshData(){
    const data = node.getData()
    if(!data.data) {
        xml.value = ""
        return;
    }
    console.log("refreshData", data.data)
    const text = jsonToBpmn(data.data)
    console.log("text", text)
    if(text) {
        xml.value = text
    }
}

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
        refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
        refreshData()
    })
}

function xmlChange(e){
    const data = e.target.value
    const json = nodeXmltoJson(data)

    if(json) {
        const nodeData = node.getData()
        const newData = {
            ...nodeData,
            version: nodeData.version + 1 || 1,
            data:{
                ...nodeData.data,
                ...json
            }
        }
        node.setData(newData, {overwrite: true, deep:true})
    }
}

onMounted(() => {
    setUpListener()
    refreshData()
  
})

</script>

<template>
    <div class="formContainer">
        <BpmnSidebarFormLabel :node="node" />
        <div class="xmlEditor">
            <textarea type="text" :value="xml" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" @change="xmlChange" />
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
textarea{
    width: 100%;
    min-height: 500px;
    height: 100%;
}
</style>