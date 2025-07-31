<template>
  <div class="list-editor">
    <el-radio-group v-model="listStyle" @change="emitValue">
      <el-radio-button label="bullet" value="bullet" />
      <el-radio-button label="number" value="number" />
    </el-radio-group>
    <div v-for="(item, idx) in items" :key="idx" class="list-item">
      <el-input v-model="item.label" placeholder="Label" @input="emitValue" style="width: 40%" />
      <el-button :disabled="items.length<=1" icon="el-icon-delete" @click="removeItem(idx)" circle
                 size="small" v-tooltip="'Remove'" />
    </div>
    <el-button type="primary" @click="addItem" size="small" v-tooltip="'Add item'">Add Item</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: {
    items: { label: string }[]
    listStyle: string
  }
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: {
    items: { label: string }[]
    listStyle: string
  }): void
}>()
const items = ref(props.modelValue?.items ? [...props.modelValue.items] : [])
const listStyle = ref(props.modelValue?.listStyle || 'bullet')
watch(() => props.modelValue, v => {
  items.value = v?.items ? [...v.items] : []
})

function addItem() {
  items.value.push({ label: '' })
  emitValue()
}

function removeItem(idx: number) {
  items.value.splice(idx, 1)
  emitValue()
}

function emitValue() {
  emit('update:modelValue', { items: items.value, listStyle: listStyle.value })
}
</script>
<style lang="scss" scoped>
.list-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style> 
