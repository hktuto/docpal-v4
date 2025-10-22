<script lang="ts" setup>
import { adminApi } from 'api'
import type { Node } from '@antv/x6'

const editorProvider = inject(EDITOR_PROVIDER)
if (!editorProvider) {
  throw createError('editor provider not found')
}
const { bpmnGlobalRules } = editorProvider.BpmnRule
const { t } = useI18n()
const { node } = defineProps<{
  node: Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw new Error('Missing provider')
}

const documentTypeList = ref<any[]>([])
const stringFields = computed(() => {
  if (!bpmnGlobalRules.value || bpmnGlobalRules.value.length === 0) return []

  return bpmnGlobalRules.value.filter((item: any) => item.validationRule.type === 'text').map((item: any) => {
    return {
      id: item.id,
      name: item.name
    }
  })
})

const state = reactive({
  status: true
})

const allDocumentTemplates = ref<any[]>([])
const folderCabinetRootId = ref('')

const form = ref({
  parentPath: '',
  storeValue: '',
  documentName: '',
  documentType: '',
  templateId: '',
  variables: ''
})

async function init() {
  const documentTypeData: any = await adminApi.api.getTypesActive().then(res => res.data)
  documentTypeList.value = documentTypeData.filter((item: any) => !item.isFolder)

  const documentData: any = await adminApi.api.getTemplateDocumentAll().then(r => r.data)
  allDocumentTemplates.value = documentData.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      value: item
    }
  })

  const index = node.getData().data.extensionElements['flowable:field'].findIndex((f: any) => f.attr_name === 'storeValue')
  state.status = index != -1

  getForm()
}

function getForm() {
  const fields: any = node.data.data.extensionElements['flowable:field']
  if (fields && fields.lenght < 1) {
    return
  }

  fields.forEach((item: any) => {
    switch (item.attr_name) {
      case 'storeValue':
        form.value.storeValue = item['flowable:expression'].__cdata
        break
      case 'parentPath':
        form.value.parentPath = item['flowable:expression'].__cdata
        break
      case 'documentName':
        form.value.documentName = item['flowable:expression'].__cdata
        break
      case 'documentType':
        form.value.documentType = item['flowable:expression'].__cdata
        break
      case 'templateId':
        form.value.templateId = item['flowable:expression'].__cdata
        break
      case 'variables':
        form.value.variables = item['flowable:expression'].__cdata
        break
    }
  })
  console.log(222,form.value)
}

function updateFieldData(key: string, newVal: string) {
  graphProvider?.graph.value?.startBatch('update-new-document-field-data')

  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }

  const index = newData.data.extensionElements['flowable:field'].findIndex((f: any) => f.attr_name === key)
  newData.data.extensionElements['flowable:field'][index]['flowable:expression'].__cdata = newVal || ''

  node.setData(newData, { overwrite: true, deep: true })
  graphProvider?.graph.value?.stopBatch('update-new-document-field-data')
}

function setUpListener() {
  graphProvider?.graph.value?.on('history:undo', () => {
    getForm()
  })
  graphProvider?.graph.value?.on('history:redo', () => {
    getForm()
  })
}

function handleStatus() {
  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }
  const name = state.status ? 'storeValue' : 'parentPath'

  const index = newData.data.extensionElements['flowable:field'].findIndex((f: any) => f.attr_name === name)
  if (index == -1) {
    newData.data.extensionElements['flowable:field'].push(
      { 'attr_name': name, 'flowable:expression': { '__cdata': '' } })
  }

  const dName = state.status ? 'parentPath' : 'storeValue'
  newData.data.extensionElements['flowable:field'] = newData.data.extensionElements['flowable:field'].filter((f: any) => f.attr_name !== dName)

  node.setData(newData, { overwrite: true, deep: true })
}

watch(() => node, async () => {
  if (node && node.data) {
    getForm()
  }
}, {
  immediate: true,
  deep: true
})

onMounted(async () => {
  await init()
  setUpListener()
})
</script>

<template>
  <div class="fromContainer">
    <BpmnSidebarEditLabel :node="node" />
    <div class="formContainer">
      <div class="generateDocumentFormContainer">
        <el-form label-position="top" :disabled="editorProvider.readonly.value">
          <el-switch v-model="state.status" active-text="Store Value" inactive-text="Parent Path"
                     @change="handleStatus" />
          <el-form-item v-if="state.status" label="Store Value" required>
            <el-select v-model="form.storeValue" :placeholder="t('common_selectedIsRequiredMsg')" clearable
                       @change="(val:any) => updateFieldData('storeValue', val)">
              <el-option v-for="item in stringFields" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item v-else label="Parent Path" required>
            <el-select v-model="form.parentPath" :placeholder="t('common_selectedIsRequiredMsg')" clearable
                       @change="(val:any) => updateFieldData('parentPath', val)">
              <el-option v-for="item in stringFields" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item label="Document Name" required>
            <el-select v-model="form.documentName" :placeholder="t('common_selectedIsRequiredMsg')" clearable
                       @change="(val:any) => updateFieldData('documentName', val)">
              <el-option v-for="item in stringFields" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="Document Type" required>
            <el-select v-model="form.documentType" :placeholder="t('common_selectedIsRequiredMsg')" filterable
                       @change="(val:any) => updateFieldData('documentType', val)">
              <el-option v-for="item in documentTypeList" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="Document Template" required>
            <el-select v-model="form.templateId" :placeholder="t('common_selectedIsRequiredMsg')" filterable
                       @change="(val:any) => updateFieldData('templateId', val)">
              <el-option v-for="item in allDocumentTemplates" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>

        <BpmnSidebarTemplateVariable v-if="form.templateId && ''!= form.templateId" :node="node"
                                     :templateCData="form.variables" :allFields="stringFields"
                                     :templateId="form.templateId"
                                     @updateCData="(val:string) => updateFieldData('variables', val)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fromContainer {
  overflow: auto;
}
</style>

