<template>
  <div class="list-editor">
    <div v-for="(item, idx) in items" :key="idx" class="list-item">
      <el-input v-model="item.label" placeholder="Label" @input="emitValue" style="width: 40%" />
      <el-input v-model="item.value" placeholder="Value" @input="emitValue" style="width: 40%" />
      <el-button icon="el-icon-delete" @click="removeItem(idx)" circle size="small" v-tooltip="'Remove'" />
    </div>
    <el-button type="primary" @click="addItem" size="small" v-tooltip="'Add item'">Add Item</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
const props = defineProps<{ modelValue: { items: { label: string, value: string }[] } }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: { items: { label: string, value: string }[] }): void }>()
const items = ref(props.modelValue?.items ? [...props.modelValue.items] : [])
watch(() => props.modelValue, v => { items.value = v?.items ? [...v.items] : [] })
function addItem() { items.value.push({ label: '', value: '' }); emitValue() }
function removeItem(idx: number) { items.value.splice(idx, 1); emitValue() }
function emitValue() { emit('update:modelValue', { items: items.value }) }
</script>
<style lang="scss" scoped>
.list-editor { display: flex; flex-direction: column; gap: 0.5rem; }
.list-item { display: flex; align-items: center; gap: 0.5rem; }
</style> 
