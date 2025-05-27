<script setup lang="ts">
import { ref, inject } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { useI18n } from 'vue-i18n'
import VariableSuggestionDropdown from '../../../../../../../../libraries/docpal-document-editor/src/packages/VariableSuggestionDropdown.vue'
import { DocTemplateProveKey } from '../../../../../../utils/docTempalteHelper'

const { t } = useI18n()
const showDialog = ref(false)
const provider = inject(DocTemplateProveKey)

function openDialog() {
  showDialog.value = true
}

function onSelect(variable: any) {
  if (provider?.editor?.value) {
    provider.editor.value.chain().focus().insertContent({
      type: 'variableText',
      attrs: {
        key: variable.key,
        type: variable.type,
        displayValue: variable.displayValue,
      },
    }).run()
  }
  showDialog.value = false
}
</script>

<template>
  <div>
    <ElButton size="small" @click="openDialog">
      {{ t('docTemplate.variable.insertVariable') }}
    </ElButton>
    <ElDialog v-model="showDialog" :title="t('docTemplate.variable.selectVariable')" width="400px" append-to-body>
      <VariableSuggestionDropdown
        query=""
        :command="onSelect"
      />
    </ElDialog>
  </div>
</template> 
