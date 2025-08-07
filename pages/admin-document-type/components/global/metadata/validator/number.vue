<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">
    <ElFormItem :label="t('metadata.validation.number.minimum')" :required="false">
      <ElInput v-model="validation.minimum" :placeholder="t('metadata.validation.number.minimum')" type="number" />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.number.maximum')" :required="false">
      <ElInput v-model="validation.maximum" :placeholder="t('metadata.validation.number.maximum')" type="number" />
    </ElFormItem>

    <ElFormItem :label="t('marsterTable.type.decimal')" :required="true">
      <ElInput v-model="validation.multipleOf" :placeholder="t('marsterTable.type.decimal')" type="number" min="0" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import type { NumberValidation } from '../../../../utils/metadataHelper'
import type { FormInstance } from 'element-plus'

const validation = defineModel<NumberValidation>('validation', { required: true })

const { t } = useI18n()

const validationRules = reactive({
  decimal: [
    {
      required: true
    }
  ]
})

const formRef = ref<FormInstance>()

const validate = async () => formRef.value?.validate()

const getData = () => {
  return validation.value
}

defineExpose({ validate, getData })
</script>
