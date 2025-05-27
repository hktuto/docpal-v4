<script lang="ts" setup>
const props = defineProps<{
  date: any
  setting?: any
  hideSetting?: boolean
}>()
const emits = defineEmits(['refreshSetting', 'delete'])
const tableRef = ref()
const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async(setting: any) => {
    tableRef.value.query({})
  }
})
function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
</script>

<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="setting.title"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <PersonalWorkflowSingleTable ref="tableRef" :setting="setting" />
    <PersonalWorkflowSingleSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<style lang="scss" scoped></style>
