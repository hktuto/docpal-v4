<script lang="ts" setup>
const condition = defineModel<any>('condition', { required: true })
const { disabled } = defineProps<{
  disabled: boolean
}>()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw new Error('Missing provider')
}
const infoType = ref('other')
const functionOptionsMap = {
  boolean: ['Set_Value', 'Toggle'],
  long: ['Increase_By', 'Decrease_By', 'Set_Value'],
  other: ['Set_Value']
}
function functionChange(newFn) {
  if (['Set_Value', 'Toggle'].includes(newFn)) {
    delete condition.value.attr_step
  } else {
    delete condition.value.attr_value
  }
}

const allFields = computed(() => {
  return Object.keys(graphProvider.allFormField.value).map((key: string) => {
    return graphProvider.allFormField.value[key]
  })
})
function handleInfoChange(info: any, isChange: boolean) {
  const infoItem = allFields.value.find((item) => item.attr_id === info)
  infoType.value = ['boolean', 'long'].includes(infoItem.attr_type) ? infoItem.attr_type : 'other'
  if (isChange) condition.value.attr_function = 'Set_Value'
}
watch(
  () => condition.value.attr_updateFieldName,
  (newValue, oldValue) => {
    if (!!newValue) handleInfoChange(newValue, !!oldValue)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <!-- TODO: 現在的Field包含了其他數據類型(select,Date)，當Form Info選擇新的數據類型，value：沒有對應數據類型所需要的組件  -->
  <ElFormItem label="Form Info">
    <ElSelect v-model="condition.attr_updateFieldName" placeholder="Form Info" :disabled="disabled">
      <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
    </ElSelect>
  </ElFormItem>
  <ElFormItem label="Function">
    <ElSelect v-model="condition.attr_function" placeholder="Function" @change="functionChange" :disabled="disabled">
      <ElOption v-for="item in functionOptionsMap[infoType]" :key="item" :label="item" :value="item" />
    </ElSelect>
  </ElFormItem>
  <ElFormItem v-if="infoType === 'long' && condition.attr_function !== 'Set_Value'" label="Step">
    <ElInputNumber v-model="condition.attr_step" step="1" :disabled="disabled" controls-position="right" style="width: 100%" />
  </ElFormItem>
  <ElFormItem v-else-if="infoType === 'long'" label="Value">
    <ElInputNumber v-model="condition.attr_value" step="1" :disabled="disabled" controls-position="right" style="width: 100%" />
  </ElFormItem>
  <ElFormItem v-else-if="infoType === 'boolean' && condition.attr_function === 'Set_Value'" label="Value">
    <ElSwitch v-model="condition.attr_value" />
  </ElFormItem>
  <ElFormItem v-else-if="infoType !== 'boolean'" label="Value">
    <ElInput v-model="condition.attr_value" />
  </ElFormItem>
  <ElFormItem v-else label="Value">
    <ElInput v-model="condition.attr_value" />
  </ElFormItem>
</template>
