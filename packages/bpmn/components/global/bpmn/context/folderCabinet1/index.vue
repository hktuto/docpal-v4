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

const allFields = computed(() => {
  if (!graphProvider?.allFormField.value) return []
  return graphProvider?.allFormField.value
})

const cabinetOptions = ref()
const cabinetDetail = ref()
const selectedCabinet = ref()
const form = ref<any[]>([])

async function loopChildren(all: any, item: any, level = 0) {
  const response = await adminApi.api.postDocpaltypeSettingsDocpalTypeV2MetadataQuery({ docpalTypeName: item.documentType })
  const meta = response.data
  all.push({
    ...item,
    level,
    displayMeta: (meta && meta.metadataList?.length > 0) ? ['folderCabinetId', 'fc:docTitle', ...meta.metadataList?.map((item: any) => item.name)] : ['folderCabinetId', 'fc:docTitle']
  })

  if (item.children) {
    level++
    for (const child of item.children) {
      all = await loopChildren(all, child, level)
    }
  }
  return all
}

const detailLoading = ref(false)

const elementsIdList = ref()

async function getCabinetDetail(id: string) {
  // 如果沒有 id , 那 reset node data 的 flowable:folderCabinetMapping
  if (!id) {
    form.value = []
    node.setData({
      ...node.data,
      version: node.data.version ? node.data.version + 1 : 1,
      data: {
        ...node.data.data,
        extensionElements: {}
      }
    }, {
      overwrite: true,
      deep: true
    })
    return
  }
  detailLoading.value = true
  const response = await adminApi.api.getCabinetTemplateId(id)
  cabinetDetail.value = response.data
  let arr: any[] = []
  arr = await loopChildren(arr, cabinetDetail.value, 0)
  const graph = graphProvider?.graph.value
  const processNode = graph?.getCellById(node.data.id)
  if (!processNode) {
    throw createError('Process node not found')
  }
  const processData = processNode.getData().data
  const cabinetMapping = processData.extensionElements['flowable:folderCabinetMapping']
  if (cabinetMapping) {
    form.value = arr.map(item => {
      const bpmnItem = cabinetMapping.find((oldItem: any) => item.id === oldItem.attr_id)
      const fields = item.displayMeta.reduce((allMeta: any, meta: any) => {
        if (bpmnItem && bpmnItem.field) {
          const formItem = bpmnItem.field.find((item: any) => item.attr_metadata === meta)
          allMeta.push({
            attr_formProperty: formItem ? formItem.attr_formProperty : '',
            attr_metadata: meta
          })
        } else {
          allMeta.push({
            attr_formProperty: '',
            attr_metadata: meta
          })
        }
        return allMeta
      }, [])

      if (!item.folder) {
        if (bpmnItem && bpmnItem.field) {
          const formItem = bpmnItem.field.find((fieldItem: any) => fieldItem.attr_file && fieldItem.attr_file === item.id)
          fields.push({
            attr_formProperty: formItem ? formItem.attr_formProperty : '',
            attr_file: item.id
          })
        } else {
          fields.push({
            attr_formProperty: '',
            attr_file: item.id
          })
        }
      }
      // add folderCabinetId to arr
      return {
        attr_id: item.id,
        attr_name: item.label,
        attr_level: item.level,
        attr_isFolder: item.folder,
        rule: item.labelRule,
        field: fields,
        isFolder: item.folder,
        check: elementsIdList.value?.includes(item.id)
      }
    })
  } else {
    form.value = arr.map(item => {
      const field = item.displayMeta.map((meta: any) => ({
        attr_formProperty: '',
        attr_metadata: meta
      }))

      if (!item.folder) {
        field.push({
          attr_formProperty: '',
          attr_file: item.id
        })
      }
      return {
        attr_id: item.id,
        attr_name: item.label,
        attr_level: item.level,
        attr_isFolder: item.folder,
        field
      }
    })
  }
  detailLoading.value = false
}

async function setData() {
  const graph = graphProvider?.graph.value
  const processNode = graph?.getCellById(node.data.id)
  if (!processNode) {
    throw createError('Process node not found')
  }
  const processData = processNode.getData().data
  if (processData.extensionElements && processData.extensionElements['flowable:folderCabinetMapping']) {
    const cabinetMapping: object = processData.extensionElements['flowable:folderCabinetMapping']
    if (Array.isArray(cabinetMapping) && cabinetMapping.length > 0) {
      selectedCabinet.value = cabinetMapping[0].attr_id
      elementsIdList.value = cabinetMapping.map(item => item.attr_id)
    } else {
      selectedCabinet.value = (cabinetMapping as any).attr_id
    }
    await getCabinetDetail(selectedCabinet.value)
  } else {
    selectedCabinet.value = ''
    form.value = []
  }
}

async function getList() {
  const response = await adminApi.api.getCabinetList()
  cabinetOptions.value = response.data
}

function handleUpdateField(list: any) {
  let saveItem: any = []

  list.forEach((item: any) => {
    saveItem.push({
      attr_id: item.attr_id,
      attr_name: item.attr_name,
      field: item.field
    })
  })

  graphProvider?.graph.value?.startBatch('update-folderCabinet-field')
  node.setData({
    ...node.data,
    version: node.data.version ? node.data.version + 1 : 1,
    data: {
      ...node.data.data,
      extensionElements: {
        'flowable:folderCabinetMapping': saveItem
      }
    }
  }, {
    overwrite: true,
    deep: true
  })
  graphProvider?.graph.value?.stopBatch('update-folderCabinet-field')
}

function handleUpdateFieldData(item: any) {
  graphProvider?.graph.value?.startBatch('update-folderCabinet-fieldData')
  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }

  const index = newData.data.extensionElements['flowable:folderCabinetMapping'].findIndex((f: any) => f.attr_id === item.attr_id)
  newData.data.extensionElements['flowable:folderCabinetMapping'][index].field = item.field || ''
  node.setData(newData, { overwrite: true, deep: true, silent: false })

  graphProvider?.graph.value?.stopBatch('update-folderCabinet-fieldData')
}

watch(() => node, async () => {
  console.log('node changed')
  await setData()
}, {
  immediate: true,
  deep: true
})

onMounted(async () => {
  await getList()
})
</script>

<template>
  <div class="folderCabinetContainer">
    <ElForm label-position="top" @native.enter="() => {}">
      <ElFormItem lable="Folder Cabinet">
        <ElSelect v-model="selectedCabinet" :disabled="editorProvider.readonly.value" @change="getCabinetDetail"
                  clearable>
          <ElOption v-for="item in cabinetOptions" :key="item.id" :label="item.label" :value="item.id" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <div class="folderCabinetDetail" v-if="selectedCabinet && cabinetDetail">
      <BpmnContextFolderCabinet1Detail v-loading="detailLoading" v-model:field="form" :all-field="allFields"
                                       :folderCabinetItem="cabinetDetail" @update:fields="handleUpdateField"
                                       @update:fieldData="handleUpdateFieldData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.folderCabinetContainer {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: calc(var(--app-space-xs) / 2);
  overflow: hidden;

  .folderCabinetDetail {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
