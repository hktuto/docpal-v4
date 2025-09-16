<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs'
import type { CalendarEventExternal } from '@schedule-x/calendar'

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

async function handleDelete() {
  emits('delete')
}

function editEvent(event: CalendarEventExternal) {

}

function popNewEvent(dateTime: string) {

}

function updateEvent(params: CalendarEventExternal) {
  newEvent.value = params
}

const createDialogRef = ref()

function openNewEventDialog() {
  createDialogRef.value.open()
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
    <el-button @click="openNewEventDialog">{{ $t('New Event') }}</el-button>
    <el-skeleton v-if="!hideSetting && !showPreview" :rows="5"></el-skeleton>
    <!--    <Calendar v-else ref="CalendarRef" :options="setting" :editItem="newEvent" @openDetail="editEvent"-->
    <!--              @createEvent="popNewEvent" @updateEvent="updateEvent" />-->
    <Calendar v-else ref="CalendarRef" :options="setting" @openDetail="editEvent" @createEvent="popNewEvent"
              @updateEvent="updateEvent" />
    <CalendarWidgetDialog ref="createDialogRef" @reload="refresh" />
    <CalendarWidgetSetting ref="settingRef" :setting="setting" @submit="(setting) => $emit('refreshSetting', setting)"
                           @delete="handleDelete" />
  </DashboardCard>
</template>

<style lang="scss" scoped></style>
