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

watch(form, () => {
  if (form.value) {
    updateData()
  }
}, {
  deep: true
})


onMounted(async () => {
  setUpListener()
  refreshData()
})

</script>

<template>
  <div class="formContainer">
    <BpmnSidebarEditLabel :node="node" />
    <div class="eventForm">
      <h4>Event</h4>
      <ElForm label-position="top" :disabled="editorProvider.readonly.value">
        <ElFormItem label="Action">
          <ElSelect v-model="form.attr_actionType">
            <ElOption v-for="item in actionTypeOptions" :key="item" :label="item" :value="item" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem v-if="'Create' !==form.attr_actionType" label="Event Id">
          <ElSelect v-model="form.attr_eventId">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Event Name">
          <ElSelect v-model="form.attr_eventName">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Event Description">
          <ElSelect v-model="form.attr_description">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Event Category">
          <ElSelect v-model="form.attr_category">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Event Location">
          <ElSelect v-model="form.attr_location">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Start Time">
          <ElSelect v-model="form.attr_startTime">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="End Time">
          <ElSelect v-model="form.attr_endTime">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="is All Day">
          <ElSelect v-model="form.attr_isAllDay">
            <ElOption v-for="item in booleanFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem v-if="form.related" label="User">
          <ElSelect v-model="form.related.attr_user">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
          </ElSelect>
        </ElFormItem>
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
      </ElForm>
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