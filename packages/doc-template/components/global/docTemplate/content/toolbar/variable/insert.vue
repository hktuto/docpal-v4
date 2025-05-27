<script setup lang="ts">
import { ref, inject } from 'vue'
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'
import type { VariableItem } from '~/utils/docTempalteHelper'
import NewVariableForm from '~/components/docTemplate/NewVariableForm.vue'

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')

const { editor, variables, lastSelection } = editorProvider

const dialogVisible = ref(false)
const selectedVariable = ref('')
const newVariableFormRef = ref()

const textVariables = computed(() => 
  variables.value.filter((v: VariableItem) => v.type === 'Text').map(v => v.key)
)

function handleVariableSelect(value: string) {
  console.log("handleVariableSelect", value)
  if (!textVariables.value.includes(value)) {
    // If the value is not in existing variables, open new variable form
    selectedVariable.value = value
    newVariableFormRef.value?.open(value)
  }
}

function handleVariableAdded(variable: VariableItem) {
  editorProvider?.addVariable(variable)
  insertVariable(variable.key)
}

function insertVariable(variableName?: string) {
  const varName = variableName || selectedVariable.value
  console.log(varName, editor.value, lastSelection.value)
  if (!varName || !editor.value ) return
  if(!lastSelection.value) {
    // editor is empty
    // inset a new line
    try{

      editor.value.commands.insertContent([{
        type: 'variableText',
        attrs: { name: varName }
      }])
    }catch(e){
      console.error(e)
    }
  } else if (lastSelection.value.type === 'textRange') {
    editor.value.chain()
      .focus()
      .deleteSelection()
      .insertContent([{
        type: 'variableText',
        attrs: { name: varName }
      }])
      .run()
  } else if (lastSelection.value.type === 'text') {
    editor.value.chain()
      .focus()
      .insertContent([{
        type: 'variableText',
        attrs: { name: varName }
      }])
      .run()
  }

  dialogVisible.value = false
  selectedVariable.value = ''
}
</script>

<template>
  <div>
    <el-button size="small" @click="dialogVisible = true">
      {{ $t('docTemplate.variableManager.insertVariable') }}
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      :title="$t('docTemplate.variableManager.insertVariable')"
      width="400px"
      destroy-on-close
    >
      <el-form label-position="top">
        <el-form-item :label="$t('docTemplate.variableManager.selectVariable')">
          <el-select
            v-model="selectedVariable"
            filterable
            allow-create
            default-first-option
            :placeholder="$t('docTemplate.variableManager.selectVariable')"
            style="width: 100%"
            @change="handleVariableSelect"
          >
            <el-option
              v-for="variable in textVariables"
              :key="variable"
              :label="variable"
              :value="variable"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">
          {{ $t('vxe.button.cancel') }}
        </el-button>
        <el-button 
          type="primary" 
          @click="insertVariable()"
          :disabled="!selectedVariable || (!textVariables.includes(selectedVariable) && !newVariableFormRef)"
        >
          {{ $t('confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <NewVariableForm
      ref="newVariableFormRef"
      :existing-variables="variables"
      @variable-added="handleVariableAdded"
    />
  </div>
</template> 
