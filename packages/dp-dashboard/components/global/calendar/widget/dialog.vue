<script lang="ts" setup>
import { clientApi, adminApi } from 'api'

const emits = defineEmits(['reload'])
const { t } = useI18n()
const opened = ref(false)
const { setting: calendarSetting, categoriesOption, locationsOption, calendarViewOptions, weekDayOptions } = useCalendarStore()
const props = defineProps({
  options: {}
})

// const newEventId = defineModel<string>('newEventId')
const createDialogFormRef = ref()
const newEventId = ref(new Date().valueOf().toString())

const state = reactive({
  workflowKey: '',
  workflowId: {},
  formJson: {},
  loading: false,
  isEdit: false
})

const categories = ref()

async function initWorkflowForm(name: string) {
  state.loading = true
  try {
    categories.value = categoriesOption.value.find((item: any) => item.id === state.workflowId)
    if (!categories.value || !categories.value.flows || categories.value.flows.length === 0) return
    // TODO：名稱之後需要重新定義
    const flow = categories.value.flows.find((item: any) => {
      if (item.name.toLowerCase().includes(name)) {
        return item
      }
    })
    if (!flow) return
    state.workflowKey = deepCopy(flow.key)
    const workflow = await adminApi.api.getWorkflowVersionKeyProcessdefinitionkey(flow.key).then((r) => r.data)
    if (!workflow) return
    state.formJson = await formJsonGet(workflow.processDefinitionKey, workflow.id)
  } catch (e) {
    console.log(e)
    state.loading = false
  } finally {
    state.loading = false
  }
}

async function formJsonGet(processKey: string, versionId: string) {
  const response: any = await clientApi.api
    .getRelationQuery({
      userTaskId: 'start',
      processKey,
      versionId
    })
    .then((res: any) => res.data)
  if (!response[0] || (response[0] && !response[0].jsonValue)) return {}
  return JSON.parse(response[0].jsonValue)
}

async function setForm(isEdit: boolean, data: any) {
  setTimeout(() => {
    createDialogFormRef.value.setForm(state.formJson)
    createDialogFormRef.value.setFormData(isEdit, data)
  }, 100)
}

async function open() {
  state.isEdit = false
  state.userList = []
  state.workflowId = ''
  if (!!props.options.defaultNewEventCalendar && '' !== props.options.defaultNewEventCalendar) {
    state.workflowId = props.options.defaultNewEventCalendar
    await initWorkflowForm('create calendar event')
    const data = {
      category: state.workflowId
    }
    setForm(false, data)
  }
  opened.value = true
}

async function create() {
  await initWorkflowForm('create calendar event')

  const data = {
    category: state.workflowId
  }
  setForm(false, data)
}

function edit(event: any) {
  state.isEdit = true
  state.userList = []
  state.workflowId = event.calendarId
  editForm(event)
  opened.value = true
}

async function editForm(event: any) {
  const startTime = event.start.split(' ')
  const endTime = event.end.split(' ')

  // TODO: eventDescription沒有數據
  const data = {
    eventId: event.detail.eventId,
    eventName: event.detail.eventName,
    eventDescription: event.detail.eventDescription,
    category: event.detail.category,
    location: event.detail.location,
    startTime: startTime[0],
    endTime: endTime[0],
    user: event.detail.relatedUsers.user,
    isAllDay: event.detail.isAllDay
  }

  if (!event.detail.isAllDay) {
    const time = []
    time.push(`${startTime[1]}:00`)
    time.push(`${endTime[1]}:00`)
    data.time = time
  }
  await initWorkflowForm('update calendar event')

  setForm(true, data)
}

async function submit() {
  try {
    const data = await createDialogFormRef.value.getFormData()
    if (!data) {
      return
    }
    const form = {
      processKey: state.workflowKey,
      businessKey: '',
      properties: Object.entries(data).reduce((newObj, [key, val]) => {
        if (val || val === false || val == '0') newObj[key] = val
        return newObj
      }, {})
    }

    state.loading = true
    await clientApi.api.postWorkflowProcessStart(form, { async: false }).then((res) => res.data)
    state.formDialogVisible = false
    emits('reload')
    state.loading = false
    opened.value = false
  } catch (e) {
    console.log(e)
  }
}

defineExpose({ open, edit })
</script>

<template>
  <el-dialog v-model="opened" :title="state.isEdit ? t('Edit Event') : t('New Event')" append-to-body>
    <el-form label-position="top" v-show="!state.isEdit">
      <el-form-item :label="t('Calendar')">
        <el-select v-model="state.workflowId" @change="create">
          <el-option v-for="categories in categoriesOption" :key="categories.key" :label="categories.name" :value="categories.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider v-show="!state.isEdit" />

    <div v-loading="state.loading">
      <LazyCalendarWidgetDialogForm ref="createDialogFormRef" />
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
</template>
