<script lang="ts" setup>
import type { Node } from '@antv/x6'
const { node } = defineProps<{
    node:Node
}>()

</script>

<template>
<div class="fromContainer">
    <BpmnSidebarEditLabel :node="node" />
    <BpmnSidebarEditAssignee :node="node" />
    <BpmnSidebarEditCandidateGroup :node="node" />
    <BpmnSidebarEditForm :node="node" />
</div>
</template>

<style lang="scss" scoped>
.fromContainer{
    overflow: auto;
}
</style>