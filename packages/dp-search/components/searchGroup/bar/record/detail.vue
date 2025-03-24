<script lang="ts" setup>
const props = defineProps(["query"]);
const emits = defineEmits(["cancel"]);
const filterRef = ref();
const label = ref('')
function handleSearch() {}
function init() {
  filterRef.value.initForm(query)
}
defineExpose({ filterRef, init });
</script>
<template>
  <div class="search-bar-detail">
    <div>
      <el-input v-model="label" :placeholder="$t('dpTable_label')"></el-input>
    </div>
    <div>
      <SearchGroupBar2 ref="filterRef" @search="handleSearch"></SearchGroupBar2>
    </div>
    <div>
      <el-button type="info" @click="emits('cancel')">{{ $t("cancelText") }}</el-button>
      <el-button type="primary">{{ $t("common_submit") }}</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-bar-detail {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: var(--app-space-xs)
}
</style>
