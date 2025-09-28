<script setup lang="ts">
import type { CalendarEventExternal } from '@schedule-x/calendar'

const props = defineProps<{
  messageEvent: any
}>()
const userId = useUserId()
const showDetail = ref(false)
const calendarRef = ref()
const options = ref({
  title: '',
  showUserFilter: true,
  showCategoryFilter: true,
  showLocationFilter: true,
  view: 'week',
  firstDayOfWeek: 'MONDAY',
  allowCreate: false,
  editable: false
})
const event = ref({
  id: '',
  eventName: '',
  eventDescription: '',
  location: '',
  locationName: '',
  category: '',
  startTime: '',
  endTime: '',
  user: '',
  isEdit: undefined
})
const { setting: calendarSetting, categoriesOption, locationsOption } = useCalendarStore()

const rejectEventDialogRef = ref()

function init() {
  // get location list and category
  console.log(222, calendarSetting, categoriesOption, locationsOption)
}

function openDetail(eventExternal: CalendarEventExternal) {
  // 更新props.event的數據
  event.value = {
    id: eventExternal.detail.eventId,
    eventName: eventExternal.title,
    category: eventExternal.calendarId,
    eventDescription: eventExternal.detail.eventDescription,
    location: eventExternal.detail.location,
    isAllDay: eventExternal.detail.isAllDay,
    startTime: eventExternal.start,
    endTime: eventExternal.end,
    user: eventExternal.detail.relatedUsers.user
  }

  const location = locationsOption.value.find((item: any) => item.id === eventExternal.detail.location)
  event.value.locationName = location ? location.name : ''
  const categories = categoriesOption.value.find((item: any) => item.id === eventExternal.calendarId)
  if (categories) {
    event.value.categoriesName = categories.name

    // 檢查用戶是否有權限操作
    const updatePermission = categories.permission.update
    // TODO： 權限組沒辦法檢查
    if (!!updatePermission.USERS && updatePermission.USERS.length > 0) {
      event.value.isEdit = updatePermission.USERS.includes(userId.value)
    } else {
      event.value.isEdit = false
    }
  } else {
    event.value.categoriesName = ''
  }
  showDetail.value = true
}

function handleRejectEvent() {
  // 打開 dialog
  rejectEventDialogRef.value.openDialog(event)
  // 執行update event的操作
}

function handleAcceptEvent() {}

function getCategoryName(id: string) {
  if ('' === id) return
  const filter = categoriesOption.value.find((item: any) => item.id === id)

  return filter ? filter.name : ''
}

function getLocationName(id: string) {
  if ('' === id) return
  const filter = locationsOption.value.find((item: any) => item.id === id)
  return filter ? filter.name : ''
}

onMounted(() => {
  showDetail.value = false
  init()
})
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <div class="scrollable">
        <Calendar ref="calendarRef" :options="options" @openDetail="openDetail" />
      </div>
    </el-col>
    <el-col :span="8">
      <div v-if="showDetail && event.isEdit !== undefined && !event.isEdit">
        <h2 style="color: #9e9e9e">{{ $t('Event Detail') }}</h2>
        <el-space direction="vertical" alignment="stretch" class="left-aligned">
          <el-text size="small" tag="p" line-clamp="2">{{ $t('Information') }}</el-text>
          <el-text tag="b">{{ $t('Name') }}: {{ event.eventName }}</el-text>
          <el-text tag="b">{{ $t('Description') }}: {{ event.eventDescription }}</el-text>
          <el-text tag="b">{{ $t('Location') }}: {{ event.locationName }}</el-text>
          <el-text tag="b">{{ $t('Category') }}: {{ event.categoriesName }}</el-text>
          <el-text tag="b">{{ $t('StartTime') }}: {{ event.startTime }}</el-text>
          <el-text tag="b">{{ $t('EndTime') }}: {{ event.endTime }}</el-text>
        </el-space>
      </div>

      <!--  update form  -->

      <div v-if="showDetail && event.isEdit !== undefined && !event.isEdit">
        <el-divider />
        <el-text>{{ $t('Response') }}</el-text>
        <div style="text-align: right">
          <el-button type="warning" size="large" @click="handleRejectEvent">{{ $t('Reject') }}</el-button>
          <el-button type="primary" size="large" @click="handleAcceptEvent">{{ $t('Accept') }}</el-button>
        </div>
      </div>
    </el-col>
  </el-row>

  <CalendarRejectEventDialog ref="rejectEventDialogRef" :categoriesOption="categoriesOption" />
</template>

<style scoped lang="scss">
.scrollable {
  max-height: 90vh;
  overflow-y: auto;
}

.left-aligned {
  text-align: left;
}
</style>
