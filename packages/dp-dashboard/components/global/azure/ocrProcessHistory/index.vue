<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    :hideSetting="hideSetting"
    class="dp-dashboard--card__padding"
    :title="$t('dashboard.azureOcrProcessedHistory')"
    :setting="setting"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <AzureOcrProcessHistoryTable ref="tableRef" :dates="dates" />
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
const tableRef = ref()

// #region module: setting
async function handleDelete() {
  emits('delete')
}
// #endregion
const { cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: () => {
    tableRef.value.reload()
  },
  handleInitCardAction: () => {}
})

defineExpose({})
</script>

<style lang="scss" scoped></style>
