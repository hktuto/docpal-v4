<template>
  <div class="link-editor">
    {{$t('Label')}}
    <el-input v-model="link.label" placeholder="Label" @input="emitValue" style="margin-bottom: 0.5rem;" />
    {{ $t('Url')}}
    <el-input v-model="link.url" placeholder="URL" @input="emitValue" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ modelValue: { label: string, url: string } }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: { label: string, url: string }): void }>()
const link = ref({ label: props.modelValue?.label || '', url: props.modelValue?.url || '' })
watch(() => props.modelValue, v => {
  link.value = { label: v?.label || '', url: v?.url || '' }
})

function emitValue() {
  emit('update:modelValue', { ...link.value })
}
</script>
<style lang="scss" scoped>
.link-editor {
  display: flex;
  flex-direction: column;
}
</style> 
