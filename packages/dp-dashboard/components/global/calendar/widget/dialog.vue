<script lang="ts" setup>
import { clientApi, adminApi } from 'api'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}
const emits = defineEmits(['reload'])
const { t } = useI18n()
const opened = ref(false)
const {
  setting: calendarSetting,
  categoriesOption,
  locationsOption,
  calendarViewOptions,
  weekDayOptions,
  EventFormData,
  initWorkflowForm,
  runWorkflow
} = useCalendarStore()
const props = defineProps({
  options: {}
})
const createDialogFormRef = ref()
const eventNotifyDialogRef = ref()
const eventNotifyType = ref<'create' | 'update' | 'reject'>()
const sendMessageText = ref('Send Message to Creator')

const state = reactive({
  workflowKey: '',
  workflowId: '',
  location: '',
  formJson: {},
  loading: false,
  isEdit: false,
  userList: []
})

const categories = ref()

async function setForm(isEdit: boolean, data: any) {
  if (!state.formJson && '' !== state.formJson) {
    routerProvider?.message.error('The form does not exist')
    return
  }
  nextTick(async () => {
    createDialogFormRef.value.setForm(state.formJson)
    createDialogFormRef.value.setFormData(isEdit, data)
  })
}

async function open(dateTime: string) {
  state.isEdit = false
  state.userList = []
  state.workflowId = ''
  state.location = ''
  state.loading = true
  opened.value = true
  try {
    if (!!props.options.defaultNewEventCalendar && '' !== props.options.defaultNewEventCalendar) {
      state.workflowId = props.options.defaultNewEventCalendar
      await initWorkflowForm('create calendar event')
      const data = {
        eventCategory: state.workflowId
      }
      if ('' !== state.location) {
        data.eventLocation = state.location
      }

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
      await setForm(false, data)
    }
  } catch (e) {
    console.log(e)
  }
  state.loading = false
}

async function handleCategories() {
  if (!state.workflowId || '' === state.workflowId) {
    routerProvider?.message.error('Workflow Id is empty.')
    return
  }

  try {
    const workflowData: any = await initWorkflowForm('create calendar event', state.workflowId)
    if (!workflowData) {
      routerProvider?.message.error('Workflow Data is empty.')
      return
    }
    state.workflowKey = workflowData.workflowData
    state.formJson = workflowData.formJson
    state.location = 'workflowData' in workflowData ? workflowData.workflowData : ''

    const data = {
      eventCategory: state.workflowId
    }
    await setForm(false, data)
  } catch (e) {
    throw e
  }
}

function edit(event: any) {
  state.isEdit = true
  state.userList = []
  state.workflowId = event.calendarId
  state.location = ''
  editForm(event)
  opened.value = true
}

async function editForm(event: any) {
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

  await initWorkflowForm('update calendar event')
  await setForm(true, data)
}

async function cancelAndRemove1(isCancel: boolean, event: any) {
  state.isEdit = true
  state.userList = []
  state.workflowId = event.calendarId
  state.location = ''
  const data: EventFormData = {
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
  await initWorkflowForm(statue)

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

async function submit1() {
  try {
    const data = await createDialogFormRef.value.getFormData()
    if (!data) {
      return
    }
    const userId = useUserId()
    if (!isEdit) {
      const msg = {
        title: `${userId.value} Create New Calendar Event`,
        data: ''
      }
      data.eventMessage = JSON.stringify(msg)
    } else {
      data.sendMessageToCreator = true
    }
    data.recipient = data.eventUser

    const form = {
      processKey: state.workflowKey,
      businessKey: '',
      properties: Object.entries(data).reduce((newObj, [key, val]) => {
        if (val || val === false || val == '0') newObj[key] = val
        return newObj
      }, {})
    }

    state.loading = true
    console.log('submit', data, form)
    await clientApi.api.postWorkflowProcessStart(form, { async: false }).then((res) => res.data)
    emits('reload')
    state.loading = false
    opened.value = false
  } catch (e) {
    console.log(e)
  }
}

async function cancelAndRemove(isCancel: boolean, event: any) {


  emits('reload')
}

async function submit() {
  opened.value = true
  try {
    const event = await createDialogFormRef.value.getFormData()
    event.recipient = data.eventUser

    // Send Message
    eventNotifyType.value = 'create'
    sendMessageText.value = ''
    eventNotifyDialogRef.value.openDialog()

    // run workflow
    await runWorkflow(state.workflowId, event)
  } catch (e) {
    console.log(e)
  } finally {
    state.loading = false
  }

  emits('reload')
  opened.value = false
}

defineExpose({ open, edit, cancelAndRemove })
</script>

<template>
  <el-dialog v-model="opened" :title="state.isEdit ? t('Edit Event') : t('New Event')" append-to-body>
    <el-form label-position="top" v-show="!state.isEdit">
      <el-form-item :label="t('Calendar')">
        <el-select v-model="state.workflowId" @change="handleCategories">
          <el-option v-for="categories in categoriesOption" :key="categories.key" :label="categories.name"
                     :value="categories.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider v-show="!state.isEdit" />

    <div v-loading="state.loading">
      <CalendarWidgetDialogForm ref="createDialogFormRef" />
    </div>

    <template #footer>
      <el-button id="Home__Dashboard__Calendar__NewEvent__Cancel" :loading="state.loading" @click="opened = false">
        {{ $t('vxe.button.cancel') }}
      </el-button>
      <el-button id="Home__Dashboard__Calendar__NewEvent__Save" :loading="state.loading" type="primary" @click="submit">
        {{ $t('button.save') }}
      </el-button>
    </template>
  </el-dialog>

  <CalendarEventNotifyDialog ref="eventNotifyDialogRef" :type="eventNotifyType" :sendMessageText="sendMessageText"
                             @submit="handleSubmit" />
</template>
