<script lang="ts" setup>

type tableLayout = {
  key: string
  width: string,
}
type TableCardColumnSetting = {
  tableLayout: tableLayout[]
  cardLayout: any[]
  selectedFields: {
    label: string,
    key: string,
    formatter: any
    type: string
  }
}
const modelValue = defineModel<TableCardColumnSetting>('modelValue', {
  default: () => ({
    selectedFields: {},
    tableLayout: [],
    cardLayout: []
  })
})
const props = defineProps<{
  fields: any[],
  layoutMode: 'table' | 'card' | 'both'
}>()

</script>
<template>

</template>
