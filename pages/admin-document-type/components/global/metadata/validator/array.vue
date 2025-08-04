<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">

    <ElFormItem :label="t('metadata.validation.array.itemType')" :required="false">
      <ElInput class="array-item-type-input" v-model="validation.itemType" :placeholder="t('metadata.validation.array.itemType')" />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.array.minItems')" :required="false">
      <ElInput class="array-min-items-input" v-model="validation.minItems" :placeholder="t('metadata.validation.array.minItems')" type="number" min="0" />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.array.maxItems')" :required="false">
      <ElInput class="array-max-items-input" v-model="validation.maxItems" :placeholder="t('metadata.validation.array.maxItems')" type="number" min="0" />
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')">
      <ElAlert 
        :title="t('metadata.validation.array.title')" 
        :description="t('metadata.validation.array.description')" 
        type="info" 
        show-icon 
      />
    </ElFormItem>
    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ ArrayValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<ArrayValidation>('validation', { required: true })

const { t } = useI18n()

const formRef = ref<FormInstance>()

const validationRules = reactive({
  // Add validation rules if needed
})

const validate = async () => {
  // Array validation has no required fields to validate
  return true
}

const getData = () => {
  return validation.value
}

defineExpose( { validate, getData })
</script> 
