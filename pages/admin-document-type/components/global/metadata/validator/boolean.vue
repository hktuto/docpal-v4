<template>
  <ElForm ref="formRef" :model="validation" label-position="top">
    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ BooleanValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<BooleanValidation>('validation', { required: true })

const { t } = useI18n()

const formRef = ref<FormInstance>()

const validate = async () => {
  // Boolean validation has no fields to validate
  return true
}

const getData = () => {
  return validation.value
}

defineExpose( { validate, getData })
</script> 
