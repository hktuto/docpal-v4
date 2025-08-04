<template>
  <ElForm ref="formRef" :model="validation" label-position="top">

    <ElFormItem :label="t('metadata.validation.object.schema')" :required="false">
      <ElInput 
        v-model="schemaText" 
        type="textarea" 
        :rows="8"
        :placeholder="t('metadata.validation.object.schema')"
        @input="updateSchema"
      />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.object.info')">
      <ElAlert 
        :title="t('metadata.validation.object.title')" 
        :description="t('metadata.validation.object.description')" 
        type="info" 
        show-icon 
      />
    </ElFormItem>
    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ ObjectValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<ObjectValidation>('validation', { required: true })

const { t } = useI18n()

const formRef = ref<FormInstance>()

const schemaText = ref('')

const updateSchema = () => {
  try {
    if (schemaText.value.trim()) {
      validation.value.schema = JSON.parse(schemaText.value)
    } else {
      validation.value.schema = undefined
    }
  } catch (error) {
    // Invalid JSON - keep the text but don't update schema
  }
}

const validate = async () => {
  // Object validation has no required fields to validate
  return true
}

const getData = () => {
  return validation.value
}

defineExpose( { validate, getData })
</script> 
