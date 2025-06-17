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
      resourceRules: []
    }
    return
  }
  formData.value = data
}
function getFormData() {
  const params = {
    operator: formData.value.condition === 'or' ? 'OR' : 'AND',
    rules: formData.value.resourceRules.map((item: any) => {
      const attrItem = resourceAttributes.find((attr) => attr.value === item.attribute)
      return {
        attribute: item.attribute,
        attributeName: attrItem?.label,
        condition: item.condition,
        value: item.value[0].length > 1 ? item.value : item.value[0]
      }
    })
  }
  return params
}
const SelectorDocTypeRef = ref()
onMounted(() => {
  setTimeout(() => {
    SelectorDocTypeRef.value.addResourceRule()
  }, 100)
})
defineExpose({
  setFormData,
  getFormData
})
</script>
<template>
  <FormLogicalSelector
    ref="SelectorDocTypeRef"
    v-model:form-data="formData"
    :resource-attributes="resourceAttributes"
    :is-or="true"
    @update:form-data="setFormData"
  />
</template>
