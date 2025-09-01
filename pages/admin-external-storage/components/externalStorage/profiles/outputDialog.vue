<template>
  <el-dialog v-model="dialogVisible" class="scroll-dialog outputDialog" :title="isEdit ? $t('externalStorage.outputEdit') : $t('externalStorage.outputNew')">
    <el-form label-position="top" :model="form" :rules="rules" ref="formRef">
      <el-form-item :label="$t('docType_documentType')" prop="document_type">
        <el-select class="documentType" v-model="form.document_type" filterable clearable>
          <el-option v-for="item in documentTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('externalStorage.outputFormat')" prop="output_format">
        <el-select class="outputFormat" v-model="form.output_format" filterable clearable>
          <el-option v-for="item in outputFormatOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="form.output_format === 'Text'">
        <el-form-item :label="$t('externalStorage.keepLineBreaks')" prop="keep_line_breaks" required>
          <el-select class="keepLineBreaks" v-model="form.keep_line_breaks" filterable clearable>
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.insertPageBreakChar')" prop="insert_page_break_char" required>
          <el-select class="insertPageBreakChar" v-model="form.insert_page_break_char" filterable clearable>
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.useBlankLineAsParaSep')" prop="use_blank_line_as_para_sep" required>
          <el-select class="useBlankLineAsParaSep" v-model="form.use_blank_line_as_para_sep" filterable clearable>
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
      </template>
      <template v-if="['Image'].includes(form.output_format)">
        <el-form-item :label="$t('DAM_fileType')" prop="file_type" required>
          <el-select class="fileType" v-model="form.file_type" filterable clearable>
            <el-option v-for="item in fileTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.resolution')" prop="resolution" required>
          <el-select class="resolution" v-model="form.resolution" filterable clearable>
            <el-option v-for="item in resolutionOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.quality')" prop="quality" required>
          <el-input class="quality" v-model="form.quality" type="number" min="1" max="100" />
        </el-form-item>
      </template>
      <el-form-item v-if="['PDF', 'Image'].includes(form.output_format)" :label="$t('externalStorage.color')" prop="color">
        <el-select class="color" v-model="form.color" filterable clearable>
          <el-option v-for="item in colorOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('externalStorage.destination')" prop="destination">
        <el-select class="destination" v-model="form.destination" filterable clearable>
          <el-option v-for="item in destinationOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.destination === 'external'" :label="$t('externalStorage.externalStorageProfile')" prop="share_drive_profile">
        <el-select class="shareDriveProfile" v-model="form.share_drive_profile" filterable clearable>
          <el-option v-for="item in externalStorageProfileOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="form.destination !== 'workflow'">
        <el-form-item :label="$t('externalStorage.path')" prop="path">
          <el-input class="path" v-model="form.path" ref="pathInput" />
          <el-dropdown @command="(value: string) => handleVariableSelect(value, 'path')">
            <el-button type="primary" class="el-icon--right pathAddVariable"> {{ $t('docTemplate.variable.addVariable') }} </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in pathVOpts" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.fileName')" prop="file_name">
          <el-input class="fileName" v-model="form.file_name" ref="fileNameInput" />
          <el-dropdown @command="(value: string) => handleVariableSelect(value, 'file_name')">
            <el-button type="primary" class="el-icon--right fileNameAddVariable"> {{ $t('docTemplate.variable.addVariable') }} </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in fileNameVOpts" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item :label="$t('workflow_workflow')" prop="workflow">
          <el-select class="workflow" v-model="form.workflow" filterable clearable>
            <el-option v-for="item in workflowOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-divider />
        <WorkflowVariableMapping v-if="form.workflow" ref="WorkflowVariableMappingRef" :setting="setting" :workflow="form.workflow" :varList="workflowVOpts" />
      </template>
      <el-form-item v-if="form.destination === 'external'" :label="$t('externalStorage.duplicateNameStrategy')" prop="duplicate_name_strategy" required>
        <el-select class="duplicateNameStrategy" v-model="form.duplicate_name_strategy" filterable clearable>
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
const emits = defineEmits(['refresh'])
const defaultValue = {
  file_name: '',
  document_type: 'File',
  output_format: '',
  color: '',
  destination: '',
  share_drive_profile: '',
  path: '/',
  file_type: '', // 新增
  resolution: 1, // 新增
  quality: 80, // 新增
  keep_line_breaks: 'Yes', // 新增
  insert_page_break_char: 'Yes', // 新增
  use_blank_line_as_para_sep: 'Yes', // 新增
  duplicate_name_strategy: 'replace' // 新增
}
const { t } = useI18n()
const dialogVisible = ref(false)
const isEdit = ref(false)
const outputOptioins = inject('outputOptioins')
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
  workflowOpts,
  workflowVOpts
} = outputOptioins
const formRef = ref<any>(null)
const form = ref<any>({
  ...defaultValue
})
const setting = ref<any>(null)
const rules = {
  file_name: [{ required: true, message: t('render.hint.fieldRequired', { name: t('docType_documentType') }), trigger: 'blur' }],
  document_type: [{ required: true, message: t('render.hint.fieldRequired', { name: t('docType_documentType') }), trigger: 'change' }],
  output_format: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.outputFormat') }), trigger: 'change' }],
  color: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.color') }), trigger: 'change' }],
  destination: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.destination') }), trigger: 'change' }],
  share_drive_profile: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.externalStorageProfile') }), trigger: 'change' }],
  path: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.path') }), trigger: 'blur' }],
  file_type: [{ required: true, message: t('render.hint.fieldRequired', { name: t('DAM_fileType') }), trigger: 'change' }],
  resolution: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.resolution') }), trigger: 'change' }],
  quality: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.quality') }), trigger: 'blur' }],
  keep_line_breaks: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.keepLineBreaks') }), trigger: 'change' }], // 新增
  insert_page_break_char: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.insertPageBreakChar') }), trigger: 'change' }], // 新增
  use_blank_line_as_para_sep: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.useBlankLineAsParaSep') }), trigger: 'change' }], // 新增
  duplicate_name_strategy: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.duplicateNameStrategy') }), trigger: 'change' }] // 新增
}
const WorkflowVariableMappingRef = ref<any>(null)

function handleOpen(data: any, _isEdit = false) {
  isEdit.value = _isEdit
  setting.value = null
  if (!!data) {
    form.value = {
      ...defaultValue,
      ...data
    }
    setting.value = { ...data }
  } else {
    form.value = {
      ...defaultValue
    }
  }
  dialogVisible.value = true
  setTimeout(() => {
    formRef.value.clearValidate()
  })
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
    const params = { ...form.value }
    if (form.value.workflow) {
      const workflowMapping = WorkflowVariableMappingRef.value.getData()
      params.workflow_mapping = workflowMapping
    }
    if (isEdit.value) {
      await adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordid(props.id as string, setting.value.id, params)
    } else {
      await adminApi.api.postExternalstorageProfilesProfileidOutputrecord(props.id as string, params)
    }
    emits('refresh')
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
