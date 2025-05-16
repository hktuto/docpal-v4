<template>
  <DashboardCard
    ref="cardRef"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t('dashboard.PersonalShareInternalMe')"
    @delete="handleDelete"
  >
    <PersonalShareInternalMeTable />
  </DashboardCard>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

const emits = defineEmits(['delete'])
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
</script>
<style lang="scss" scoped></style>
