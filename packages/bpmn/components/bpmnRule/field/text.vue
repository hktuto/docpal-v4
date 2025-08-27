<template>
  <ElFormItem :label="t('metadata.validation.text.maxLength')" prop="maxLength" :rules="rules">
    <ElInputNumber
      v-model="form.maxLength"
      :placeholder="t('metadata.validation.text.maxLength')"
      :max="4000"
      :min="1"
    />
  </ElFormItem>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: any
}>()
const { t } = useI18n()
const rules = [
  {
    required: true,
    message: t('render.hint.fieldRequired', { name: t('metadata.validation.text.maxLength') }),
    trigger: 'blur'
  }
]
</script>

<style lang="scss" scoped>
// 组件样式可以根据需要添加
</style>
