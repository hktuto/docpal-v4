<script setup lang="ts">
import type { CalendarEventExternal } from '@schedule-x/calendar'
import { adminApi, clientApi } from 'api'

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
const createDialogFormRef = ref()
const rejectEventDialogRef = ref()

const state = reactive({
  workflowKey: '',
  flows: [],
  loading: false,
  formJson: {}
})

async function openDetail(eventExternal: CalendarEventExternal) {
  // 隱藏詳情頁面
  if ('R' === eventExternal.detail.status || 'D' === eventExternal.detail.status) {
    showDetail.value = false
    return
  }

  event.value = {
    id: eventExternal.detail.eventId,
    eventName: eventExternal.title,
    category: eventExternal.calendarId,
    eventDescription: eventExternal.detail.eventDescription,
    location: eventExternal.detail.location,
    isAllDay: eventExternal.detail.isAllDay,
    startTime: eventExternal.start,
    endTime: eventExternal.end,
    user: eventExternal.detail.relatedUsers.user,
    creator: eventExternal.detail.createdBy
  }

  const location = locationsOption.value.find((item: any) => item.id === eventExternal.detail.location)
  event.value.locationName = location ? location.name : ''
  const categories = categoriesOption.value.find((item: any) => item.id === eventExternal.calendarId)
  if (categories) {
    event.value.categoriesName = categories.name

    // workflow 組
    state.flows = categories.flows

    // 檢查用戶是否有權限操作
    const updatePermission = categories.permission.update
    console.log('updatePermission', updatePermission)
    // TODO：權限組沒辦法檢查
    if (!!updatePermission.USERS && updatePermission.USERS.length > 0) {
      event.value.isEdit = updatePermission.USERS.includes(userId.value)
      nextTick(async () => {
        await handleShowUpdateEventDetail()
      })
    } else {
      event.value.isEdit = false
    }
  } else {
    event.value.categoriesName = ''
  }
  showDetail.value = true
}

function handleRejectEvent() {
  // TODO：需要整合
  const flow = state.flows.find((item: any) => {
    if (item.name.toLowerCase().includes('update calendar event')) {
      return item
    }
  })
  if (!flow) return
  state.workflowKey = flow.key

  if (event.isEdit) {
    rejectEventDialogRef.value.openDialog(event)
  } else {
    rejectEventDialogRef.value.openDialogByCreator(event)
  }
}

async function handleShowUpdateEventDetail() {
  const startTime = event.value.startTime.split(' ')
  const endTime = event.value.endTime.split(' ')

  const data = {
    eventId: event.value.eventId,
    eventName: event.value.eventName,
    eventDescription: event.value.eventDescription,
    category: event.value.category,
    location: event.value.location,
    startTime: startTime[0],
    endTime: endTime[0],
    user: event.value.user,
    isAllDay: event.value.isAllDay
  }
  if (!event.value.isAllDay) {
    const time = []
    time.push(`${startTime[1]}:00`)
    time.push(`${endTime[1]}:00`)
    data.time = time
  }

  state.loading = true
  nextTick(async () => {
    try {
      const flow = state.flows.find((item: any) => {
        if (item.name.toLowerCase().includes('update calendar event')) {
          return item
        }
      })
      if (!flow) return
      state.workflowKey = flow.key
      const workflow = await adminApi.api.getWorkflowVersionKeyProcessdefinitionkey(flow.key).then((r) => r.data)
      if (!workflow) return
      state.formJson = await formJsonGet(workflow.processDefinitionKey, workflow.id)
      await setForm(true, data)
      state.loading = false
    } catch (e) {
      console.log(e)
    }
  })
}

async function formJsonGet(processKey: string, versionId: string) {
  const response: any = await clientApi.api.getRelationQuery({
    userTaskId: 'start',
    processKey,
    versionId
  }).then((res: any) => res.data)
  console.log()
  if (!response[0] || (response[0] && !response[0].jsonValue)) return {}
  return JSON.parse(response[0].jsonValue)
}

async function setForm(isEdit: boolean, data: any) {
  if (!state.formJson && '' !== state.formJson) {
    routerProvider?.message.error('The form does not exist')
    return
  }
  nextTick(() => {
    createDialogFormRef.value.setForm(state.formJson)
    createDialogFormRef.value.setFormData(isEdit, data)
  })
}

function handleAcceptEvent() {

}

function handleUpdateEvent() {


}

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
      <div v-if="showDetail">
        <div v-if="event.isEdit !== undefined && !event.isEdit">
          <h2 style="color: #9e9e9e">{{ $t('Event Detail') }}</h2>
          <el-space direction="vertical" alignment="stretch" class="left-aligned">
            <el-text line-clamp="2">{{ $t('Information') }}</el-text>
            <el-text tag="b">{{ $t('Name') }}: {{ event.eventName }}</el-text>
            <el-text tag="b">{{ $t('Description') }}: {{ event.eventDescription }}</el-text>
            <el-text tag="b">{{ $t('Location') }}: {{ event.locationName }}</el-text>
            <el-text tag="b">{{ $t('Category') }}: {{ event.categoriesName }}</el-text>
            <el-text tag="b">{{ $t('StartTime') }}: {{ event.startTime }}</el-text>
            <el-text tag="b">{{ $t('EndTime') }}: {{ event.endTime }}</el-text>
          </el-space>
        </div>

        <!--  update form  -->
        <div v-else v-loading="state.loading" style="max-height: 75vh;overflow-y: auto">
          <CalendarWidgetDialogForm ref="createDialogFormRef" />
        </div>

        <el-divider />
        <el-text>{{ $t('Response') }}</el-text>
        <div style="text-align: right">
          <el-button type="warning" size="large" @click="handleRejectEvent">{{ $t('Reject') }}</el-button>
          <el-button type="primary" size="large" @click="handleAcceptEvent">{{ $t('Accept') }}</el-button>
          <el-button v-if="event.isEdit" type="primary" size="large" @click="handleUpdateEvent">{{ $t('Update') }}
          </el-button>
        </div>
      </div>
    </el-col>
  </el-row>

  <CalendarRejectEventDialog ref="rejectEventDialogRef" :categoriesOption="categoriesOption"
                             :workflowKey='state.workflowKey' />
</template>

<style scoped lang="scss">
.scrollable {
  max-height: 88vh;
  overflow-y: auto;
}

.left-aligned {
  text-align: left;
}
</style>
