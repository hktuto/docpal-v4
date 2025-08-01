<script setup lang="ts">
import type { Node } from '@antv/x6'
import { useDebounceFn } from '@vueuse/core/index'
import { adminApi } from 'api'

const { t } = useI18n()

const { node } = defineProps<{
  node: Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw createError('graph provider not found')
}
graphProvider?.graph.value?.on('history:change', async () => {
  initForm()
})

const allFieldOptions = computed(() => {
  if (!graphProvider.allFormField.value) return []
  return Object.keys(graphProvider.allFormField.value).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: '${variables:get(' + graphProvider.allFormField.value[key].attr_id + ')}'
    }
  })
})

const state = reactive({
  fileField: '',
  fileList: [],
  _fileList: [],
  fields: []
})

const displayFieldList = ref([])

function generateDisplayFieldList() {
  const nodeData = node.getData()
  console.log(nodeData.data)
  if (!nodeData.data.extensionElements || !nodeData.data.extensionElements['flowable:field']) displayFieldList.value = []
  console.log(nodeData.data.extensionElements['flowable:field'])
  displayFieldList.value = nodeData.data.extensionElements['flowable:field'].filter(f => f.attr_name !== 'fileField' && f.attr_name !== 'pdfExample')
}


const loading = ref(false)

const onChange = useDebounceFn(
  async (file: any, _fileList: any) => {
    state.fileList = _fileList.reduce((prev: any, item: any) => {
      prev.push(item)
      return prev
    }, [])
    state._fileList = [...state.fileList]

    state.fields = []
    const formData = new FormData()
    formData.append('file', state.fileList[0].raw)
    loading.value = true
    // call Api
    const { fields, id } = await adminApi.api.postTemplateDocumentParse({}, formData).then(res => res.data)
    // 轉bpmn json
    state.fields = fields
    state.id = id
    if (!id) return

    graphProvider?.graph.value?.startBatch('update-read-pdf-data')
    const nodeData = node.getData()
    const newData = {
      ...nodeData,
      version: (nodeData.version || 0) + 1
    }

    // find flowable:field in extensionElements
    const fileField = nodeData.data.extensionElements['flowable:field'].find(el => el.attr_name === 'fileField')
    let newPdfId = { attr_name: 'pdfExample', ['flowable:expression']: { __cdata: id } }

    newData.data.extensionElements['flowable:field'] = [
      fileField,
      newPdfId,
      // loop field here
      ...fields.map(f => {
        return {
          attr_name: f.name,
          ['flowable:expression']: { __cdata: '' }
        }
      })
    ]
    // remove old field, and create new field
    node.setData(newData, { overwrite: true, deep: true, silent: false })
    graphProvider?.graph.value?.stopBatch('update-read-pdf-data')
    generateDisplayFieldList()
    loading.value = false
  },
  500,
  { maxWait: 5000 }
)

const beforeRemove = (file: any, _fileList: any) => {
  state.fileList = _fileList
}

function initForm() {
  const fileField = node.data.data.extensionElements['flowable:field'].find(el => el.attr_name === 'fileField')
  state.fileField = fileField || ''
  generateDisplayFieldList()
}

function fieldMappingUpdate(newVal: string, name: string) {
  graphProvider?.graph.value?.startBatch('update-upload-pdf-field-data')

  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }
  const index = newData.data.extensionElements['flowable:field'].findIndex(f => f.attr_name === name)

  newData.data.extensionElements['flowable:field'][index]['flowable:expression'].__cdata = newVal || ''

  node.setData(newData, { overwrite: true, deep: true, silent: false })

  graphProvider?.graph.value?.stopBatch('update-upload-pdf-field-data')
  initForm()
}

watch(() => node, async () => {
  if (node && node.data) {
    console.log(node, node.data)
    initForm()
  }
}, {
  immediate: true,
  deep: true
})
</script>

<template>
  <div>
    <BpmnSidebarEditLabel :node="node" />
    <el-form label-width="auto" label-position="top">
      <el-form-item :label="t('File Field')">
        <el-select v-model="state.fileField" placeholder="please select your zone"
                   @change="(val:any) => fieldMappingUpdate(val, 'fileField')"
        >
          <el-option v-for="fieldItem in allFieldOptions" :key="fieldItem.value" :label="fieldItem.label"
                     :value="fieldItem.value" />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('PDF form Example')">
        <el-upload
          v-model:file-list="state.fileList"
          class="upload-demo"
          action="#"
          accept=".pdf"
          :limit="1"
          :auto-upload="true"
          :on-change="onChange"
          :before-remove="beforeRemove"
        >
          <el-button type="primary">{{ t('Click to upload') }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-divider />

    <div v-loading="loading">
      {{ $t('Field Mapping') }}
      <el-form label-width="auto" label-position="top">
        <el-form-item v-for="(item, index) in displayFieldList" :key="item.attr_name" :label="item.attr_name">
          <el-select v-model="item['flowable:expression'].__cdata" placeholder="please select your zone"
                     @change="(val:any) => fieldMappingUpdate(val, item.attr_name)" clearable>
            <el-option v-for="fieldItem in allFieldOptions" :key="fieldItem.value" :label="fieldItem.label"
                       :value="fieldItem.value" />

          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>