<script lang="ts" setup>
import { clientApi } from 'api'
import { createEventWorkflow, updateEventWorkflow } from '#imports'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}
const emits = defineEmits(['reload'])
const { t } = useI18n()
const opened = ref(false)
const { setting: calendarSetting, categoriesOption } = useCalendarStore()
const props = defineProps({
  options: {}
})
const eventDialogFormRef = ref()

const state = reactive({
  workflowKey: '',
  categoryId: '',
  workflowId: '',
  location: '',
  formJson: {},
  loading: false,
  isEdit: false,
  userList: []
})

async function handleCategoriesChange() {
  if (!state.categoryId || '' === state.categoryId) {
    routerProvider?.message.error('Category Id is empty.')
    return
  }
  const data = {}
  await eventDialogFormRef.value.initForm(createEventWorkflow, false, data)
}

async function createEvent(dateTime?: string) {
  state.isEdit = false
  state.workflowId = ''
  opened.value = true

  // options 設置了默認的Calendar
  if (!!props.options.defaultNewEventCalendar && '' !== props.options.defaultNewEventCalendar) {
    state.categoryId = props.options.defaultNewEventCalendar
    const data = {}

    // allow to create
    if (!!dateTime && dateTime !== '') {
      const startTime = dateTime.split(' ')
      data.startTime = startTime[0]
      data.isAllDay = false
      const time = []
      time.push(`${startTime[1]}:00`)
      time.push('23:59:00')
      data.eventTime = time
    }

    nextTick(async () => {
      await eventDialogFormRef.value.initForm(createEventWorkflow, false, data)
    })

  }
}

async function editEvent(event: any) {
  state.isEdit = true
  state.userList = []
  state.categoryId = event.calendarId
  state.location = ''

  const startTime = event.start.split(' ')
  const endTime = event.end.split(' ')
  const data = {
    eventId: event.detail.eventId,
    eventName: event.detail.eventName,
    eventDescription: event.detail.eventDescription,
    eventCategory: event.detail.category,
    eventLocation: event.detail.location,
    startTime: startTime[0],
    endTime: endTime[0],
    eventUser: event.detail.relatedUsers.eventUser,
    isAllDay: event.detail.isAllDay
  }

  if (!event.detail.isAllDay) {
    const time = []
    time.push(`${startTime[1]}:00`)
    time.push(`${endTime[1]}:00`)
    data.eventTime = time
  }

  nextTick(async () => {
    await eventDialogFormRef.value.initForm(updateEventWorkflow, true, data)
  })
  opened.value = true
}

// open message dialog
async function handleConfirm() {
  const type = state.isEdit ? 'update' : 'create'
  eventDialogFormRef.value.confirm(type)
}

function handleReady() {
  state.loading = false
}

// Disable page operations
function handleImplement(isLoading: boolean) {
  state.loading = isLoading
}

function handleSuccess() {
  emits('reload')
  state.loading = false
  opened.value = false
}

async function cancelAndRemove(isCancel: boolean, event: any) {
  state.isEdit = true
  state.userList = []
  state.workflowId = event.calendarId
  state.location = ''
  const data = {
    eventId: event.detail.eventId,
    eventName: event.detail.eventName,
    eventDescription: event.detail.eventDescription,
    eventCategory: event.detail.category,
    eventLocation: event.detail.location,
    startTime: event.start,
    endTime: event.end,
    eventUser: event.detail.relatedUsers.user,
    isAllDay: event.detail.isAllDay
  }
  data.eventMessage = ''

  const statue = isCancel ? 'cancel calendar event' : 'delete calendar event'
  // await initWorkflowForm(statue)

  const form = {
    processKey: state.workflowKey,
    businessKey: '',
    properties: Object.entries(data).reduce((newObj, [key, val]) => {
      if (val || val === false || val == '0') newObj[key] = val
      return newObj
    }, {})
  }
  await clientApi.api.postWorkflowProcessStart(form, { async: false }).then((res) => res.data)
  emits('reload')
}

defineExpose({ createEvent, editEvent, cancelAndRemove })
</script>

<template>
  <el-dialog v-model="opened" :title="state.isEdit ? t('Edit Event') : t('New Event')" append-to-body
             style="width: 30%">
    <el-form label-position="top" v-show="!state.isEdit">
      <el-form-item :label="t('Calendar')">
        <el-select v-model="state.categoryId" @change="handleCategoriesChange" :loading="state.loading">
          <el-option v-for="categories in categoriesOption" :key="categories.key" :label="categories.name"
                     :value="categories.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider v-show="!state.isEdit && !!state.categoryId && ''!=state.categoryId" />

    <CalendarDialogForm ref="eventDialogFormRef" :categoryId="state.categoryId" @ready="handleReady"
                        @implement="handleImplement" @success="handleSuccess" />

    <template #footer>
      <div v-show="!!state.categoryId && ''!=state.categoryId">
        <el-button id="Home__Dashboard__Calendar__NewEvent__Cancel" :loading="state.loading" @click="opened = false">
          {{ $t('vxe.button.cancel') }}
        </el-button>
        <el-button id="Home__Dashboard__Calendar__NewEvent__Save" :loading="state.loading" type="primary"
                   @click="handleConfirm">
          {{ $t('button.save') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
