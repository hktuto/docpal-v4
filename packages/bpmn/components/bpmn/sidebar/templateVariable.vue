<script lang="ts" setup>
import type { Node, Graph } from '@antv/x6'
import { adminApi } from 'api'
import { JsonSchemaToJsonData } from 'docpal-document-editor/src/client'

const props = defineProps<{
  node: Node,
  templateCData: string
  templateId: string
  allFields: any[]
}>()
const emits = defineEmits(['updateCData'])
const { templateId } = toRefs(props)
const variableList = ref<any>({})

const state = reactive({
  fileType: '',
  testVariables: {},
  loading: false
})

const templateVariablesRendererRef = ref()

async function getTemplateVariableList() {
  if (!props.templateId) {
    return
  }
  variableList.value = {}

  const { data } = await adminApi.api.getTemplateDocumentRefreshId(props.templateId)
  // const {templateVariable} = await GetTemplateVariablesApi(props.templateId);
  state.fileType = data.fileType
  if (data.fileType === 'Word') {
    state.loading = true
    const variable = JsonSchemaToJsonData(data.templateVariable)
    console.log(111, templateVariablesRendererRef)
    if (variable) {
      state.loading = false
      variableList.value = variable
      await templateVariablesRendererRef.value.setVariables(variable)
    }
    return
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
  const cdata = props.templateCData ? JSON.parse(props.templateCData) : {}
  variableList.value = varList.reduce((all: any, key: any) => {

    // get variable from ${variables:get(variable)} in cdata[key]
    all[key] = cdata[key] ? cdata[key].replace('${variables:get(', '').replace(')}', '') : ''

    return all
  }, {})
}

function updateData() {
  // loop thought variableList.value, and convert all value to ${variables:get(variable)}
  const newCDate = Object.keys(variableList.value).reduce((all: any, key: any) => {
    if (!variableList.value[key]) {
      return all
    }
    all[key] = '${variables:get(' + variableList.value[key] + ')}'
    return all
  }, {})

  emits('updateCData', JSON.stringify(newCDate))
}

function handleTestVariable(variables: any) {
  state.testVariables = variables
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
    <ElForm v-if="variableList" label-position="top" style="width:100%;">
      <el-divider />
      <ElFormItem>
        <span>Variables</span>
      </ElFormItem>
      <DocTemplateVariablesRenderer v-loading="state.loading" ref="templateVariablesRendererRef"
                                    v-if="state.fileType==='Word'"
                                    @update="handleTestVariable" />

      <ElFormItem v-else v-for="(value, key) in variableList" :key="key" :label="key">
        <ElSelect v-model="variableList[key]" @change="updateData" clearable filterable>
          <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
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
