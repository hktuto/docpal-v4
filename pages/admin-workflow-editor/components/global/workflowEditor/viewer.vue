<script lang="ts" setup>
import { adminApi } from 'api';
import {BpmnViewer} from '#components'
const { id } = defineProps<{
    id: string
}>()

const loading = ref(false)
const viewerRef = ref<InstanceType<typeof BpmnViewer>>();
async function getData() {
    loading.value = true;
    const xmlBlob = await adminApi.workflowProcessDefinitionController.getXml(id, {
        format: 'blob'
    }) as unknown as Blob
    const bpmn = await xmlBlob.text()
    const { data: x6Json} = await adminApi.workflowProcessDefinitionController.getJson(id, {})
    viewerRef.value?.init(bpmn, x6Json)
    loading.value = false;
}

onMounted(() => {
    getData()
})
</script>

<template>
    <BpmnViewer ref="viewerRef" :options="{}" />
</template>