<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { adminApi } from 'api'

const { node } = defineProps<{
  node: Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')
}
const { setting } = useCalendarStore()
const actionTypeOptions = [
  'Create', 'Update', 'Cancel', 'Remove'
]

const form = ref<any>({})

function refreshData() {
  const data = node.getData()
  if (data.data.extensionElements['flowable:calendarEvent']) {
    if (!data.data.extensionElements['flowable:calendarEvent'].related || Array.isArray(data.data.extensionElements['flowable:calendarEvent'].related)) {
      data.data.extensionElements['flowable:calendarEvent'].related = {
        attr_user: ''
      }
    }
    form.value = data.data.extensionElements['flowable:calendarEvent']
    console.log('form', form.value)
  } else {
    // data error reset data
  }
}

function updateData() {
  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: nodeData.versioin + 1 || 1,
    data: {
      ...nodeData.data,
      extensionElements: {
        ...nodeData.data.extensionElements,
        'flowable:calendarEvent': JSON.parse(JSON.stringify(form.value))
      }
    }
  }
  node.setData(newData, {
    overwrite: true, deep: true
  })
}

const allFields = computed(() => {
  if (!graphProvider?.allFormField.value) return []

  const allField = Object.fromEntries(
    Object.entries(graphProvider.allFormField.value).filter(([key, value]) => value.attr_type === 'string')
  )

  return Object.keys(allField).map((key: string) => {
    return graphProvider.allFormField.value[key]
  })
})

const booleanFields = computed(() => {
  if (!graphProvider?.allFormField.value) return []
  const allField = Object.fromEntries(
    Object.entries(graphProvider.allFormField.value).filter(([key, value]) => value.attr_type === 'boolean')
  )
  return Object.keys(allField).map((key: string) => {
    return graphProvider.allFormField.value[key]
  })
})

const dateTimeFields = computed(() => {
  if (!graphProvider?.allFormField.value) return []
  const allField = Object.fromEntries(
    Object.entries(graphProvider.allFormField.value).filter(([key, value]) => value.attr_type === 'date')
  )
  return Object.keys(allField).map((key: string) => {
    return graphProvider.allFormField.value[key]
  })
})

function addNewReminder() {

}

function removeReminder(index: number) {
  form.value.reminder.slice(index, 1)
}

function updateReminder(val: any, index: number) {
  form.value.reminder[index] = val
}

function setUpListener() {
  graphProvider?.graph.value?.on('history:undo', () => {
    refreshData()
  })
  graphProvider?.graph.value?.on('history:redo', () => {
    refreshData()
  })
}

function updataDescription() {
  form.value.attr_description = node.data.name
  updateData()
}

watch(form, () => {
  if (form.value) {
    updateData()
  }
}, {
  immediate: true,
  deep: true
})

onMounted(async () => {
  setUpListener()
  refreshData()
})

</script>

<template>
  <div class="formContainer">
    <BpmnSidebarEditLabel :node="node" @updateNode="updataDescription" />
    <div class="eventForm">
      <h4>Event</h4>
      <el-form label-position="top" :disabled="editorProvider.readonly.value">
        <el-input v-show="false" disabled v-model="form.attr_description" />
        <el-form-item label="Action">
          <el-select v-model="form.attr_actionType">
            <el-option v-for="item in actionTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="'Create' !==form.attr_actionType" label="Event Id">
          <el-select v-model="form.attr_eventId" clearable>
            <el-option v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Name">
          <el-select v-model="form.attr_eventName" clearable>
            <el-option v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Description">
          <el-select v-model="form.attr_eventDescription" clearable>
            <el-option v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Category">
          <el-select v-model="form.attr_category" clearable>
            <el-option v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Location">
          <el-select v-model="form.attr_location" clearable>
            <el-option v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Start Time">
          <el-select v-model="form.attr_startTime" clearable>
            <el-option v-for="item in dateTimeFields" :key="item.attr_id" :label="item.attr_name"
                       :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="End Time">
          <el-select v-model="form.attr_endTime" clearable>
            <el-option v-for="item in dateTimeFields" :key="item.attr_id" :label="item.attr_name"
                       :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="is All Day">
          <el-select v-model="form.attr_isAllDay" clearable>
            <el-option v-for="item in booleanFields" :key="item.attr_id" :label="item.attr_name"
                       :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.related" label="User">
          <el-select v-model="form.related.attr_user" clearable>
            <el-option v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </el-select>
        </el-form-item>
        <div class="reminderListContainer">
          <bpmnContextCalendarReminder
            v-for="(reminder,index) in form.reminder"
            :key="index"
            :reminder="reminder"
            @update="(val) => updateReminder(val, index)"
            @remove="removeReminder(index)"
          />
          <div class="addNewContainer">
            <ElButton text @click="addNewReminder">Add</ElButton>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formContainer {
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);
  height: 100%;
  overflow: auto;
  position: relative;
}
</style>