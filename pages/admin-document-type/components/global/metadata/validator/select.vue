<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">

    <ElFormItem :label="t('metadata.validation.select.options')" :required="true">
      <div class="options-container">
        <div v-for="(option, index) in validation.options" :key="index" class="option-item">
          <ElInput 
            v-model="validation.options[index]" 
            :placeholder="t('metadata.validation.select.optionPlaceholder')" 
            class="option-input"
          />
          <ElButton 
            type="danger" 
            size="small" 
            :class="`remove-option-button_${index}`"
            @click="removeOption(index)"
            :disabled="validation.options.length <= 1"
          >
            {{ t('common_remove') }}
          </ElButton>
        </div>
        <ElButton class="add-option-button" type="primary" size="small" @click="addOption">
          {{ t('designer.setting.addOption') }}
        </ElButton>
      </div>
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>
    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ SelectValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<SelectValidation>('validation', { required: true })

const { t } = useI18n()

const validationRules = reactive({
  options: [
    {
      required: true,
      validator: (rule: any, value: string[], callback: any) => {
        if (!value || value.length === 0) {
          callback(new Error(t('metadata.validation.select.optionsRequired')))
        } else if (value.some(option => !option.trim())) {
          callback(new Error(t('metadata.validation.select.optionsNotEmpty')))
        } else {
          callback()
        }
      }
    }
  ]
})

const formRef = ref<FormInstance>()

const addOption = () => {
  validation.value.options.push('')
}

const removeOption = (index: number) => {
  if (validation.value.options.length > 1) {
    validation.value.options.splice(index, 1)
  }
}

const validate = async () => formRef.value?.validate()

const getData = () => {
  return validation.value
}

defineExpose( { validate, getData })
</script>

<style scoped>
.options-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.option-input {
  flex: 1;
}
</style> 
