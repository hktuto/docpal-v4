<template>
  <div class="variable-toolbar">
    <el-button
      v-for="type in variableTypes"
      :key="type"
      class="variable-tool-btn"
      :aria-label="`Insert ${type} variable`"
      tabindex="0"
      @click="handleInsert(type)"
      @keydown.enter="handleInsert(type)"
      v-tooltip="`Insert ${type} variable`"
    >
      <span :class="`icon-${type}`" aria-hidden="true"></span>
      <span class="tool-label">{{ typeLabel(type) }}</span>
    </el-button>
    <el-button
      class="variable-manager-btn"
      type="info"
      :aria-label="'Manage variables'"
      tabindex="0"
      @click="showManager = true"
      @keydown.enter="showManager = true"
      v-tooltip="'Manage variables'"
    >
      <span class="icon-manage" aria-hidden="true"></span>
      <span class="tool-label">Manage</span>
    </el-button>
    <el-dialog v-model="showManager" title="Variable Manager" width="600px" class="big">
      <VariableManager />
    </el-dialog>
    <VariablePicker
      v-if="showPicker"
      :type="pickerType"
      :variables="variables"
      :visible="showPicker"
      @select="handlePickerSelect"
      @close="handlePickerClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import VariableManager from '../../setting/variable/manager.vue'
import VariablePicker from './VariablePicker.vue'
import type { VariableType } from '../../../../../types/variable'
import { DocTemplateProveKey } from '../../../../../utils/docTemplateHelper'
import type { DocTemplateVariable } from '../../../../../utils/docTemplateHelper'

const variableTypes: VariableType[] = ['text', 'list', 'table', 'link', 'image']
const showManager = ref(false)
const showPicker = ref(false)
const pickerType = ref<VariableType>('text')

const docTemplateCtx = inject(DocTemplateProveKey)
const variables = docTemplateCtx?.variables
const editor = docTemplateCtx?.editor?.value

function typeLabel(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function handleInsert(type: VariableType) {
  pickerType.value = type
  showPicker.value = true
}

function handlePickerSelect(variable: DocTemplateVariable) {
  if (!editor) {
    showPicker.value = false
    return
  }
  let nodeType = ''
  switch (variable.type) {
    case 'text': nodeType = 'variableText'; break
    case 'list': nodeType = 'variableList'; break
    case 'table': nodeType = 'variableTable'; break
    case 'link': nodeType = 'variableLink'; break
    case 'image': nodeType = 'image'; break // or your custom variableImage
    default: showPicker.value = false; return
  }
  editor.commands.insertContent({
    type: nodeType,
    attrs: { ...variable }
  })
  showPicker.value = false
}

function handlePickerClose() {
  showPicker.value = false
}
</script>

<style lang="scss" scoped>
.variable-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .variable-tool-btn, .variable-manager-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    .icon-text, .icon-list, .icon-table, .icon-link, .icon-image, .icon-manage {
      width: 1rem;
      height: 1rem;
      background-size: contain;
      margin-right: 0.25rem;
    }
    .icon-text { background: url('/icons/text.svg') no-repeat center center; }
    .icon-list { background: url('/icons/list.svg') no-repeat center center; }
    .icon-table { background: url('/icons/table.svg') no-repeat center center; }
    .icon-link { background: url('/icons/link.svg') no-repeat center center; }
    .icon-image { background: url('/icons/image.svg') no-repeat center center; }
    .icon-manage { background: url('/icons/settings.svg') no-repeat center center; }
  }
}
.tool-label {
  font-weight: 500;
}
</style> 
