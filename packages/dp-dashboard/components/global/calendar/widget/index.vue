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

const settingRef = ref()
async function handleDelete() {
  emits('delete')
}

onDeactivated(() => {
  if (!props.hideSetting) {
    showPreview.value = false
  }
})
</script>

<template>
  <DashboardCard
    ref="cardRef"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    title="Calendar"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
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
    <Calendar v-else :options="setting" />
  </DashboardCard>
  <CalendarWidgetCreateDialog ref="createDialogRef" />
  <CalendarWidgetSetting ref="settingRef" :setting="setting" @submit="(setting) => $emit('refreshSetting', setting)" @delete="handleDelete" />
</template>

<style lang="scss" scoped></style>
