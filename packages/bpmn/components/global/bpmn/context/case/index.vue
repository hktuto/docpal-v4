<script setup lang="ts">
import { adminApi } from 'api'
import type { Node } from '@antv/x6'

const { node } = defineProps<{
  node: Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')
}
const { bpmnGlobalRules } = editorProvider.BpmnRule

const stringFields = computed(() => {
  if (!bpmnGlobalRules.value || bpmnGlobalRules.value.length === 0) return []

  return bpmnGlobalRules.value.filter((item: any) => item.validationRule.type === 'text')
})

const form = ref<any>({
  attr_caseTypeId: '',
  attr_name: '',
  field: []
})
const loading = ref(false)
const caseList = ref()
const caseOptionList = ref([])

async function getCaseLise() {
  try {
    const data: any = await adminApi.api.getCaseTypes({ deployed: true }).then((r: any) => r.data)
    caseList.value = data.map((item: any) => {
      return {
        id: item.id,
        name: item.name
      }
    })
  } catch (e) {
    console.log(e)
  }
}

async function init() {
  await getCaseLise()

  const extensionElements = node.data.data.extensionElements
  if ('' == extensionElements['flowable:newCase'].attr_caseTypeId) return

  form.value.attr_caseTypeId = extensionElements['flowable:newCase'].attr_caseTypeId
  form.value.attr_name = extensionElements['flowable:newCase'].attr_name

  await getCaseOption()

  if (extensionElements['flowable:newCase'].field.length === 0) return

  extensionElements['flowable:newCase'].field.forEach((item: any) => {
    const find: any = caseOptionList.value.find((caseItem: any) => caseItem.id === item.attr_metadata)
    find.formProperty = item.attr_formProperty
    form.value.field.push({
      attr_formProperty: item.attr_formProperty,
      attr_metadata: item.attr_metadata,
      attr_dataType: item.attr_dataType
    })
  })
}

async function getCaseOption() {
  loading.value = true
  try {
    const caseData: any = await adminApi.api.getCaseTypesIdStarttask(form.value.attr_caseTypeId).then(r => r.data)

    if (caseData.length == 0) {
      caseOptionList.value = []
      return
    }
    const excludeList = ['created_date', 'created_by', 'modified_by', 'case_id']

    caseOptionList.value = caseData[caseData.length - 1].fields.filter((item: any) => !excludeList.includes(item.id))
      .map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          type: item.type
        }
      })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

async function handleCase(caseId: string) {
  const find = caseList.value.find((item: any) => item.id === caseId)
  form.value.attr_name = find.name
  form.value.field = []
  await getCaseOption()
  setData()
}

function handleCaseField(item: any) {
  const index = form.value.field.findIndex((item: any) => item.attr_metadata === item.metadata)
  if (index != -1) {
    form.value.field[index].attr_formProperty = item.formProperty
  } else {
    form.value.field.push({
      attr_formProperty: item.formProperty,
      attr_metadata: item.id,
      attr_dataType: item.type
    })
  }
  setData()
}

function setData() {
  graphProvider?.graph.value?.startBatch('update-case-field-data')
  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: nodeData.versioin + 1 || 1,
    data: {
      ...nodeData.data,
      extensionElements: {
        ...nodeData.data.extensionElements,
        'flowable:newCase': {
          ...nodeData.data.extensionElements['flowable:newCase'],
          ...JSON.parse(JSON.stringify(form.value))
        }
      }
    }
  }

  node.setData(newData, {
    overwrite: true,
    deep: true
  })
  graphProvider?.graph.value?.stopBatch('update-case-field-data')
}

onMounted(async () => {
  await init()
})

</script>

<template>
  <div>
    <BpmnSidebarEditLabel :node="node" />
    <el-form label-position="top" :disabled="editorProvider.readonly.value">
      <el-form-item label="Case">
        <el-select v-model="form.attr_caseTypeId" @change="handleCase">
          <el-option v-for="item in caseList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-divider v-if="caseOptionList.length > 0" />

      <template v-loading="loading" v-for="item in caseOptionList">
        <el-form-item :label="item.name">
          <el-select v-model="item.formProperty" clearable @change="handleCaseField(item)">
            <el-option v-for="field in stringFields" :key="field.id" :label="field.name" :value="field.id" />
          </el-select>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>