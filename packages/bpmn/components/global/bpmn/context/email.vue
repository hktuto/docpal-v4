<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { adminApi } from 'api'

const { node } = defineProps<{
  node: Node
}>()

const allEmailTemplates = ref<any>([])
const templateVariables = ref<any>([])
const emailTemplateId = ref('')

const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')
}

graphProvider?.graph.value?.on('history:change', async () => {
  console.log('on-history:change')
  await initForm()
})

const allFieldOptions = computed(() => {
  if (!graphProvider.allFormField.value) return []

  const allField = Object.fromEntries(Object.entries(graphProvider.allFormField.value).filter(([key, value]) => value.attr_type === 'string'))

  return Object.keys(allField).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: '${variables:get(' + graphProvider.allFormField.value[key].attr_id + ')}'
    }
  })
})

function setEmailTemplateId(value: string) {
  const newItem = {
    attr_name: 'notificationType',
    'flowable:string': {
      __cdata: value
    }
  }
  const nodeData = node.getData()

  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }
  newData.data.extensionElements['flowable:field'] = [newItem]
  newData.data.extensionElements['flowable:field'].push(
    {
      attr_name: 'tos',
      'flowable:expression': {
        __cdata: ''
      }
    },
    {
      attr_name: 'ccs',
      'flowable:expression': {
        __cdata: ''
      }
    },
    {
      attr_name: 'bcc',
      'flowable:expression': {
        __cdata: ''
      }
    }
  )

  const varList = allEmailTemplates.value.find((item: any) => item.id === value)?.emailTemplateVariable
  if (varList || JSON.parse(varList)) {
    const varListJson = JSON.parse(varList)
    varListJson.unshift('tos', 'ccs', 'bcc')
    const variable = varListJson
      .filter((j: any) => !j.includes(','))
      .map((item: any) => {
        return {
          attr_name: item,
          'flowable:expression': {
            __cdata: ''
          }
        }
      })
    newData.data.extensionElements['flowable:field'] = [newItem, ...variable]
  }

  templateVariables.value = nodeData.data.extensionElements['flowable:field'].filter(
    (item: any) =>
      item.attr_name !== 'notificationType' && item.attr_name !== 'hostUrl' && item.attr_name !== 'processInstanceId' && !item.attr_name.includes(',')
  )
  node.setData(newData, { overwrite: true, deep: true, silent: false })
}

function fieldMappingUpdate(name: string, newVal: string) {
  graphProvider?.graph.value?.startBatch('update-email-data')
  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }

  const index = newData.data.extensionElements['flowable:field'].findIndex((f: any) => f.attr_name === name)
  newData.data.extensionElements['flowable:field'][index]['flowable:expression'].__cdata = newVal || ''
  node.setData(newData, { overwrite: true, deep: true, silent: false })

  graphProvider?.graph.value?.stopBatch('update-email-data')
}

async function initForm() {
  if (allEmailTemplates.value.length === 0) {
    const response = await adminApi.api.getTemplateEmailAll()
    allEmailTemplates.value = response.data
  }
  const notificationTypeField = node.data.data.extensionElements['flowable:field'].find((el: any) => el.attr_name === 'notificationType')
  emailTemplateId.value = notificationTypeField ? notificationTypeField['flowable:string'].__cdata : ''
  generateFieldList()
}

function generateFieldList() {
  const nodeData = node.getData()
  if (!nodeData.data.extensionElements || !nodeData.data.extensionElements['flowable:field']) templateVariables.value = []

  templateVariables.value = nodeData.data.extensionElements['flowable:field'].filter(
    (item: any) =>
      item.attr_name !== 'notificationType' && item.attr_name !== 'hostUrl' && item.attr_name !== 'processInstanceId' && !item.attr_name.includes(',')
  )
}

watch(
  () => node,
  async () => {
    console.log('watch node from email', node)
    await initForm()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <div class="fromContainer">
    <BpmnSidebarEditLabel :node="node" />
    <ElForm label-position="top" label-width="80px">
      <ElFormItem label="Email template">
        <ElSelect
          v-model="emailTemplateId"
          placeholder="Select email template"
          class="fullwidth"
          @change="setEmailTemplateId"
          :disabled="editorProvider.readonly.value"
          filterable
        >
          <ElOption v-for="item in allEmailTemplates" :key="item.id" :label="item.label" :value="item.id"></ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem v-for="item in templateVariables" :key="item.attr_name" :label="item.attr_name">
        <ElSelect
          v-model="item['flowable:expression'].__cdata"
          placeholder="Select form field"
          class="fullwidth"
          :disabled="editorProvider.readonly.value"
          clearable
          @change="(val: any) => fieldMappingUpdate(item.attr_name, val)"
        >
          <ElOption v-for="item in allFieldOptions" :key="item.value" :label="item.label" :value="item.value"></ElOption>
        </ElSelect>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
.fromContainer {
  overflow: auto;
}
</style>
