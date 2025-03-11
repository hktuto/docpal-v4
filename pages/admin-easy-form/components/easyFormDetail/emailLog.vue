<template>
  <el-card >
    <h3 class="title">{{ $t("easyForm.emailLog") }}</h3>
    <EasyFormEmailLog :easyFormId="detail.id" />
  </el-card>
</template>
<script lang="ts" setup>
const props = defineProps(["detail"]);
</script>
<style lang="scss" scoped>
:deep(.el-card__body) {
  height: 80vh;
}
</style>
