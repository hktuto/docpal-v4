<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'
import type { VariableItem } from '~/utils/docTempalteHelper'
import NewVariableForm from '~/components/docTemplate/NewVariableForm.vue' // Assuming this form can handle different types or will be adapted

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')

const { editor, variables, lastSelection } = editorProvider

const dialogVisible = ref(false)
const selectedParagraph = ref('')
const newVariableFormRef = ref()

const paragraphVariables = computed(() => 
  variables.value.filter((v: VariableItem) => v.type === 'Paragraph').map(v => v.key)
)

function handleParagraphSelect(value: string) {
  if (!paragraphVariables.value.includes(value)) {
    selectedParagraph.value = value
    // Potentially open a form tailored for paragraph type variables if NewVariableForm is not generic enough
    newVariableFormRef.value?.open(value, 'Paragraph') 
  }
}

function handleParagraphAdded(variable: VariableItem) {
  editorProvider?.addVariable(variable)
  insertParagraph(variable.key)
}

function insertParagraph(paragraphName?: string) {
  const pName = paragraphName || selectedParagraph.value
  if (!pName || !editor.value) return

  // Logic to insert a paragraph type variable
  // This might differ from inserting simple text, e.g., it might insert a block node
  if (!lastSelection.value) {
    editor.value.commands.insertContent([{
      type: 'variableParagraph', // This type needs to be defined in your Tiptap editor schema
      attrs: { name: pName }
    }])
  } else {
    editor.value.chain()
      .focus()
      //.deleteSelection() // Decide if selection should be deleted or if paragraph is inserted after/before
      .insertContent([{
        type: 'variableParagraph', // This type needs to be defined in your Tiptap editor schema
        attrs: { name: pName }
      }])
      .run()
  }

  dialogVisible.value = false
  selectedParagraph.value = ''
}
</script>

<template>
  <div>
    <el-button size="small" @click="dialogVisible = true">
      {{ $t('docTemplate.paragraphManager.insertParagraph') }}
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      :title="$t('docTemplate.paragraphManager.insertParagraph')"
      width="400px"
      destroy-on-close
    >
      <el-form label-position="top">
        <el-form-item :label="$t('docTemplate.paragraphManager.selectParagraph')">
          <el-select
            v-model="selectedParagraph"
            filterable
            allow-create
            default-first-option
            :placeholder="$t('docTemplate.paragraphManager.selectParagraph')"
            style="width: 100%"
            @change="handleParagraphSelect"
          >
            <el-option
              v-for="pVar in paragraphVariables"
              :key="pVar"
              :label="pVar"
              :value="pVar"
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
          @click="insertParagraph()"
          :disabled="!selectedParagraph || (!paragraphVariables.includes(selectedParagraph) && !newVariableFormRef)"
        >
          {{ $t('confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <NewVariableForm
      ref="newVariableFormRef"
      :existing-variables="variables"
      default-type="Paragraph" 
      @variable-added="handleParagraphAdded"
    />
  </div>
</template>