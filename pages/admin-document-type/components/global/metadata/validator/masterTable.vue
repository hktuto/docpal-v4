<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">

    <ElFormItem :label="t('metadata.validation.masterTable.masterTableId')" :required="true">
      <ElSelect v-model="validation.masterTableId" :placeholder="t('metadata.validation.masterTable.masterTableId')">
        <ElOption 
          v-for="table in masterTables" 
          :key="table.id" 
          :label="table.name" 
          :value="table.id" 
        />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.masterTable.displayColumn')" :required="true">
      <ElSelect v-model="validation.displayColumn" :placeholder="t('metadata.validation.masterTable.displayColumn')">
        <ElOption 
          v-for="column in availableColumns" 
          :key="column.name" 
          :label="column.label" 
          :value="column.name" 
        />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('metadata.validation.masterTable.valueColumn')" :required="true">
      <ElSelect v-model="validation.valueColumn" :placeholder="t('metadata.validation.masterTable.valueColumn')">
        <ElOption 
          v-for="column in availableColumns" 
          :key="column.name" 
          :label="column.label" 
          :value="column.name" 
        />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>
    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ MasterTableValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<MasterTableValidation>('validation', { required: true })

const { t } = useI18n()

// Mock data - replace with actual API calls
const masterTables = ref([
  { id: '1', name: 'Department Table' },
  { id: '2', name: 'Category Table' },
  { id: '3', name: 'Status Table' }
])

const availableColumns = ref([
  { name: 'id', label: 'ID' },
  { name: 'name', label: 'Name' },
  { name: 'code', label: 'Code' },
  { name: 'description', label: 'Description' }
])

const validationRules = reactive({
  masterTableId: [
    {
      required: true,
    }
  ],
  displayColumn: [
    {
      required: true,
    }
  ],
  valueColumn: [
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
