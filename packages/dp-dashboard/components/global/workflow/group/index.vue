<template>
  <DashboardCard ref="cardRef" :hideSetting="hideSetting" class="dp-dashboard--card__padding" :title="$t('dashboard.workflowGroup')" :setting="setting" :settingRef="settingRef" @delete="handleDelete">
    <div class="chartContainer">
      <WorkflowGroupDetailFilter :filterList="setting.filterHeaderList" @change="handleChange" />
      <!-- <el-divider /> -->
      <WorkflowGroupDetailList ref="WorkflowGroupDetailListRef" :dates="dates" :setting="setting" :data="state.data" :groupId="setting.groupId" />
    </div>
    <WorkflowGroupDialog ref="settingRef" :setting="setting" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)
const emits = defineEmits(['refreshSetting', 'delete'])
const state = reactive({
  data: [],
  isLoad: false
})
const WorkflowGroupDetailListRef = ref({})
function resize() {}
const settingRef = ref()
function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function handleChange(form) {
  WorkflowGroupDetailListRef.value.handleCommonFilterChange(form)
}
defineExpose({
  resize
})
</script>

<style lang="scss" scoped>
.chartContainer {
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: var(--app-space-xs);
}
</style>
