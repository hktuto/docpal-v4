<template>
  <ElForm ref="formRef" :model="validation" label-position="top">

    <ElFormItem :label="t('metadata.validation.user.isMultiple')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>

    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ UserValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<UserValidation>('validation', { required: true })

const { t } = useI18n()

const formRef = ref<FormInstance>()

const validate = async () => {
  // User validation has no required fields to validate
  return true
}

const getData = () => {
  return validation.value
}

defineExpose( { validate, getData })
</script> 
