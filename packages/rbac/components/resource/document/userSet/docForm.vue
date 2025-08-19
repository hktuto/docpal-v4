<script setup lang="ts">
import { adminApi } from 'api'
const formData = ref({
  condition: 'or',
  resourceRules: []
})

const resourceAttributes = ref([])
async function getResourceAttributes() {
  try {
    const metadataOpts: any = await adminApi.api.getDocpaltypeSettingsMetadataV2QueryCache().then((res: any) => res.data)
    const optionList = metadataOpts.map((item: any) => {
      const extraProps = {
        type: 'string'
      }
      switch (item.dataType) {
        case 'select':
          extraProps.type = 'select'
          extraProps.options = item.validationRule.options.map((item: any) => ({
            label: item,
            value: item
          }))
          break
        case 'user':
        case 'user_role_user_group':
        case 'mastertable':
          extraProps.type = 'select-dynamic'
          extraProps.selectConfig = {
            type: item.dataType,
            ...item.validationRule
          }
          extraProps.selectOptions = []
          break
        case 'number':
          extraProps.type = 'number'
          break
        case 'boolean':
          extraProps.type = 'boolean'
          break
        default:
          extraProps.type = 'string'
      }
      return {
        ...extraProps,
        label: item.name,
        value: item.name
      }
    })

    console.log('aaaaaaaaa optionList', optionList)
    resourceAttributes.value = optionList
  } catch (error) {
    resourceAttributes.value = []
  }
}
function setFormData(data) {
  if (!data) {
    formData.value = {
      condition: 'or',
      resourceRules: [
        {
          attribute: '',
          value: [],
          condition: 'eq',
          type: 'string'
        }
      ]
    }
    return
  }
  console.log('=========')
  console.log(data)
  formData.value = {
    condition: 'or',
    resourceRules: data.rules.map((item: any) => {
      return {
        attribute: item.attributeName,
        value: Array.isArray(item.attributeValue) ? item.attributeValue : [item.attributeValue],
        condition: item.operator,
        type: resourceAttributes.find((attr) => attr.value === item.attributeName)?.type
      }
    })
  }
}
function getFormData() {
  const params = {
    operator: formData.value.condition === 'or' ? 'OR' : 'AND',
    rules: formData.value.resourceRules.map((item: any) => {
      return {
        attributeType: item.selectConfig?.type  || item.type,
        attributeName: item.attribute,
        operator: item.condition,
        attributeValue: item.type === 'boolean' ? item.value : item.value.length > 1 ? item.value : item.value[0]
      }
    })
  }
  return params
}
onMounted(() => {
  getResourceAttributes()
})
defineExpose({
  setFormData,
  getFormData
})
</script>
<template>
  <h3 class="mb-2">
    {{ $t('rbac.permission.resource_rules') }}
  </h3>
  <FormLogicalSelector ref="SelectorDocTypeRef" v-model:form-data="formData" :resource-attributes="resourceAttributes" :is-or="true" />
</template>
