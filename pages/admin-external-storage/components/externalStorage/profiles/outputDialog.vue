<template>
  <el-dialog v-model="dialogVisible" class="scroll-dialog outputDialog" :title="isEdit ? $t('externalStorage.outputEdit') : $t('externalStorage.outputNew')">
    <el-form label-position="top" :model="form" :rules="rules" ref="formRef">
      <el-form-item :label="$t('docType_documentType')" prop="documentType">
        <el-select class="documentType" v-model="form.documentType" filterable clearable>
          <el-option v-for="item in documentTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('externalStorage.outputFormat')" prop="outputFormat">
        <el-select class="outputFormat" v-model="form.outputFormat" filterable clearable>
          <el-option v-for="item in outputFormatOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <template v-if="form.outputFormat === 'Text'">
        <el-form-item :label="$t('externalStorage.keepLineBreaks')" prop="keepLineBreaks" required>
          <el-select class="keepLineBreaks" v-model="form.keepLineBreaks" filterable clearable>
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.insertPageBreakChar')" prop="insertPageBreakChar" required>
          <el-select class="insertPageBreakChar" v-model="form.insertPageBreakChar" filterable clearable>
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('externalStorage.useBlankLineAsParaSep')" prop="useBlankLineAsParaSep" required>
          <el-select class="useBlankLineAsParaSep" v-model="form.useBlankLineAsParaSep" filterable clearable>
            <el-option label="Yes" value="Yes" />
            <el-option label="No" value="No" />
          </el-select>
        </el-form-item>
      </template>
      <template v-if="['Image'].includes(form.outputFormat)">
        <el-form-item :label="$t('DAM_fileType')" prop="fileType" required>
          <el-select class="fileType" v-model="form.fileType" filterable clearable>
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
      <el-form-item v-if="['PDF', 'Image'].includes(form.outputFormat)" :label="$t('externalStorage.color')" prop="color">
        <el-select class="color" v-model="form.color" filterable clearable>
          <el-option v-for="item in colorOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('externalStorage.destination')" prop="destination">
        <el-select class="destination" v-model="form.destination" filterable clearable>
          <el-option v-for="item in destinationOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.destination === 'external'" :label="$t('externalStorage.externalStorageProfile')" prop="shareDriveProfile">
        <el-select class="shareDriveProfile" v-model="form.shareDriveProfile" filterable clearable>
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
        <el-form-item :label="$t('externalStorage.fileName')" prop="fileName">
          <el-input class="fileName" v-model="form.fileName" ref="fileNameInput" />
          <el-dropdown @command="(value: string) => handleVariableSelect(value, 'fileName')">
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
        <WorkflowVariableMapping v-if="form.workflow" :workflow="form.workflow" :varList="workflowVOpts" />
      </template>
      <el-form-item v-if="form.destination === 'external'" :label="$t('externalStorage.duplicateNameStrategy')" prop="duplicateNameStrategy" required>
        <el-select class="duplicateNameStrategy" v-model="form.duplicateNameStrategy" filterable clearable>
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
  fileName: '',
  documentType: 'File',
  outputFormat: '',
  color: '',
  destination: '',
  shareDriveProfile: '',
  path: '/',
  fileType: '', // 新增
  resolution: 1, // 新增
  quality: 80, // 新增
  keepLineBreaks: 'Yes', // 新增
  insertPageBreakChar: 'Yes', // 新增
  useBlankLineAsParaSep: 'Yes', // 新增
  duplicateNameStrategy: '' // 新增
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
  workflowOpts,
  workflowVOpts
} = useOutputOptioins()
const formRef = ref<any>(null)
const form = ref<any>({
  ...defaultValue
})
const setting = ref<any>(null)
const rules = {
  fileName: [{ required: true, message: t('render.hint.fieldRequired', { name: t('docType_documentType') }), trigger: 'blur' }],
  documentType: [{ required: true, message: t('render.hint.fieldRequired', { name: t('docType_documentType') }), trigger: 'change' }],
  outputFormat: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.outputFormat') }), trigger: 'change' }],
  color: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.color') }), trigger: 'change' }],
  destination: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.destination') }), trigger: 'change' }],
  shareDriveProfile: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.externalStorageProfile') }), trigger: 'change' }],
  path: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.path') }), trigger: 'blur' }],
  fileType: [{ required: true, message: t('render.hint.fieldRequired', { name: t('DAM_fileType') }), trigger: 'change' }],
  resolution: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.resolution') }), trigger: 'change' }],
  quality: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.quality') }), trigger: 'blur' }],
  keepLineBreaks: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.keepLineBreaks') }), trigger: 'change' }], // 新增
  insertPageBreakChar: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.insertPageBreakChar') }), trigger: 'change' }], // 新增
  useBlankLineAsParaSep: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.useBlankLineAsParaSep') }), trigger: 'change' }], // 新增
  duplicateNameStrategy: [{ required: true, message: t('render.hint.fieldRequired', { name: t('externalStorage.duplicateNameStrategy') }), trigger: 'change' }] // 新增
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
    if (isEdit.value) {
      await adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordid(props.id as string, setting.value.id, form.value)
    } else {
      await adminApi.api.postExternalstorageProfilesProfileidOutputrecord(props.id as string, form.value)
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
