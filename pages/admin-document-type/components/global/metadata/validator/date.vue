<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">

    <ElFormItem :label="t('metadata.validation.date.dateOrDateTime')" :required="true">
      <ElSelect v-model="validation.dateOrDateTime" :placeholder="t('metadata.validation.date.dateOrDateTime')">
        <ElOption label="Date" value="date" />
        <ElOption label="Date Time" value="dateTime" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.date.format')" :required="true">
      <ElInput v-model="validation.format" :placeholder="t('metadata.validation.date.format')" />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.date.defaultValue')" :required="false">
      <ElSelect v-model="defaultValueType" :placeholder="t('metadata.validation.date.defaultValueType')">
        <ElOption label="None" value="none" />
        <ElOption label="Special Value" value="special" />
        <ElOption label="Specific Date" value="date" />
      </ElSelect>
      
      <ElSelect 
        v-if="defaultValueType === 'special'" 
        v-model="validation.defaultValue" 
        :placeholder="t('metadata.validation.date.specialValue')"
        class="mt-2"
      >
        <ElOption label="Today" value="today" />
        <ElOption label="Tomorrow" value="tomorrow" />
        <ElOption label="Yesterday" value="yesterday" />
        <ElOption label="Now" value="now" />
      </ElSelect>
      
      <ElDatePicker 
        v-if="defaultValueType === 'date'" 
        v-model="validation.defaultValue" 
        :type="validation.dateOrDateTime === 'date' ? 'date' : 'datetime'"
        :format="validation.format"
        :placeholder="t('metadata.validation.date.specificDate')"
        class="mt-2"
      />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.date.isMultiple')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>
    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ DateValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<DateValidation>('validation', { required: true })

const { t } = useI18n()

const defaultValueType = ref<'none' | 'special' | 'date'>('none')

// Watch for changes in defaultValueType to handle the validation.defaultValue
watch(defaultValueType, (newType) => {
  if (newType === 'none') {
    validation.value.defaultValue = undefined
  }
})

const validationRules = reactive({
  dateOrDateTime: [
    {
      required: true,
    }
  ],
  format: [
    {
      required: true,
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
