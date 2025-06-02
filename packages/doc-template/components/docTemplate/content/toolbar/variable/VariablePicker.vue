<template>
  <el-dialog :model-value="visible" @close="handleClose" title="Select Variable" width="400px">
    <el-table
      :data="filteredVariables"
      @row-click="handleSelect"
      highlight-current-row
      :row-class-name="rowClassName"
      style="margin-bottom: 1rem;"
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="displayValue" label="Display Value" />
    </el-table>
    <div class="actions">
      <el-button type="primary" :disabled="!selected" @click="handleInsert" v-tooltip="!selected ? 'Select a variable' : ''">Insert</el-button>
      <el-button @click="handleClose">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, inject } from 'vue'
import type { VariableType } from '../../../../../types/variable'
import { DocTemplateProveKey } from '../../../../../utils/docTemplateHelper'
import type { DocTemplateVariable } from '../../../../../utils/docTemplateHelper'

const props = defineProps<{
  type: VariableType
  visible: boolean
}>()
const emit = defineEmits<{
  (e: 'select', variable: DocTemplateVariable): void
  (e: 'close'): void
}>()

const docTemplateCtx = inject(DocTemplateProveKey)
const variables = docTemplateCtx?.variables || []

const selected = ref<DocTemplateVariable | null>(null)

const filteredVariables = computed(() => {
  const arr = Array.isArray(variables) ? variables : variables?.value || []
  return arr.filter((v: DocTemplateVariable) => v.type === props.type)
})

function handleSelect(row: DocTemplateVariable) {
  selected.value = row
}

function handleInsert() {
  if (selected.value) {
    emit('select', selected.value)
    selected.value = null
  }
}

function handleClose() {
  emit('close')
  selected.value = null
}

function rowClassName({ row }: { row: DocTemplateVariable }) {
  return selected.value && row.key === selected.value.key ? 'selected-row' : ''
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.selected-row {
  background: #e6f7ff !important;
}
</style> 
