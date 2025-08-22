<template>
  <div>
    <ElFormItem :label="t('metadata.validation.number.minimum')" prop="minimum">
      <ElInputNumber v-model="form.minimum" :placeholder="t('metadata.validation.number.minimum')" />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.number.maximum')" prop="maximum">
      <ElInputNumber v-model="form.maximum" :placeholder="t('metadata.validation.number.maximum')" />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.number.multipleOf')" prop="multipleOf" :rules="multipleOfRules">
      <ElInputNumber v-model="form.multipleOf" :placeholder="t('metadata.validation.number.multipleOf')" :min="0" :max="1000000" :step="0.01" />
    </ElFormItem>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: any
}>()
const { t } = useI18n()

const multipleOfRules = [
  {
    required: true,
    message: t('render.hint.fieldRequired', { name: t('metadata.validation.number.multipleOf') }),
    trigger: 'blur'
  }
]
</script>

<style lang="scss" scoped>
// 组件样式可以根据需要添加
</style>
