<script lang="ts" setup>
import type { Node } from '@antv/x6'
const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);
if(!graphProvider || !editorProvider) {
    throw createError('graph provider not found')
    
}
const fieldEditorRef = ref()

function editCompleteForm() {
    // get all form field

}

</script>

<template>
<div class="fromContainer">
    
    <ElButton type="primary" @click="editorProvider.openForm(node)" :disabled="editorProvider.readonly.value" >Edit Form</ElButton>
    <ElButton type="primary" @click="editorProvider.previewForm(node)" >Preview Form</ElButton>
</div>
</template>