<script setup lang="ts">
import { ref, inject } from 'vue'
import VariableManager from '~/components/docTemplate/VariableManager.vue'
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const show = ref(false)
const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')
const { variables } = editorProvider
</script>

<template>
  <div>
    <el-button size="small" @click="show = true">Variables</el-button>
    <VariableManager
      :visible="show"
      @close="show = false"
    />
  </div>
</template> 
