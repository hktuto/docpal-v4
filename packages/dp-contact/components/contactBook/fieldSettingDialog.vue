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
      <el-button type="primary" @click="handleConfirm">{{ $t('button.add', { name: $t('contactBook.field') }) }}</el-button>
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
// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', field: Field): void
}
const props = defineProps(['existingFields'])
const emit = defineEmits<Emits>()
const { t } = useI18n()
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
    { required: true, message: t('render.hint.fieldRequired', { name: t('contactBook.fieldName') }), trigger: 'blur' },
    { min: 1, max: 50, message: t('render.hint.fieldLength', { name: t('contactBook.fieldName'), min: 1, max: 50 }), trigger: 'blur' },
    { validator: checkIfFieldExists, trigger: 'blur' }
  ]
}
function checkIfFieldExists(rule: any, value: any, callback: any) {
  if (props.existingFields.some((field: any) => field.name.toLowerCase() === value.toLowerCase())) {
    callback(new Error(t('common_nameExists')))
  } else {
    callback()
  }
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

async function handleConfirm() {
  if (!formRef.value) return
  try {
    const valid = await formRef.value.validate()
    if (!valid) {
      return
    }
    emit('confirm', {
      name: formData.name,
      value: formData.value,
      dataType: formData.dataType
    })

    // Reset form and close dialog
    formRef.value?.resetFields()
    visible.value = false
  } catch (error) {
    console.error(error)
  }
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
