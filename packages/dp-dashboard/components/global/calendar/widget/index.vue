<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs'
import type { CalendarEventExternal } from '@schedule-x/calendar'

const { t } = useI18n()
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
const CalendarRef = ref()
const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async (setting: any) => {
    if (CalendarRef.value?.refresh) CalendarRef.value.refresh()
  }
})
const newEvent = ref([])
const eventDialogRef = ref()

async function handleDelete() {
  emits('delete')
}

function editEvent(event: CalendarEventExternal) {
  eventDialogRef.value.edit(event)
}

function popNewEvent(dateTime: string) {

}

function updateEvent(params: CalendarEventExternal) {
  newEvent.value = params
}

function openNewEventDialog() {
  eventDialogRef.value.open()
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
    <el-button id="HomePage__Calendar__NewEvent" @click="openNewEventDialog">{{ $t('New Event') }}</el-button>
    <el-skeleton v-if="!hideSetting && !showPreview" :rows="5"></el-skeleton>
    <Calendar v-else ref="CalendarRef" :options="setting" @openDetail="editEvent" @createEvent="popNewEvent"
              @updateEvent="updateEvent" />
    <CalendarWidgetDialog ref="eventDialogRef" :options="setting" @reload="refresh" />
    <CalendarWidgetSetting ref="settingRef" :setting="setting" @submit="(setting) => $emit('refreshSetting', setting)"
                           @delete="handleDelete" />
  </DashboardCard>
</template>

<style lang="scss" scoped></style>
