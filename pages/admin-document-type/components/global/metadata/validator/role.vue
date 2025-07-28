<template>
  <ElForm ref="formRef" :model="validation" :rules="validationRules" label-position="top">

    <ElFormItem :label="t('metadata.validation.role.allow')" :required="false">
      <ElSelect v-model="validation.allow" :placeholder="t('metadata.validation.role.allow')">
        <ElOption label="All" value="ALL" />
        <ElOption label="User Role" value="USER_ROLE" />
        <ElOption label="User Group" value="USER_GROUP" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem :label="t('meta.multiple')" :required="false">
      <ElSwitch v-model="validation.isMultiple" />
    </ElFormItem>

    
  </ElForm>
</template>

<script lang="ts" setup>
import type{ RoleValidation } from '../../../../utils/metadataHelper';
import type { FormInstance } from 'element-plus';

const validation = defineModel<RoleValidation>('validation', { required: true })

const { t } = useI18n()

const validationRules = reactive({
  isMultiple: [
    {
      required: true,
    }
  ]
})

const formRef = ref<FormInstance>()

const validate = async () => formRef.value?.validate()

const getData = () => {
  return validation.value
}

defineExpose( { validate, getData })
</script> 
