<template>
  <el-card
    class="dashboard-item dashboard-item-main"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4>{{$t('dashboard.workflowGroup')}}</h4>
      <SvgIcon
        v-if="!hideSetting"
        src="/icons/setting.svg"
        style="--icon-size: 1.14rem; --icon-color: #8796a4"
        @click="openSetting"
      />
    </template>
    <div class="chartContainer">
      <WorkflowGroupDetailFilter :filterList="setting.filterHeaderList" @change="handleChange"/>
      <!-- <el-divider /> -->
      <WorkflowGroupDetailList ref="WorkflowGroupDetailListRef" :dates="dates" :setting="setting" :data="state.data" :groupId="setting.groupId" />
    </div>
    <WorkflowGroupDialog
      ref="settingRef"
      :setting="setting"
      @delete="handleDelete"
      @refresh="handleRefresh"
    />
  </el-card>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean;
  }>(),
  {
    setting: {},
    hideSetting: false,
  }
);
const emits = defineEmits(["refreshSetting", "delete"]);
const state = reactive({
  data: [],
  isLoad: false
});
const WorkflowGroupDetailListRef = ref({})
function resize() {
  
}
const settingRef = ref();
function openSetting() {
  settingRef.value.handleOpen(props.setting);
}
function handleDelete() {
  emits("delete");
}
function handleRefresh(chartSetting) {
  emits("refreshSetting", chartSetting);
}
function handleChange(form) {
  WorkflowGroupDetailListRef.value.handleCommonFilterChange(form)
}
defineExpose({
  resize,
});
</script>

<style lang="scss" scoped>
.dashboard-item-main {
  display: grid;
  grid-template-rows: min-content 1fr;
  overflow: hidden;
  background-color: var(--setting-color, #fff);
}
.dashboard-item-main :deep(.el-card__body) {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.dashboard-item-main :deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
  border-bottom: unset;
  padding: var(--app-space-xs);
  h4 {
    padding: unset;
    margin: unset;
    color: #464646;
    font-size: 18px;
    font-family: Arial;
  }
}
.chartContainer {
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: var(--app-space-xs);
}
</style>
