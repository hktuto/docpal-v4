<script lang="ts" setup>
const { item } = defineProps<{
    item: any
}>()
const elRef = ref();

</script>

<template>
<div ref="elRef" class="item">
    {{  item.name }}
</div>
    
</template>

<style lang="scss" scoped>

</style>