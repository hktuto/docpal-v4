<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">
    <ElFormItem :label="t('metadata.validation.masterTable.masterTableId')" :required="true">
      <ElSelect v-model="validation.masterTableName" :placeholder="t('metadata.validation.masterTable.masterTableId')">
        <ElOption v-for="table in masterTableOpts" :key="table.id" :label="table.label" :value="table.value" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.masterTable.displayColumn')" :required="true">
      <ElSelect v-model="validation.displayColumn" :placeholder="t('metadata.validation.masterTable.displayColumn')">
        <ElOption v-for="column in availableColumns" :key="column.name" :label="column.label" :value="column.value" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.masterTable.valueColumn')" :required="true">
      <ElSelect v-model="validation.valueColumn" :placeholder="t('metadata.validation.masterTable.valueColumn')">
        <ElOption v-for="column in availableColumns" :key="column.name" :label="column.label" :value="column.value" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import type { MasterTableValidation } from '../../../../utils/metadataHelper'
import type { FormInstance } from 'element-plus'

const validation = defineModel<MasterTableValidation>('validation', { required: true })
const { masterTableOpts, getMasterTableDisplayOpts } = useDocumentTypeOptioins()
const { t } = useI18n()

const availableColumns = ref([])

const validationRules = reactive({
  masterTableId: [
    {
      required: true
    }
  ],
  displayColumn: [
    {
      required: true
    }
  ],
  valueColumn: [
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
async function masterTableChange(value: string) {
  const masterTableId = masterTableOpts.value.find((item: any) => item.label === value)?.id
  const data = await getMasterTableDisplayOpts(masterTableId)
  availableColumns.value = data
}
watch(
  () => validation.value?.masterTableName,
  async (value) => {
    if (value) {
      await masterTableChange(value)
    } else {
      validation.value = {
        validationRuleName: 'mastertable',
        masterTableName: '',
        displayColumn: '',
        valueColumn: '',
        isMultiple: false
      }
    }
  },
  {
    immediate: true
  }
)
defineExpose({ validate, getData })
</script>
