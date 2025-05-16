<template>
  <DashboardCard
    ref="cardRef"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t('dashboard.PersonalShareInternalOther')"
    @delete="handleDelete"
  >
    <PersonalShareInternalOtherTable />
  </DashboardCard>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

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
</script>
<style lang="scss" scoped></style>
