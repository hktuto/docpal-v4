<script setup lang="ts">
import { DocTemplateProveKey, type DocTemplateVariable } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject, reactive, ref } from 'vue'
import VariableForm from '../../setting/variable/variableForm.vue'
import Manager from '../../setting/variable/manager.vue'
import VariablePicker from '../variable/VariablePicker.vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor, variables } = provider
const { t } = useI18n()

const state = reactive({
  addVisible: false,
  mangerVisible: false,
  insertVariableVisible: false
})

const formMode = ref<'create' | 'edit'>('create')
const selectedVariable = ref<DocTemplateVariable | null>(null)
const renderKey = ref(0)

function handleOpenManagerCreate() {
  formMode.value = 'create'
  selectedVariable.value = null
  state.addVisible = true
}

function handleFormSubmit(payload: { mode: 'create' | 'edit'; variable: any }) {
  if (payload.mode === 'create') {
    provider?.addVariable?.({ ...payload.variable })
  } else {
    provider?.updateVariable?.({ ...payload.variable })
  }
  renderKey.value++
  state.addVisible = false
}

function handleFormCancel() {
  state.addVisible = false
}

function handlePickerSelect(variable: DocTemplateVariable) {
  if (!editor) {
    state.insertVariableVisible = false
    return
  }
  let nodeType = ''
  switch (variable.type) {
    case 'text':
      nodeType = 'variableText'
      break
    case 'list':
      nodeType = 'variableList'
      break
    case 'table':
      nodeType = 'variableTable'
      break
    case 'link':
      nodeType = 'variableLink'
      break
    case 'signature':
      nodeType = 'variableSignature'
      break
    default:
      state.insertVariableVisible = false
      return
  }
  const { to } = editor.value.state.selection
  // variable signature need to add value as array
  if (nodeType === 'variableSignature') {
    editor.value.commands.insertContent({
      type: nodeType,
      attrs: { id: Date.now().toString(), name: variable.name, type: 'signature', value: [ variable ] }
    })
  }else{
    editor.value.commands.insertContent({
      type: nodeType,
      attrs: { ...variable }
    })
  }
  editor.value.commands.focus(to + 1)
  state.insertVariableVisible = false
}

function handlePickerClose() {
  state.insertVariableVisible = false
}
</script>

<template>
  <div>
    <!-- Import -->
    <LazyDocTemplateContentSettingImport />

    <!-- Export -->
    <LazyDocTemplateContentSettingExport />

    <!-- Variable Manager -->
    <el-dropdown class="ordinary-button" style="margin-left: 4px">
      <el-button>
        {{ t('docTemplate.variable.manager') }}
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleOpenManagerCreate">
            {{ t('docTemplate.utils.variableManager.add') }}
          </el-dropdown-item>
          <el-dropdown-item @click="state.mangerVisible = true">
            {{ t('docTemplate.variable.editVariable') }}
          </el-dropdown-item>
          <el-dropdown-item @click="state.insertVariableVisible=true">
            {{ t('docTemplate.variable.insertVariable') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- Page Setting -->
    <LazyDocTemplateContentSettingPage />
  </div>

  <!-- add visible -->
  <el-dialog v-model="state.addVisible"
             :title="formMode === 'create' ? t('docTemplate.utils.variableManager.add') : t('docTemplate.variable.editVariable')"
             width="80%"
             destroy-on-close>
    <VariableForm
      v-if="state.addVisible"
      :mode="formMode"
      :variable="selectedVariable"
      :variables="provider.variables"
      @submit="handleFormSubmit"
      @cancel="handleFormCancel"
    />
  </el-dialog>

  <!-- edit visible-->
  <el-dialog v-model="state.mangerVisible">
    <Manager />
  </el-dialog>

  <!-- insert visible -->
  <VariablePicker
    :variables="variables"
    :visible="state.insertVariableVisible"
    @select="handlePickerSelect"
    @close="handlePickerClose"
  />
</template>

<style scoped lang="scss">
.el-dropdown {
  :deep(.el-button-group > .el-button:first-child) {
    width: 120px;
    text-align: left;
    position: relative;

    span {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: block;
    }
  }
}
</style> 
