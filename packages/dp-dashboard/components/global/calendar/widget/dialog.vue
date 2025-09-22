<script lang="ts" setup>
import dayjs from 'dayjs'
import { clientApi, adminApi } from 'api'

const emits = defineEmits(['reload'])
const { t } = useI18n()
const opened = ref(false)
const {
  setting: calendarSetting,
  categoriesOption,
  locationsOption,
  calendarViewOptions,
  weekDayOptions
} = useCalendarStore()
// const newEventId = defineModel<string>('newEventId')
const createDialogFormRef = ref()
const newEventId = ref(new Date().valueOf().toString())

const state = reactive({
  selectedWorkflow: {},
  workflowId: {},
  availableWorkflow: [],
  loading: false,
  ccc: ''
})

async function initWorkflowForm() {
  state.loading = true
  const find = state.availableWorkflow.find((item: any) => item.id === state.workflowId)
  if (!find) return
  state.selectedWorkflow = deepCopy(find)

  const formJson = await formJsonGet('start', find.key, find.versionId)
  setTimeout(() => {
    createDialogFormRef.value.setForm(formJson)
  })
  state.loading = false
}

async function formJsonGet(userTaskId: string, processKey: string, versionId: string) {
  const response: any = await clientApi.api.getRelationQuery({
    userTaskId,
    processKey,
    versionId
  }).then(res => res.data)
  if (!response[0] ||
    response[0] && !response[0].jsonValue) return {}
  return JSON.parse(response[0].jsonValue)
}

async function getAvailableWorkflow() {
  state.availableWorkflow = await clientApi.api.postWorkflowProcessList({}).then(res => res.data)
}

function open() {
  opened.value = true
}

async function submit() {
  const data = await createDialogFormRef.value.getFormData()

  if (data) {
    const form = {
      processKey: state.selectedWorkflow.key,
      businessKey: '',
      properties: Object.entries(data).reduce((newObj, [key, val]) => {
        if (val || val === false || val == '0') newObj[key] = val
        return newObj
      }, {})
    }

    state.loading = true
    try {
      await clientApi.api.postWorkflowProcessStart(form, { async: false }).then(res => res.data)
      state.formDialogVisible = false
      emits('reload')
    } catch (error) {
      console.log(error)
    }
  }
  state.loading = false
  opened.value = false
}

async function handleCategories(id: string) {
  const categories = categoriesOption.value.find((item: any) => item.id === id)
  if (!categories || !categories.flows) return

  // TODO：名稱之後需要重新定義
  const flow = categories.flows.find((item: any) => item.name.toLowerCase().includes('create'))
  if (!flow) return

  const workflow = await adminApi.api.getWorkflowVersionKeyProcessdefinitionkey(flow.key).then(r => r.data)
}

onMounted(() => {
  state.workflowId = ''
  getAvailableWorkflow()
})

defineExpose({ open })
</script>

<template>
  <el-dialog v-model="opened" :title="t('New Event')" append-to-body>
    <el-form label-position="top">

      <el-form-item :label="t('222')">
        <el-select v-model="state.ccc" @change="handleCategories">

          <el-option v-for="categories in categoriesOption" :key="categories.key" :label="categories.name"
                     :value="categories.id" />
        </el-select>
      </el-form-item>


      <el-form-item :label="t('Calendar')">
        <el-select v-model="state.workflowId" @change="initWorkflowForm">
          <el-option v-for="wf in state.availableWorkflow" :key="wf.key" :label="wf.name" :value="wf.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider />

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