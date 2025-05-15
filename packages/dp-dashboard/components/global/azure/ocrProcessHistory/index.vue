<template>
  <DashboardCard ref="cardRef" :hideSetting="hideSetting" class="dp-dashboard--card__padding" :title="$t('dashboard.azureOcrProcessedHistory')" :setting="setting" @delete="handleDelete">
    <AzureOcrProcessHistoryTable ref="tableRef" :dates="dates" />
  </DashboardCard>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { watchDebounced } from '@vueuse/core'
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
const { t } = useI18n()
const emits = defineEmits(['refreshSetting', 'delete'])
const tableRef = ref()

// #region module: setting
function resize() {}
async function handleDelete() {
  emits('delete')
}
// #endregion
watchDebounced(
  () => props.dates,
  (newValue, oldValue) => {
    if (!props.dates) return
    if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      // setTimeout(() => tableRef.value.getData() )
    }
  },
  { debounce: 200, maxWait: 500, immediate: true, deep: true }
)
defineExpose({
  resize
})
</script>

<style lang="scss" scoped>

</style>
