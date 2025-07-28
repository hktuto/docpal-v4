<template>
  <ElForm ref="formRef" :model="validation" label-position="top">

    <ElFormItem :label="t('meta.multiple')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>

    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ WorkflowValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<WorkflowValidation>('validation', { required: true })

const { t } = useI18n()

const formRef = ref<FormInstance>()

const validate = async () => true

const getData = () => {
  return validation.value
}

defineExpose({
  validate,
  getData
})
</script> 
