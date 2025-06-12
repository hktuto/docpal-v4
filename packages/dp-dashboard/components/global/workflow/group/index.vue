<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    :hideSetting="hideSetting"
    class="dp-dashboard--card__padding"
    :title="$t('dashboard.workflowGroup')"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
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
const WorkflowGroupDetailListRef = ref<any>({})
function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting: any) {
  emits('refreshSetting', chartSetting)
}
function handleChange(form: any) {
  WorkflowGroupDetailListRef.value.handleCommonFilterChange(form)
}

const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleInitCardAction: (setting: any) => {
    // console.log(setting)
  },
  handleRefreshAction: (setting: any) => {
    WorkflowGroupDetailListRef.value.getData()
  }
})
defineExpose({})
</script>

<style lang="scss" scoped>
.chartContainer {
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: var(--app-space-xs);
}
</style>
