<template>
<EasyFormEmailLog ref="tableRef"  class="pageContainer--padding":easyFormId="id" />
</template>
<script lang="ts" setup>
const props = defineProps(["id"]);
const tableRef = ref()
defineExpose({ tableRef })
</script>
<style lang="scss" scoped>

</style>