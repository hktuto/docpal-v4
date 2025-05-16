<script lang="ts" setup>
const props = defineProps<{
  date: any
  setting?: any;
  hideSetting?: boolean;
}>()
const settingRef = ref()
const emits = defineEmits(['refreshSetting', 'delete'])
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
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="setting.title"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
  >
    <PersonalWorkflowSingleTable :setting="setting" />
    <PersonalWorkflowSingleSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh"/>
  </DashboardCard>
</template>

<style lang="scss" scoped>
</style>
