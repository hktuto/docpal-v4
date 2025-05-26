<script setup lang="ts">
import { ref, inject } from 'vue'
import VariableManager from '~/components/docTemplate/VariableManager.vue'
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')
const { variables } = editorProvider

const variableManagerRef = ref()

const show = () => {
  variableManagerRef.value.open()
}
</script>

<template>
  <div>
    <el-button size="small" @click="show">{{ $t('docTemplate.variableManager.title') }}</el-button>
    <VariableManager
      ref="variableManagerRef"
    />
  </div>
</template> 
