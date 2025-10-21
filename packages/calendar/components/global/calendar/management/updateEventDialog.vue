<script lang="ts" setup>
import { createEventWorkflow, updateEventWorkflow } from '#imports'
import { type EventFormData } from '#imports'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}
const emits = defineEmits(['reload'])
const { t } = useI18n()
const opened = ref(false)
const { setting: calendarSetting, categoriesOption, handleCancel, handleRemove } = useCalendarStore()
const props = defineProps({
  options: {}
})
const eventDialogFormRef = ref()
const showForm = ref(false)

const state = reactive({
  categoryId: '',
  loading: false,
  isEdit: false
})

async function handleCategoriesChange() {
  if (!state.categoryId || '' === state.categoryId) {
    routerProvider?.message.error('Category Id is empty.')
    return
  }
  showForm.value = true
  const data = {}
  nextTick(async () => {
    await eventDialogFormRef.value.initForm(createEventWorkflow, false, data)
  })
}

async function createEvent(dateTime?: string) {
  state.isEdit = false
  showForm.value = false
  opened.value = true
  // options 設置了默認的Calendar
  if (!!props.options.defaultNewEventCalendar && '' !== props.options.defaultNewEventCalendar) {
    showForm.value = true
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
  showForm.value = true
  state.categoryId = event.calendarId

  const startTime = event.start.split(' ')
  const endTime = event.end.split(' ')
  const data: EventFormData = {
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

async function cancelAndRemove(isCancel: boolean, event: any) {
  const data: EventFormData = {
    eventId: event.detail.eventId,
    eventName: event.detail.eventName,
    eventDescription: event.detail.eventDescription,
    eventCategory: event.detail.category,
    eventLocation: event.detail.location,
    startTime: event.start,
    endTime: event.end,
    eventUser: event.detail.relatedUsers.user,
    isAllDay: event.detail.isAllDay,
    sendMessage: false
  }

  if (isCancel) {
    data.eventMessage = ''
    await handleCancel(event.calendarId, data)
  } else {
    data.eventMessage = ''
    await handleRemove(event.calendarId, data)
  }
  nextTick(() => {
    emits('reload')
  })
}

// open message dialog
async function handleConfirm() {
  const type = state.isEdit ? 'update' : 'create'
  eventDialogFormRef.value.confirm(type, null)
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

watch(() => state.categoryId, (newValue) => {
  handleCategoriesChange()
}, { deep: true })

onMounted(() => {
  state.categoryId = ''
})

defineExpose({ createEvent, editEvent, cancelAndRemove })
</script>

<template>
  <el-dialog v-model="opened" :title="state.isEdit ? t('Edit Event') : t('New Event')" append-to-body
             style="width: 30%">
    <el-form label-position="top" v-show="!state.isEdit">
      <el-form-item :label="t('Calendar')">
        <el-select v-model="state.categoryId" :loading="state.loading">
          <el-option v-for="categories in categoriesOption" :key="categories.key" :label="categories.name"
                     :value="categories.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider v-show="!state.isEdit && !!state.categoryId && ''!=state.categoryId" />

    <CalendarDialogForm ref="eventDialogFormRef" :categoryId="state.categoryId" :showForm="showForm"
                        @ready="handleReady" @implement="handleImplement" @success="handleSuccess" />

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
