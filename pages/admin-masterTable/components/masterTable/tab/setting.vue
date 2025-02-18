<template>
  <div class="masterTable-setting" style="height: 100%">
    <MasterTableSettingActive class="card-active" v-bind="props"
      >1</MasterTableSettingActive
    >
    <MasterTableSettingName class="card-name" v-bind="props">2</MasterTableSettingName>
    <MasterTableSettingPermission class="card-permission" v-bind="props"
      >3</MasterTableSettingPermission
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["table", "tableId"]);

// #region module: init
function init() {}
// #endregion
onMounted(() => {
  init();
});
defineExpose({});
</script>

<style lang="scss" scoped>
.masterTable-setting {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content 1fr;
  grid-column-gap: var(--app-space-xs);
  grid-row-gap: var(--app-space-xs);
}

.card-active {
  grid-area: 1 / 1 / 2 / 2;
}
.card-name {
  grid-area: 1 / 2 / 2 / 3;
}
.card-permission {
  grid-area: 2 / 1 / 3 / 3;
}
</style>
