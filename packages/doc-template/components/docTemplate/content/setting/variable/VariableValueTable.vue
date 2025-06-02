<template>
  <div class="table-editor">
    <el-table :data="rows" style="width: 100%">
      <el-table-column v-for="(col, colIdx) in columns" :key="colIdx" width="200px">
        <template #header>
          <div class="col-header">
            <el-input v-model="columns[colIdx]" @input="emitValue" size="small" width="100px" />
            <el-button
              icon="el-icon-arrow-left"
              @click="moveColumn(colIdx, -1)"
              circle size="small"
              v-tooltip="'Move left'"
              :disabled="colIdx === 0"
            />
            <el-button
              icon="el-icon-arrow-right"
              @click="moveColumn(colIdx, 1)"
              circle size="small"
              v-tooltip="'Move right'"
              :disabled="colIdx === columns.length - 1"
            />
            <el-button
              icon="el-icon-delete"
              @click="removeColumn(colIdx)"
              circle size="small"
              v-tooltip="'Remove column'"
              :disabled="columns.length === 1"
            />
          </div>
        </template>
        <template #default="{ row, $index }">
          <el-input v-model="rows[$index][colIdx]" @input="emitValue" />
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="{ $index }">
          <el-button icon="el-icon-delete" @click="removeRow($index)" circle size="small" v-tooltip="'Remove row'" />
        </template>
      </el-table-column>
    </el-table>
    <div class="table-controls">
      <el-button @click="addColumn" size="small" v-tooltip="'Add column'">Add Column</el-button>
      <el-button @click="addRow" size="small" v-tooltip="'Add row'">Add Row</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
const props = defineProps<{ modelValue: { columns: string[], rows: string[][] } }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: { columns: string[], rows: string[][] }): void }>()
const columns = ref(props.modelValue?.columns ? [...props.modelValue.columns] : ['Column 1'])
const rows = ref(props.modelValue?.rows ? props.modelValue.rows.map(r => [...r]) : [[]])
watch(() => props.modelValue, v => {
  columns.value = v?.columns ? [...v.columns] : ['Column 1']
  rows.value = v?.rows ? v.rows.map(r => [...r]) : [[]]
})
function addColumn() {
  columns.value.push(`Column ${columns.value.length + 1}`)
  rows.value.forEach(row => row.push(''))
  emitValue()
}
function removeColumn(idx: number) {
  if (columns.value.length === 1) return
  columns.value.splice(idx, 1)
  rows.value.forEach(row => row.splice(idx, 1))
  emitValue()
}
function moveColumn(idx: number, direction: number) {
  const newIdx = idx + direction
  if (newIdx < 0 || newIdx >= columns.value.length) return
  // Swap columns
  const tempCol = columns.value[idx]
  columns.value[idx] = columns.value[newIdx]
  columns.value[newIdx] = tempCol
  rows.value.forEach(row => {
    const tempCell = row[idx]
    row[idx] = row[newIdx]
    row[newIdx] = tempCell
  })
  emitValue()
}
function addRow() {
  rows.value.push(Array(columns.value.length).fill(''))
  emitValue()
}
function removeRow(idx: number) {
  rows.value.splice(idx, 1)
  emitValue()
}
function emitValue() { emit('update:modelValue', { columns: columns.value, rows: rows.value }) }
</script>
<style lang="scss" scoped>
.table-editor { display: flex; flex-direction: column; gap: 0.5rem; }
.table-controls { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.col-header { display: flex; align-items: center; gap: 0.25rem; }
</style> 
