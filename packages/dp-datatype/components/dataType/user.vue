<template>
  <div>
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
if (!props.form.isMultiple) {
  props.form.isMultiple = false
}
</script>

<style lang="scss" scoped>
// Component styles can be added as needed
</style>
