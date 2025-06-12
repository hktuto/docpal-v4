<template>
  <el-input v-model="inputValue" @input="emitValue" placeholder="Enter text value" />
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
const inputValue = ref(props.modelValue)
watch(() => props.modelValue, v => {
  inputValue.value = v
})

function emitValue() {
  emit('update:modelValue', inputValue.value)
}
</script>
<style lang="scss" scoped></style> 
