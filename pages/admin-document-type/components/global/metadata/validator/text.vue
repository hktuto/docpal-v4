<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">

    <ElFormItem :label="t('metadata.validation.text.maxLength')" :required="true">
      <ElInputNumber v-model="validation.maxLength" :placeholder="t('metadata.validation.text.maxLength')" :max="4000" :min="0" />
    </ElFormItem>
    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ TextValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<TextValidation>('validation', { required: true })

const { t } = useI18n()

const validationRules = reactive({
  maxLength: [
    {
      required: true,
      message: t('metadata.validation.text.maxLength.required'),
      trigger: 'blur'
    }
  ]
})

const formRef = ref<FormInstance>()

const validate = async () => {
  await formRef.value?.validate()
}

const getData = () => {
  return validation.value
}

defineExpose( { validate, getData })
</script>
