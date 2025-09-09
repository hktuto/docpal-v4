<script lang="ts" setup>
const emits = defineEmits(['delete', 'refreshSetting'])
const showPreview = ref(false)
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
const CalendarRef = ref()
const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async (setting: any) => {
    if (CalendarRef.value?.refresh) CalendarRef.value.refresh()
  }
})
onDeactivated(() => {
  if (!props.hideSetting) {
    showPreview.value = false
  }
})
</script>

<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="setting.title ? setting.title : 'Calendar'"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <template #action_prefix>
      <Icon
        id="Dashboard__Home__Detail__Calendar__ShowPreview"
        :name="showPreview ? 'lucide:eye-closed' : 'solar:eye-bold'"
        class="icon-right"
        @click="showPreview = !showPreview"
      />
    </template>
    <el-skeleton v-if="!hideSetting && !showPreview" :rows="5"> </el-skeleton>
    <Calendar v-else ref="CalendarRef" :options="setting" />
    <CalendarWidgetCreateDialog ref="createDialogRef" />
    <CalendarWidgetSetting ref="settingRef" :setting="setting" @submit="(setting) => $emit('refreshSetting', setting)" @delete="handleDelete" />
  </DashboardCard>
</template>

<style lang="scss" scoped></style>
