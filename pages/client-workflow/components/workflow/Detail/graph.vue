<template>
<div class="bpmnContainer">
    <BpmnReplayViewer  ref="viewerRef" :bpmnXml="bpmnFile" :x6Json="x6Json" :steps="steps" autoplay>
    </BpmnReplayViewer>
</div>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
// import VueBpmn from 'vue-bpmn'
const props = withDefaults(defineProps<{
    processDefinitionId?: string,
    processKey?: string,
    deploymentId?:string,
    processDefinitionVersionId?:string,
    steps: any[],
    step: string
}>(),{
  steps: () => []
})

const bpmnFile = ref()
const viewerRef = ref();

const x6Json = ref<any>(null)

const getBpmn = async (processDefinitionId: any, processKey: any) => {
    if (!processDefinitionId && !processKey) return
    const data = processKey
    ? {
        processKey,
        deploymentId: props.deploymentId
        }
    : { processDefinitionId, deploymentId: props.deploymentId }
    const blob: any = await clientApi.api.postWorkflowProcessModel(data, {
        format: 'blob',
    })
    try{
        // TODO : get x6json from server, api required data , frontend does not have this data
        const  jsonResponse = await clientApi.api.getWorkflowVersionJson({versionId:props.processDefinitionVersionId}, {})
        if(jsonResponse.data && JSON.parse(jsonResponse.data)) {
            x6Json.value = JSON.parse(jsonResponse.data)
        }
    }catch(err){
        console.log("err", err)
    }
    // const x6JsonResponse = await clientApi.api.
    const text = await blob.text()
    bpmnFile.value = text;
    viewerRef.value.init(text, x6Json.value);
}


watch(()=> [props.processKey, props.processDefinitionId], async([newKey, newId]) => {
    if (newKey || newId) {
        await getBpmn(newId, newKey)
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.bpmnContainer {
    height: 100%;
  min-height:400px;
    overflow: auto;
}
#modeler-container{
    height: 100%;
    width: 100%;
}

</style>

