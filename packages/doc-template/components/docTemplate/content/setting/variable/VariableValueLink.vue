<template>
  <div class="link-editor">
    <el-form-item :label="t('Type')">
      <el-select v-model="link.type" placeholder="Type" @input="emitValue">
        <el-option v-for="item in linkTypeList" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>

    <el-form-item :label="t('Label')">
      <el-input v-model="link.label" placeholder="Label" style="margin-bottom: 0.5rem;" @input="emitValue" />
    </el-form-item>

    <el-form-item :label="handleLabel(link.type)">
      <el-input v-model="link.url" :placeholder="handleLabel(link.type)" @input="emitValue" />
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const { t } = useI18n()
const props = defineProps<{ modelValue: { label: string, url: string } }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: { label: string, url: string }): void }>()
const link = ref({
  type: props.modelValue?.type || 'String',
  label: props.modelValue?.label || '',
  url: props.modelValue?.url || ''
})
const linkTypeList = ['String', 'Document', 'Workflow', 'Case']

watch(() => props.modelValue, v => {
  link.value = { type: v?.type || 'String', label: v?.label || '', url: v?.url || '' }
})

function handleLabel(type: string) {
  switch (type) {
    case 'String':
      return t('Url')
    case 'Document':
      return t('Document Id')
    case 'Workflow':
      return t('Workflow Id')
    case 'Case':
      return t('Case Id')
    default:
      return ''
  }
}

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
