<script setup lang="ts">
const formData = ref({
  condition: 'or',
  resourceRules: []
})

const resourceAttributes = [
  { label: 'DocType : Invoice : invoice amount', value: 'invoice_amount', type: 'number' },
  { label: 'DocType : Invoice : status', value: 'status', type: 'string' },
  {
    label: 'DocType : Invoice : type',
    value: 'type',
    type: 'select',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' }
    ]
  }
]
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
        attributeType: 1,
        attributeName: item.attribute,
        operator: item.condition,
        attributeValue: item.value.length > 1 ? item.value : item.value[0]
      }
    })
  }
  return params
}

defineExpose({
  setFormData,
  getFormData
})
</script>
<template>
  <h3 class="mb-2">
    {{ $t('rbac.permission.resource_rules') }}
  </h3>
  <FormLogicalSelector
    ref="SelectorDocTypeRef"
    v-model:form-data="formData"
    :resource-attributes="resourceAttributes"
    :is-or="true"
  />
</template>
