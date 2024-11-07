<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { adminApi } from 'api'
const { node } = defineProps<{
    node:Node
}>()

const allEmailTemplates = ref<any>([]);

async function getEmailTemplates(){
    const response = await adminApi.emailController.getAll1()
    allEmailTemplates.value = response.data
}

onMounted(() => {
    getEmailTemplates()
})

</script>

<template>
<div class="fromContainer">
    <BpmnSidebarEditLabel :node="node" />
    <!-- {{ node }} -->
</div>
</template>