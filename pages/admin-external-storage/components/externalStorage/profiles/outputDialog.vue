<template>
  <el-dialog v-model="dialogVisible" class="scroll-dialog outputDialog" :title="isEdit ? $t('externalStorage.outputEdit') : $t('externalStorage.outputNew')">
    <el-form label-position="top" :model="form" :rules="rules" ref="formRef">
      <el-form-item :label="$t('docType_documentType')" prop="documentType">
        <el-select class="documentType" v-model="form.documentType">
          <el-option v-for="item in documentTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('externalStorage.outputFormat')" prop="outputFormat">
        <el-select class="outputFormat" v-model="form.outputFormat">
          <el-option v-for="item in outputFormatOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="form.outputFormat === 'Text'">
        <el-form-item :label="$t('externalStorage.keepLineBreaks')" prop="keepLineBreaks" required>
          <el-select class="keepLineBreaks" v-model="form.keepLineBreaks">
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.insertPageBreakChar')" prop="insertPageBreakChar" required>
          <el-select class="insertPageBreakChar" v-model="form.insertPageBreakChar">
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.useBlankLineAsParaSep')" prop="useBlankLineAsParaSep" required>
          <el-select class="useBlankLineAsParaSep" v-model="form.useBlankLineAsParaSep">
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
      </template>
      <template v-if="['Image'].includes(form.outputFormat)">
        <el-form-item :label="$t('DAM_fileType')" prop="fileType" required>
          <el-select class="fileType" v-model="form.fileType">
            <el-option v-for="item in fileTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.resolution')" prop="resolution" required>
          <el-select class="resolution" v-model="form.resolution">
            <el-option v-for="item in resolutionOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.quality')" prop="quality" required>
          <el-input class="quality" v-model="form.quality" type="number" min="1" max="100" />
        </el-form-item>
      </template>
      <el-form-item v-if="['PDF', 'Image'].includes(form.outputFormat)" :label="$t('externalStorage.color')" prop="color">
        <el-select class="color" v-model="form.color">
          <el-option v-for="item in colorOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-divider />

      <el-form-item :label="$t('externalStorage.destination')" prop="destination">
        <el-select class="destination" v-model="form.destination">
          <el-option v-for="item in destinationOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.destination === 'external'" :label="$t('externalStorage.externalStorageProfile')" prop="externalProfile">
        <el-select class="shareDriveProfile" v-model="form.shareDriveProfile">
          <el-option v-for="item in externalStorageProfileOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="form.destination !== 'Workflow'">
        <el-form-item :label="$t('externalStorage.path')" prop="path">
          <el-input class="path" v-model="form.path" ref="pathInput" />
          <el-dropdown @command="(value: string) => handleVariableSelect(value, 'path')">
            <el-button class="el-icon--right pathAddVariable"> Add Variable </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in pathVOpts" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.fileName')" prop="fileName">
          <el-input class="fileName" v-model="form.fileName" ref="fileNameInput" />
          <el-dropdown @command="(value: string) => handleVariableSelect(value, 'fileName')">
            <el-button class="el-icon--right fileNameAddVariable"> Add Variable </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in fileNameVOpts" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item :label="$t('externalStorage.file')" prop="file">
          <el-select class="file" v-model="form.file">
            <el-option v-for="item in fileOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.fileName')" prop="documentName">
          <el-select class="documentName" v-model="form.documentName">
            <el-option v-for="item in documentNameOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('dpSearch.searchMeta')" prop="meta">
          <el-select class="meta" v-model="form.meta">
            <el-option v-for="item in metaOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item v-if="form.destination === 'external'" :label="$t('externalStorage.duplicateNameStrategy')" prop="duplicateNameStrategy" required>
        <el-select class="duplicateNameStrategy" v-model="form.duplicateNameStrategy" placeholder="Please select">
          <el-option v-for="item in duplicateNameStrategyOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="cancel-btn" @click="dialogVisible = false">{{ $t('cancelText') }}</el-button>
      <el-button class="save-btn" type="primary" @click="save">{{ $t('common_save') }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { adminApi } from 'api'
const props = defineProps({
  storageId: String,
  id: String,
  settings: Object
})
const defaultValue = {
  fileName: '',
  documentType: '',
  outputFormat: '',
  color: '',
  destination: '',
  shareDriveProfile: '',
  path: '/',
  fileType: '', // 新增
  resolution: '', // 新增
  quality: '', // 新增
  keepLineBreaks: '', // 新增
  insertPageBreakChar: '', // 新增
  useBlankLineAsParaSep: '', // 新增
  duplicateNameStrategy: '', // 新增
  file: '',
  documentName: '',
  meta: ''
}
const { t } = useI18n()
const dialogVisible = ref(false)
const isEdit = ref(false)
const {
  documentTypeOpts,
  outputFormatOpts,
  fileTypeOpts,
  resolutionOpts,
  colorOpts,
  destinationOpts,
  externalStorageProfileOpts,
  duplicateNameStrategyOpts,
  pathVOpts,
  fileNameVOpts,
  metaOpts,
  documentNameOpts,
  fileOpts
} = useOutputOptioins()
const formRef = ref<any>(null)
const form = ref<any>({
  ...defaultValue
})
const setting = ref<any>(null)
const rules = {
  fileName: [{ required: true, message: 'File name is required', trigger: 'blur' }],
  documentType: [{ required: true, message: 'Document Type is required', trigger: 'change' }],
  outputFormat: [{ required: true, message: 'outputFormat is required', trigger: 'change' }],
  color: [{ required: true, message: 'Color is required', trigger: 'change' }],
  destination: [{ required: true, message: 'Destination is required', trigger: 'change' }],
  shareDriveProfile: [{ required: true, message: 'Share Drive Profile is required', trigger: 'change' }],
  path: [{ required: true, message: 'Path is required', trigger: 'blur' }],
  fileType: [{ required: true, message: 'File type is required', trigger: 'change' }],
  resolution: [{ required: true, message: 'Resolution is required', trigger: 'change' }],
  quality: [{ required: true, message: 'Quality is required', trigger: 'blur' }],
  keepLineBreaks: [{ required: true, message: 'Keep line breaks is required', trigger: 'change' }], // 新增
  insertPageBreakChar: [{ required: true, message: 'Insert page break character is required', trigger: 'change' }], // 新增
  useBlankLineAsParaSep: [{ required: true, message: 'Use blank line as paragraph separator is required', trigger: 'change' }], // 新增
  duplicateNameStrategy: [{ required: true, message: 'Please select replace or rename', trigger: 'change' }], // 新增
  file: [{ required: true, message: 'File is required', trigger: 'change' }],
  documentName: [{ required: true, message: 'Document Name is required', trigger: 'change' }],
  meta: [{ required: true, message: 'Meta is required', trigger: 'change' }]
}

function handleOpen(data: any, _isEdit = false) {
  isEdit.value = _isEdit
  setting.value = null
  if (!!data) {
    form.value = {
      ...defaultValue,
      ...data
    }
    setting.value = { ...data }
  }
  console.log(form.value)
  dialogVisible.value = true
}

const pathInput = ref<any>(null)
const fileNameInput = ref<any>(null)
function handleVariableSelect(variable: string, attr = 'fileName') {
  // 识别当前光标位置
  const input = attr === 'fileName' ? fileNameInput.value.input : pathInput.value.input
  const start = input.selectionStart
  const end = input.selectionEnd
  form.value[attr] = form.value[attr].substring(0, start) + variable + form.value[attr].substring(end)
  // 重新聚焦并设置光标
  nextTick(() => {
    input.setSelectionRange(start + variable.length, start + variable.length)
    input.focus()
  })
}

async function save() {
  try {
    await formRef.value.validate()
    if (isEdit.value) {
      await adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordid(props.id as string, setting.value.id, form.value)
    } else {
      await adminApi.api.postExternalstorageProfilesProfileidOutputrecord(props.id as string, form.value)
    }
    dialogVisible.value = false
  } catch (error) {
    console.log(error)
  } finally {
  }
}

defineExpose({
  handleOpen
})
</script>
