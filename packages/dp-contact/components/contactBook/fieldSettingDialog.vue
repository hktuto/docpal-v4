<template>
  <el-dialog v-model="visible" :title="$t('button.add', { name: $t('contactBook.field') })" :close-on-click-modal="false" @close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top">
      <el-form-item :label="$t('contactBook.fieldName')" prop="name">
        <el-input v-model="formData.name" :placeholder="$t('render.hint.fieldRequired', { name: $t('contactBook.fieldName') })" @input="handleNameChange" />
      </el-form-item>

      <el-form-item :label="$t('contactBook.fieldValue')" prop="value">
        <el-input v-model="formData.value" placeholder="Field value (auto-generated)" readonly disabled />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleConfirm">{{$t('button.add', { name: $t('contactBook.field') })}}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface Field {
  name: string
  value: string
}

// Props
interface Props {
  modelValue: boolean
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', field: Field): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Reactive data
const formRef = ref<FormInstance>()
const visible = ref(props.modelValue)

const formData = reactive<Field>({
  name: '',
  value: '',
  dataType: 'string'
})

// Form validation rules
const formRules: FormRules = {
  name: [
    { required: true, message: 'Please enter field name', trigger: 'blur' },
    { min: 1, max: 50, message: 'Field name must be between 1 and 50 characters', trigger: 'blur' }
  ]
}

// Utility function to convert name to value (remove special characters)
function convertNameToValue(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
}

// Watch for modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue
    if (newValue) {
      // Reset form when dialog opens
      formData.name = ''
      formData.value = ''
    }
  }
)

// Watch for visible changes
watch(visible, (newValue) => {
  emit('update:modelValue', newValue)
})

// Event handlers
function handleNameChange() {
  formData.value = convertNameToValue(formData.name)
}

function handleClose() {
  visible.value = false
}

function handleCancel() {
  visible.value = false
  formRef.value?.resetFields()
}

function handleConfirm() {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      // Emit the new field data
      emit('confirm', {
        name: formData.name,
        value: formData.value,
        dataType: formData.dataType
      })

      // Reset form and close dialog
      formRef.value?.resetFields()
      visible.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  padding: 20px 20px 10px;
}

:deep(.el-dialog__body) {
  padding: 10px 20px;
}

:deep(.el-dialog__footer) {
  padding: 10px 20px 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}
</style>
