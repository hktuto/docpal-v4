<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t('dashboard.PersonalShareInternalOther')"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <PersonalShareInternalOtherTable ref="tableRef" />
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

const tableRef = ref()
const { cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: (setting: any) => {
    tableRef.value.query({})
  }
})
async function handleDelete() {
  emits('delete')
}
</script>
<style lang="scss" scoped></style>
