<script lang="ts" setup>
import type { Node, Graph } from '@antv/x6'
import { adminApi } from 'api'
import { JsonSchemaToJsonData } from 'docpal-document-editor/src/client'

const props = defineProps<{
  node: Node,
  templateCData: string
  templateId: string
  allFields: any[],
  disabled: boolean
}>()
const emits = defineEmits(['updateCData'])
const { templateId } = toRefs(props)
const variableList = ref<any>([])

const state = reactive({
  fileType: ''
})

async function getTemplateVariableList() {
  if (!props.templateId) {
    variableList.value = []
    return
  }
  variableList.value = {}

  const { data } = await adminApi.api.getTemplateDocumentRefreshId(props.templateId)
  state.fileType = data.fileType
  const cdata = props.templateCData ? JSON.parse(props.templateCData) : {}
  if (data.fileType === 'Word') {
    const variable = JsonSchemaToJsonData(data.templateVariable)
    if (!variable) {
      return
    }
    variable.map((item: any) => {
      const rawValue = cdata[item.id] || ''
      item.value = rawValue.replace('${variables:get(', '').replace(')}', '')
      return item
    })

    // File type used for template output
    variable.splice(0, 0, {
      id: 'system_output_file_type',
      name: 'Output File Type',
      type: 'text',
      value: ''
    })
    variableList.value = variable

  }

  const fullVarList = JSON.parse(data.templateVariable as any).reduce((prev: any, curr: any) => {
    try {
      const data = JSON.parse(curr)
      Object.keys(data).forEach(key => {
        prev.push(key)
      })
    } catch (err) {
      prev.push(curr)
    }
    return prev
  }, [])
  const varList = [...new Set(fullVarList)]
  // check if templateCData is in varList
  variableList.value = varList.map((key: string) => {
    const rawValue = cdata[key] || ''
    const value = rawValue.replace('${variables:get(', '').replace(')}', '')

    return {
      id: key,
      name: key,
      value
    }
  })
}

function updateData() {
  const newCDate = Object.fromEntries(
    variableList.value
      .filter(item => item.value)
      .map(item => [item.id, `\${variables:get(${item.value})}`])
  )
  emits('updateCData', JSON.stringify(newCDate))
}

function isEmptyObj(obj: any) {
  return Object.keys(obj).length === 0
}

watch(templateId, () => {
  console.log('templateId', templateId)
  getTemplateVariableList()
}, {
  immediate: true
})
</script>

<template>
  <div class="templateVariableContainer">
    <ElForm v-if="!isEmptyObj(variableList)" label-position="top" style="width:100%;" :disabled="disabled">
      <el-divider />
      <span>Variables</span>

      <ElFormItem v-for="(value, key) in variableList" :key="value.id" :label="value.name">
        <ElSelect v-model="value.value" @change="updateData" clearable filterable>
          <ElOption v-for="item in allFields" :key="item.id" :label="item.name" :value="item.id" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <div v-else>
      No variable
    </div>

  </div>
</template>

<style scoped lang="scss">

</style>
