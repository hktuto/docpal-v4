<template>
  <div>
    <ElFormItem :label="t('metadata.validation.select.options')" prop="options" :rules="optionsRules">
      <div class="options-container">
        <div v-for="(option, index) in form.options" :key="index" class="option-item">
          <ElInput v-model="form.options[index]" :placeholder="t('metadata.validation.select.options')" class="option-input" />
          <ElButton type="danger" size="small" @click="removeOption(index)" :disabled="form.options.length <= 1">
            {{ t('common_remove') }}
          </ElButton>
        </div>
        <ElButton type="primary" size="small" @click="addOption">
          {{ t('designer.setting.addOption') }}
        </ElButton>
      </div>
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')" prop="isMultiple">
      <ElSwitch v-model="form.isMultiple" />
    </ElFormItem>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: any,
  mode: 'sub-form' | 'form'
}>()
const { t } = useI18n()

// Initialize options array if not exists
if (!props.form.options) {
  props.form.options = ['']
}

const optionsRules = [
  {
    required: true,
    validator: (rule: any, value: any, callback: any) => {
      if (!value || value.length === 0) {
        console.log(value, 'value')
        return callback(new Error(t('render.hint.fieldRequired', { name: t('metadata.validation.select.options' + 111) })))
      }
      if (value.some((option: string) => !option.trim())) {
        return callback(new Error(t('render.hint.fieldRequired', { name: t('metadata.validation.select.options') })))
      }
      callback()
    },
    trigger: 'blur'
  }
]

const addOption = () => {
  props.form.options.push('')
}

const removeOption = (index: number) => {
  if (props.form.options.length > 1) {
    props.form.options.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped>
.options-container {
  .option-item {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    align-items: center;

    .option-input {
      flex: 1;
    }
  }
}
</style>
