<template>
  <div class="image-editor">
    <el-input v-model="image.url" placeholder="Image URL" @input="emitValue" style="margin-bottom: 0.5rem;" />
    <el-input v-model="image.alt" placeholder="Alt Text" @input="emitValue" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
const props = defineProps<{ modelValue: { url: string, alt: string } }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: { url: string, alt: string }): void }>()
const image = ref({ url: props.modelValue?.url || '', alt: props.modelValue?.alt || '' })
watch(() => props.modelValue, v => { image.value = { url: v?.url || '', alt: v?.alt || '' } })
function emitValue() { emit('update:modelValue', { ...image.value }) }
</script>
<style lang="scss" scoped>
.image-editor { display: flex; flex-direction: column; }
</style> 
