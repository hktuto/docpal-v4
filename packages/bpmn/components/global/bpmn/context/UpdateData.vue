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

function refreshData() {

}

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
      refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
      refreshData()
    })
}

onMounted(async () => {
    setUpListener()
    refreshData()
})

</script>


<template>
    <div class="formContainer">
        {{ node.data }}
    </div>

</template>