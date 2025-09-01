<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t('dashboard.PersonalDashboard')"
    :setting="setting"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <PersonalDashboardTable ref="tableRef" />
  </DashboardCard>
</template>
<script lang="ts" setup>
const emits = defineEmits(['delete'])
const { t } = useI18n()
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

async function handleDelete() {
  emits('delete')
}
const tableRef = ref()
const { cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: (setting: any) => {
    tableRef.value.query({})
  }
})

defineExpose({})
</script>
<style lang="scss" scoped>
:deep(.vxe-toolbar) {
  display: none;
}
</style>
