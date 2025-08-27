<template>
  <div>
    <ElFormItem :label="t('metadata.validation.masterTable.masterTableId')" prop="masterTableName" :rules="masterTableNameRules">
      <el-select-v2
        v-model="form.masterTableName"
        :placeholder="t('metadata.validation.masterTable.masterTableId')"
        :options="masterTableOpts"
        @change="masterTableChange"
      />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.masterTable.displayColumn')" prop="displayColumn" :rules="displayColumnRules">
      <el-select-v2 v-model="form.displayColumn" :placeholder="t('metadata.validation.masterTable.displayColumn')" :options="masterTableColumns" />
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.masterTable.valueColumn')" prop="valueColumn" :rules="valueColumnRules">
      <el-select-v2 v-model="form.valueColumn" :placeholder="t('metadata.validation.masterTable.valueColumn')" :options="masterTableColumns" />
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')" prop="isMultiple">
      <ElSwitch v-model="form.isMultiple" />
    </ElFormItem>
  </div>
</template>

<script lang="ts" setup>
import { initMasterTableOpts, masterTableOpts, getMasterTableDisplayOpts } from '../../../../pages/admin-document-type/composables/useDocumentTypeOptioins'
const props = defineProps<{
  form: any
}>()
const { t } = useI18n()
const masterTableLoading = ref(false)
const masterTableColumnLoading = ref(false)
const masterTableColumns = ref([])
// Initialize default values if not exists
if (!props.form.masterTableName) {
  props.form.masterTableName = ''
}
if (!props.form.displayColumn) {
  props.form.displayColumn = ''
}
if (!props.form.valueColumn) {
  props.form.valueColumn = ''
}
if (!props.form.isMultiple) {
  props.form.isMultiple = false
}

const masterTableNameRules = [
  {
    required: true,
    message: t('render.hint.fieldRequired', { name: t('metadata.validation.masterTable.masterTableName') }),
    trigger: 'blur'
  }
]

const displayColumnRules = [
  {
    required: true,
    message: t('render.hint.fieldRequired', { name: t('metadata.validation.masterTable.displayColumn') }),
    trigger: 'blur'
  }
]

const valueColumnRules = [
  {
    required: true,
    message: t('render.hint.fieldRequired', { name: t('metadata.validation.masterTable.valueColumn') }),
    trigger: 'blur'
  }
]

const masterTableChange = async (value: string, isInit: boolean = false) => {
  if (!isInit) {
    props.form.displayColumn = ''
    props.form.valueColumn = ''
  }
  const masterTableId = masterTableOpts.value.find((item: any) => item.value === value)?.id
  try {
    masterTableColumnLoading.value = true
    const data = await getMasterTableDisplayOpts(masterTableId)
    masterTableColumns.value = data
  } catch (error) {
    console.error(error)
  } finally {
    masterTableColumnLoading.value = false
  }
}
onMounted(async () => {
  try {
    masterTableLoading.value = true
    await initMasterTableOpts()
  } catch (error) {
    console.error(error)
  } finally {
    masterTableLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
// Component styles can be added as needed
</style>
