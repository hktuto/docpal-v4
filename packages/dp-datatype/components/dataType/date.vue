<template>
  <div>
    <ElFormItem :label="t('metadata.validation.date.dateOrDateTime')" prop="dateOrDateTime">
      <ElSelect v-model="form.dateOrDateTime" :placeholder="t('metadata.validation.date.dateOrDateTime')">
        <ElOption label="Date" value="date" />
        <ElOption label="Date Time" value="dateTime" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.date.format')" prop="format" :rules="formatRules">
      <el-select
        v-model="form.format"
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
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.date.defaultValue')" prop="defaultValue">
      <ElSelect v-model="defaultValueType" class="date-default-value-select" :placeholder="t('metadata.validation.date.defaultValue')">
        <ElOption label="None" value="none" />
        <ElOption :label="t('metadata.validation.date.specialValue')" value="special" />
        <ElOption :label="t('metadata.validation.date.specificDate')" value="date" />
      </ElSelect>

      <ElSelect
        v-if="defaultValueType === 'special'"
        v-model="form.defaultValue"
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
        v-model="form.defaultValue"
        :type="form.dateOrDateTime === 'date' ? 'date' : 'datetime'"
        :format="form.format"
        :placeholder="t('metadata.validation.date.specificDate')"
        class="date-picker"
      />
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')" prop="isMultiple">
      <ElSwitch v-model="form.isMultiple" />
    </ElFormItem>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: any
}>()
const { t } = useI18n()

// Initialize default values if not exists
if (!props.form.dateOrDateTime) {
  props.form.dateOrDateTime = 'date'
}
if (!props.form.format) {
  props.form.format = 'YYYY-MM-DD'
}
if (!props.form.isMultiple) {
  props.form.isMultiple = false
}

const formatRules = [
  {
    required: true,
    message: t('render.hint.fieldRequired', { name: t('metadata.validation.date.format') }),
    trigger: 'blur'
  }
]

const defaultValueType = ref<'none' | 'special' | 'date'>('none')

// Watch for changes in defaultValueType to handle the validation.defaultValue
watch(defaultValueType, (newType) => {
  if (newType === 'none') {
    props.form.defaultValue = undefined
  }
})
const initData = (data: DateValidation) => {
  if (!props.form.defaultValue) {
    defaultValueType.value = 'none'
  } else if (Date.parse(props.form.defaultValue)) {
    defaultValueType.value = 'date'
  } else {
    defaultValueType.value = 'special'
  }
}
</script>

<style lang="scss" scoped>
// Component styles can be added as needed
.date-default-value-select {
  margin-bottom: var(--app-space-xs);
}
</style>
