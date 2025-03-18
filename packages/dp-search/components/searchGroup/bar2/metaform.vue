<template>
<el-date-picker
  v-if="config && config.type === 'date'"
  v-model="state.value"
  type="daterange"
  size="small" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
  @change="handleChange"
/>
<el-input v-else v-model="state.value" :placeholder="$t('tip.input')" clearable size="small" @change="handleChange" />
</template>
<script lang="ts" setup>
const props = defineProps(['config'])
const emits = defineEmits(['formChange'])
const state = reactive<any>({
  value: ''
})
function handleChange(value: any) {
  let _value = value
  if(props.config.type === 'date') {
    const dateRange = {
      type: 'dateRange',
      from: value[0],
      to: value[1]
    }
    _value = JSON.stringify(dateRange)
  }
  emits('formChange', _value)
}
function setValue(value: any) {
  state.value = value
}
defineExpose({
  setValue
})
</script>
<style lang="scss" scoped>
</style>