<template>
  <button
    class="variable-insert-btn"
    :aria-label="`Insert link variable: ${variable.name}`"
    tabindex="0"
    @click="handleInsert"
    @keydown.enter="handleInsert"
    v-tooltip="`Insert link variable: ${variable.name}`"
  >
    <span class="icon-link" aria-hidden="true"></span>
    <span class="variable-name">{{ variable.displayValue }}</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Variable } from '../../../../../types/variable'

const props = defineProps<{ variable: Variable }>()
const emit = defineEmits<{ (e: 'insert', variable: Variable): void }>()

function handleInsert() {
  emit('insert', props.variable)
}
</script>

<style lang="scss" scoped>
.variable-insert-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover,
  &:focus {
    background: #e0e0e0;
    outline: none;
  }
}
.icon-link {
  width: 1rem;
  height: 1rem;
  background: url('/icons/link.svg') no-repeat center center;
  background-size: contain;
}
.variable-name {
  font-weight: 500;
}
</style> 
