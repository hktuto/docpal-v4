<template>
  <DashboardCard ref="cardRef" class="dp-dashboard--card__padding" :hideSetting="hideSetting" :title="$t('dashboard.PersonalDashboard')" :setting="setting" @delete="handleDelete">
    <PersonalDashboardTable />
  </DashboardCard>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

const emits = defineEmits(['delete'])
const { t } = useI18n()
const props = withDefaults(defineProps<{
  dates?: any;
  setting?: any;
  hideSetting?: boolean,
}>(), {
  setting: {},
  hideSetting: false
})

async function handleDelete() {
  emits('delete')
}

function resize() {
}

defineExpose({ resize })
</script>
<style lang="scss" scoped>
:deep .vxe-toolbar {
  display: none;
}
</style>
