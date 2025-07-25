<script lang="ts" setup>
import { adminApi } from 'api'
import type { Node } from '@antv/x6'

const { t } = useI18n()
const { node } = defineProps<{
  node: Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw new Error('Missing provider')
}

const allDocumentTemplates = ref<any[]>([])
const flatCabinetList = ref<any[]>([])
const folderCabinetRootId = ref('')

const form = ref<{
  [key: string]: any
}>({
  templateId: '',
  folderCabinetId: '',
  variables: ''
})
const { getMetaSetting } = useDocumentType()
const allFields = computed(() => {
  return Object.keys(graphProvider.allFormField.value).map((key: string) => {
    return graphProvider.allFormField.value[key]
  })
})

async function loopChildren(all: any[], item: any, level = 0, title = '') {
  const meta = await getMetaSetting(item.documentType) as any
  title = (title ? title + '/' : '') + item.label
  if (!item.children) {
    all.push({
      ...item,
      level,
      displayMeta: meta && meta.displayMataTags ? meta.displayMataTags : [],
      title
    })
  }

  if (item.children) {
    level++
    for (const child of item.children) {
      all = await loopChildren(all, child, level, title)
    }
  }
  return all
}

async function getAllTemplate() {
  const { data } = await adminApi.api.getTemplateDocumentAll()
  if (!data) return
  allDocumentTemplates.value = data.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      value: item
    }
  })
  const id = graphProvider?.bpmnJson.value.definitions.process.attr_id
  const cell = graphProvider?.graph.value?.getCellById(id) as any
  const rootCellDate = cell.getData()
  if (rootCellDate && rootCellDate.data && rootCellDate.data.extensionElements['flowable:folderCabinetMapping']) {
    folderCabinetRootId.value = rootCellDate.data.extensionElements['flowable:folderCabinetMapping'][0].attr_id

    const { data } = await adminApi.api.getCabinetTemplateId(folderCabinetRootId.value)
    flatCabinetList.value = await loopChildren([], data, 0, '')
    // flatCabinetList.value = props.bpmnJson.definitions.process['flowable:folderCabinetMapping'][0]
  }
  await getForm()
}

async function getForm() {
  const nodeData = node.getData()
  if (!nodeData.data || !nodeData.data.extensionElements) {
    form.value = {
      templateId: '',
      folderCabinetId: '',
      variables: ''
    }

    return
  }
  // get templateId
  const index = nodeData.data.extensionElements['flowable:field'].findIndex((item: any) => item.attr_name === 'templateId')
  const templateIdItem = nodeData.data.extensionElements['flowable:field'][index]

  if (templateIdItem) {
    form.value.templateId = templateIdItem['flowable:expression']['__cdata']

  } else {
    form.value.templateId = ''
  }
  // get folderCabinetId
  const folderCabinetIdItem = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === 'folderCabinetId')
  if (folderCabinetIdItem) {
    form.value.folderCabinetId = folderCabinetIdItem['flowable:expression']['__cdata'] || ''
  } else {
    nodeData.data.extensionElements['flowable:field'].push({
      'attr_name': 'folderCabinetId',
      'flowable:expression': {
        '__cdata': ''
      }
    })
    form.value.folderCabinetId = ''
  }

  // get variables
  const variablesItem = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === 'variables')
  if (variablesItem) {
    form.value.variables = variablesItem['flowable:expression']['__cdata'] || ''
  } else {
    nodeData.data.extensionElements['flowable:field'].push({
      'attr_name': 'variables',
      'flowable:expression': {
        '__cdata': ''
      }
    })
    form.value.variables = ''
  }
}

function updateField(key: string, value: any) {
  const nodeData = node.getData()
  let newData = JSON.parse(JSON.stringify(nodeData))
  if (!nodeData || !nodeData.data || !nodeData.data.extensionElements) {

    newData.data.extensionElements['flowable:field'] = [
      {
        'attr_name': key,
        'flowable:expression': {
          '__cdata': value
        }
      }
    ]
  }
  let index = nodeData.data.extensionElements['flowable:field'].findIndex((item: any) => item.attr_name === key)
  if (index === -1) {
    newData.data.extensionElements['flowable:field'].push({
      'attr_name': key,
      'flowable:expression': {
        '__cdata': value
      }
    })
  } else {

    newData.data.extensionElements['flowable:field'][index]['flowable:expression']['__cdata'] = value
  }
  node.setData(newData, { overwrite: true, deep: true })
  form.value[key] = value
}

function setUpListener() {
  graphProvider?.graph.value?.on('history:undo', () => {
    refreshData()
  })
  graphProvider?.graph.value?.on('history:redo', () => {
    refreshData()
  })
}

function refreshData() {
  getForm()
}

onMounted(async () => {
  await getAllTemplate()
  setUpListener()
  refreshData()
})
</script>

<template>
  <div class="fromContainer">
    <BpmnSidebarEditLabel :node="node" />
    <div class="formContainer">
      <div v-if="folderCabinetRootId" class="generateDocumentFormContainer">
        <ElForm label-position="top">
          <ElFormItem label="Folder Cabinet location" required>
            <ElSelect v-model="form.folderCabinetId" placeholder="Folder Cabinet location"
                      @change="(val:any) => updateField('folderCabinetId', val)">
              <ElOption v-for="item in flatCabinetList" :key="item.id" :label="item.title" :value="item.id" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="Document Template" required>
            <ElSelect v-model="form.templateId" placeholder="Document Template"
                      @change="(val:any) => updateField('templateId', val)">
              <ElOption v-for="item in allDocumentTemplates" :key="item.id" :label="item.name" :value="item.id" />
            </ElSelect>
          </ElFormItem>
        </ElForm>
        <BpmnSidebarTemplateVariable :node="node" :templateCData="form.variables" :allFields="allFields"
                                     :templateId="form.templateId"
                                     @updateCData="(val:string) => updateField('variables', val)" />
      </div>
      <div v-else>
        please select folder cabinet first
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.fromContainer {
  overflow: auto;
}
</style>

