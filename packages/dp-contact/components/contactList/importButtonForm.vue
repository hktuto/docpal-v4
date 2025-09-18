<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top" label-width="120px">
    <el-form-item :label="$t('docType.File')" prop="file">
      <FormUpload v-model="form.file" :limit="1" :accept="'.xlsx,.csv,.vcf,.vcard'" @change="handleFileChange" />
    </el-form-item>
    <FormVariablesRenderer ref="FormVariablesRendererRef"></FormVariablesRenderer>
    <!-- Handle Replace Section -->
    <el-form-item :label="$t('button.handleDuplicate')">
      <div style="display: flex; align-items: center; gap: 12px">
        <el-switch v-model="form.replace" :inactive-text="$t('button.skip')" :active-text="$t('button.replace')" />
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type UploadFile, type UploadFiles } from 'element-plus'

const props = defineProps<{
  id: string
  name: string
  detail: any
}>()

const contacDetail = inject('contactDetailHelper')
const importHelper = inject('importHelper')
const emit = defineEmits<{
  importComplete: [data: any]
}>()

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const uploadRef = ref()
const fileList = ref<UploadFiles>([])

const form = reactive({
  file: [] as File | null,
  replace: false
})

const rules = {
  file: [{ required: true, message: 'Please upload a file', trigger: 'change' }]
}

async function handleFileChange(files: UploadFiles, fileList: UploadFiles) {
  if (files.length === 0) return
  const fileBlob = files[0].raw ? files[0].raw : files[0]
  if (fileBlob) {
    try {
      const columns = await importHelper.getColumns(fileBlob)
      setDefaultMappings(columns)
    } catch (error) {
      console.error('Error parsing file:', error)
      ElMessage.error('Failed to parse file columns')
    }
  }
}
async function setDefaultMappings(columns: string[]) {
  const data = await FormVariablesRendererRef.value.getData(false)
  const newData = Object.keys(data).reduce((prev, key) => {
    if(!data[key]) {
      const sameKey = columns.find((item: string) => key.toLowerCase().includes(item.toLowerCase()))
      prev[key] = sameKey ? sameKey : ''
    } else {
      prev[key] = columns.includes(data[key]) ? data[key] : ''
    }
    return prev
  }, {})
  initMappings(columns, newData)
}
function resetForm() {
  formRef.value?.resetFields()
  form.file = null
  fileList.value = []
}
const FormVariablesRendererRef = ref()
function initMappings(options: any[] = [], initData?: any) {
  const _options = options.map((item: any) => ({
    label: item,
    value: item
  }))
  const attributes = contacDetail.getAttrMapping(_options)
  FormVariablesRendererRef.value.createJson(attributes)
  if (initData) {
    FormVariablesRendererRef.value.setData(initData)
  }
}
async function getFormData() {
  const valid = await formRef.value?.validate()
  if (valid) {
    const data = {
      file: form.file[0],
      dataMapping: await FormVariablesRendererRef.value.getData(),
      replace: form.replace
    }
    return data
  }
}
defineExpose({ getFormData, initMappings })
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.active {
  color: var(--el-color-primary);
  font-weight: bold;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-weight: 600;
}
</style>
