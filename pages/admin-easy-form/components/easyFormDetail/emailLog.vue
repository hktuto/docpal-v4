<template>
  <el-card >
    <h3 class="title">{{ $t("easyForm.emailLog") }}</h3>
    <EasyFormEmailLog ref="tableRef" :easyFormId="detail.id" />
  </el-card>
</template>
<script lang="ts" setup>
const props = defineProps(["detail"]);
const tableRef = ref()
defineExpose({ tableRef })
</script>
<style lang="scss" scoped>
:deep(.el-card__body) {
  height: 80vh;
  display: grid;
  grid-template-rows: min-content 1fr;
}
</style>
