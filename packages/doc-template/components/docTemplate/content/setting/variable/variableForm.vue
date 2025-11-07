<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    label-position="top"
    class="variable-form"
    @submit.prevent
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" autocomplete="off" v-tooltip="nameTooltip" />
    </el-form-item>
    <el-form-item label="Type" prop="type">
      <el-select v-model="form.type" placeholder="Select type" :disabled="props.mode==='edit'">
        <el-option v-for="type in variableTypes" :key="type" :label="typeLabel(type)" :value="type" />
      </el-select>
    </el-form-item>
    <el-form-item label="Value" prop="value">
      <component
        :is="valueEditorComponent"
        v-model="form.value"
      />
    </el-form-item>
    <div class="actions">
      <el-button id="Variable__Manage__Form__Submit" type="primary" @click="handleSubmit">
        {{ mode === 'create' ? 'Create' : 'Update' }}
      </el-button>
      <el-button id="Variable__Manage__Form__Cancel" @click="handleCancel">Cancel</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits, inject } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { VariableType } from '../../../../../types/variable'
import { DocTemplateProveKey } from '../../../../../utils/docTemplateHelper'
import type { DocTemplateVariable } from '../../../../../utils/docTemplateHelper'
import VariableValueText from './VariableValueText.vue'
import VariableValueList from './VariableValueList.vue'
import VariableValueTable from './VariableValueTable.vue'
import VariableValueLink from './VariableValueLink.vue'
import VariableValueImage from './VariableValueImage.vue'
import VariableValueSignature from './signature/form.vue'

interface CreateVariableInput {
  id: string
  name: string
  type: VariableType
  value: any
}

const props = defineProps<{
  mode: 'create' | 'edit'
  variable: DocTemplateVariable | null
}>()
const emit = defineEmits<{
  (e: 'submit', payload: { mode: 'create' | 'edit'; variable: CreateVariableInput | DocTemplateVariable }): void
  (e: 'cancel'): void
}>()

const docTemplateCtx = inject(DocTemplateProveKey)
const variables = docTemplateCtx?.variables || []

const formRef = ref<FormInstance>()
const form = ref<CreateVariableInput | DocTemplateVariable>({
  id: '',
  name: '',
  type: 'text',
  value: ''
})

const variableTypes: VariableType[] = ['text', 'list', 'table', 'link', 'signature']

const namePattern = /^[A-Za-z0-9_]+$/

const nameTooltip = computed(() => {
  if (!form.value.name) return 'Variable name is required.'
  if (!namePattern.test(form.value.name)) return 'Name can only contain letters, numbers, and underscores.'
  if (!isNameUnique(form.value.name)) return 'Name must be unique.'
  return ''
})

function typeLabel(type: VariableType) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function isNameValid(name: string) {
  return namePattern.test(name)
}

function isNameUnique(name: string) {
  const arr = Array.isArray(variables) ? variables : variables?.value || []

  // check if the name is the same as the original name
  if (props.mode === 'edit' && props.variable?.name?.toLowerCase() === name.toLowerCase()) {
    return true
  }

  return !arr.some((v: any) => {
    const vName = v.name ?? ''
    const vKey = v.key ?? ''
    return vName.toLowerCase() === name.toLowerCase() && (props.mode === 'create' || vKey !== (props.variable && (props.variable as any).key))
  })
}

const valueEditorComponent = computed(() => {
  switch (form.value.type) {
    case 'text':
      return VariableValueText
    case 'list':
      return VariableValueList
    case 'table':
      return VariableValueTable
    case 'link':
      return VariableValueLink
    case 'image':
      return VariableValueImage
    case 'signature':
      return VariableValueSignature
    default:
      return VariableValueText
  }
})

const rules = computed<FormRules>(() => ({
  name: [
    { required: true, message: 'Name is required', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: any) => {
        if (!isNameValid(value)) {
          callback(new Error('Name can only contain letters, numbers, and underscores'))
        } else if (!isNameUnique(value)) {
          callback(new Error('Name must be unique'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ],
  type: [
    { required: true, message: 'Type is required', trigger: 'change' }
  ],
  value: [
    { required: true, message: 'Value is required', trigger: 'blur' }
  ]
}))

function isDocTemplateVariable(obj: any): obj is DocTemplateVariable {
  return obj && typeof obj === 'object' && 'key' in obj && 'type' in obj
}

watch(() => props.variable, (val) => {
  if (props.mode === 'edit' && val) {
    form.value = { ...val, name: val.name ?? '', value: val.value ?? '' }
  } else {
    form.value = {
      id: new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15),
      name: '',
      type: 'text' as VariableType,
      value: ''
    }
  }
}, { immediate: true })

async function handleSubmit() {
  try {
    await formRef.value?.validate()
    if (props.mode === 'create') {
      emit('submit', { mode: 'create', variable: form.value as CreateVariableInput })
    } else {
      emit('submit', { mode: 'edit', variable: form.value as DocTemplateVariable })
    }
  } catch (error) {
    console.error(error)
  }
}

function handleCancel() {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.variable-form {
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
}
</style> 
