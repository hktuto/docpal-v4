<script lang="ts" setup>
import type { Node } from '@antv/x6'
const { node } = defineProps<{
    node:Node
}>()

</script>

<template>
<div class="fromContainer">
    StartEvent
    {{ node }}
</div>
</template>