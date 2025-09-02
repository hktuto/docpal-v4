<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">
    <ElFormItem :label="t('metadata.validation.date.dateOrDateTime')" class="date-or-date-time-item" :required="true">
      <ElSelect v-model="validation.dateOrDateTime" :placeholder="t('metadata.validation.date.dateOrDateTime')">
        <ElOption label="Date" value="date" />
        <ElOption label="Date Time" value="dateTime" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.date.format')" class="date-format-item" :required="true">
      <el-select
        v-model="validation.format"
        :placeholder="t('metadata.validation.date.format')"
        clearable
        filterable
        allow-create
        default-first-option
        class="date-format-select"
      >
        <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
        <el-option label="YYYY-MM-DD HH:mm" value="YYYY-MM-DD HH:mm" />
        <el-option label="YYYY-MM-DD HH:mm:ss" value="YYYY-MM-DD HH:mm:ss" />
        <el-option label="YYYY-MM-DDTHH:mm:ss.000Z" value="YYYY-MM-DDTHH:mm:ss.000Z" />
        <el-option label="YYYY/MM/DD" value="YYYY/MM/DD" />
      </el-select>
      <!-- <ElInput v-model="validation.format" :placeholder="t('metadata.validation.date.format')" /> -->
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.date.defaultValue')" class="date-default-value-item" :required="false">
      <ElSelect v-model="defaultValueType" class="date-default-value-select" :placeholder="t('metadata.validation.date.defaultValue')">
        <ElOption label="None" value="none" />
        <ElOption :label="t('metadata.validation.date.specialValue')" value="special" />
        <ElOption :label="t('metadata.validation.date.specificDate')" value="date" />
      </ElSelect>

      <ElSelect
        v-if="defaultValueType === 'special'"
        v-model="validation.defaultValue"
        :placeholder="t('metadata.validation.date.specialValue')"
        class="special-value-select"
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
        class="date-picker"
      />
    </ElFormItem>
    <ElFormItem :label="t('designer.widgetLabel.date-range')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import type { DateValidation } from '../../../../utils/metadataHelper'
import type { FormInstance } from 'element-plus'

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
      required: true
    }
  ],
  format: [
    {
      required: true
    }
  ]
})

const formRef = ref<FormInstance>()

const validate = async () => {
  return await formRef.value?.validate()
}

const getData = () => {
  return validation.value
}
const initData = (data: DateValidation) => {
  console.log(data, 'data')
  validation.value = data
  if (!data.defaultValue) {
    defaultValueType.value = 'none'
  } else if (Date.parse(data.defaultValue)) {
    defaultValueType.value = 'date'
  } else {
    defaultValueType.value = 'special'
  }
}
defineExpose({ validate, getData, initData })
</script>
<style lang="scss" scoped>
.date-default-value-select {
  margin-bottom: var(--app-space-xs);
}
</style>
