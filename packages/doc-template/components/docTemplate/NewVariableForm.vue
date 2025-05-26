<template>
  <el-dialog 
    v-model="visible" 
    :title="$t('docTemplate.variableManager.addNewTitle')" 
    width="400px" 
    destroy-on-close
    @close="handleClose"
  >
    <el-form :model="newVar" label-width="80px" ref="formRef" :rules="rules">
      <el-form-item :label="$t('docTemplate.variableManager.key')" prop="key">
        <el-input v-model="newVar.key" />
      </el-form-item>
      <el-form-item :label="$t('docTemplate.variableManager.type')">
        <el-select v-model="newVar.type" :placeholder="$t('docTemplate.variableManager.selectType')">
          <el-option :label="$t('docTemplate.variableManager.types.text')" value="Text" />
          <el-option :label="$t('docTemplate.variableManager.types.paragraph')" value="Paragraph" />
          <el-option :label="$t('docTemplate.variableManager.types.documentId')" value="documentId" />
          <el-option :label="$t('docTemplate.variableManager.types.caseId')" value="CaseId" />
          <el-option :label="$t('docTemplate.variableManager.types.workflowId')" value="WorkflowId" />
          <el-option :label="$t('docTemplate.variableManager.types.email')" value="Email" />
          <el-option :label="$t('docTemplate.variableManager.types.website')" value="Website" />
          <el-option :label="$t('docTemplate.variableManager.types.table')" value="Table" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('docTemplate.variableManager.dataType')">
        <el-select v-model="newVar.dataType" :placeholder="$t('docTemplate.variableManager.selectDataType')">
          <el-option :label="$t('docTemplate.variableManager.dataTypes.string')" value="string" />
          <el-option :label="$t('docTemplate.variableManager.dataTypes.number')" value="number" />
          <el-option :label="$t('docTemplate.variableManager.dataTypes.boolean')" value="boolean" />
          <el-option :label="$t('docTemplate.variableManager.dataTypes.array')" value="array" />
          <el-option :label="$t('docTemplate.variableManager.dataTypes.object')" value="object" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('docTemplate.variableManager.value')">
        <el-input v-model="newVar.value" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClose">{{ $t('vxe.button.cancel') }}</el-button>
        <el-button type="primary" @click="submit">{{ $t('docTemplate.variableManager.add') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, inject, defineExpose } from 'vue'
import { useI18n } from 'vue-i18n'
import { DocTemplateProveKey } from '../../utils/docTempalteHelper'

interface VariableItem {
  key: string
  type: string
  dataType: string
  value: string
}

const { t } = useI18n()
const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')

const visible = ref(false)

const props = defineProps({
  existingVariables: {
    type: Array as () => VariableItem[],
    default: () => []
  }
})

const emit = defineEmits(['variable-added'])

const formRef = ref()
const newVar = ref<VariableItem>({
  key: '',
  type: 'Text',
  dataType: 'string',
  value: ''
})

const rules = {
  key: [
    { required: true, message: () => t('docTemplate.variableManager.keyRequired'), trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (!value) {
          callback()
          return
        }
        const isDuplicate = props.existingVariables.some(variable => variable.key === value)
        if (isDuplicate) {
          callback(new Error(t('docTemplate.variableManager.duplicateKey')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

async function submit() {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    emit('variable-added', {...newVar.value})
    resetForm()
    visible.value = false
  } catch (error) {
    // Validation failed
    return
  }
}

function handleClose() {
  resetForm()
  visible.value = false
}

function resetForm() {
  newVar.value = { key: '', type: 'Text', dataType: 'string', value: '' }
  formRef.value?.resetFields()
}

const open = (prefilledKey?: string) => {
  if (prefilledKey) {
    newVar.value.key = prefilledKey
  }
  visible.value = true
}

const close = () => {
  handleClose()
}

defineExpose({
  open,
  close
})
</script> 
