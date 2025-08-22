<template>
  <div>
    <ElFormItem :label="t('metadata.validation.role.allow')" prop="allow">
      <ElSelect v-model="form.allow" :placeholder="t('metadata.validation.role.allow')">
        <ElOption label="All" value="ALL" />
        <ElOption label="User Role" value="USER_ROLE" />
        <ElOption label="User Group" value="USER_GROUP" />
      </ElSelect>
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
if (!props.form.allow) {
  props.form.allow = 'ALL'
}
if (!props.form.isMultiple) {
  props.form.isMultiple = false
}
</script>

<style lang="scss" scoped>
// Component styles can be added as needed
</style>
