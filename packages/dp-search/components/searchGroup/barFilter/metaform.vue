<template>
  <el-switch v-if="config && config.dataType === 'boolean'" v-model="state.value" size="small" @change="handleChange" />
  <el-select-v2
    v-else-if="config && selectTypes.includes(config.dataType)"
    v-model="state.value"
    :options="state.options"
    size="small"
    @change="handleChange"
  />
  <el-date-picker
    v-else-if="config && config.dataType === 'date'"
    v-model="state.value"
    type="daterange"
    size="small"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    @change="handleChange"
  />
  <el-input v-else v-model="state.value" :placeholder="$t('tip.input')" clearable size="small" @change="handleChange" />
</template>
<script lang="ts" setup>
import { getMasterTableOptions, getUserList, getUserGroupList, getRoleList } from '../../../../base/components/meta/metadata'
const props = defineProps(['config'])
const emits = defineEmits(['formChange'])

const selectTypes = ['select', 'mastertable', 'user', 'user_role_user_group']
const state = reactive<any>({
  value: '',
  options: []
})
function handleChange(value: any) {
  let _value = value
  if (props.config.dataType === 'date') {
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
async function getOptions(type: string) {
  const rule = props.config.validationRule

  if (type === 'select') {
    state.options = props.config.validationRule.options.map((item: any) => ({
      label: item,
      value: item
    }))
  } else if (type === 'mastertable') {
    state.options = await getMasterTableOptions({
      masterTableName: rule.masterTableName,
      displayColumn: rule.displayColumn,
      valueColumn: rule.valueColumn
    })
  } else if (type === 'user') {
    state.options = await getUserList()
  } else if (type === 'user_role_user_group') {
    const options = []
    if (rule.allow !== 'USER_GROUP') {
      options.push({
        label: $t('user_role'),
        value: 'role____',
        options: await getRoleList()
      })
    }
    if (rule.allow !== 'USER_ROLE') {
      options.push({
        label: $t('user_group'),
        value: 'group____',
        options: await getUserGroupList()
      })
    }
    state.options = options.length > 1 ? options : options[0].options
  }
}
watch(
  () => props.config.dataType,
  (newVal, oldVal) => {
    state.value = newVal === 'boolean' ? Boolean(state.value) : null
    if (selectTypes.includes(newVal)) {
      getOptions(newVal)
    }
  },
  {
    immediate: true
  }
)
defineExpose({
  setValue
})
</script>
<style lang="scss" scoped></style>
