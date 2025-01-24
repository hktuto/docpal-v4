<script setup lang="ts">
const {content, row = 4} = defineProps<{
    content: string,
    row: number
}>();
const emits = defineEmits(['update', 'update:content']);
const newVariableDialogRef = ref();
const currentPointer = ref<any>([])
const handleNewVariableAdded = (newVariable:string) => {
    if(!content) return
    // if currentPointer is same, inset newVariable
    if(currentPointer.value[0] === currentPointer.value[1]) {
        const newContent = content.substring(0, currentPointer.value[0]) + '{{' + newVariable + '}}' + content.value.substring(currentPointer.value[1])
        emits('update:content', newContent)
        return
    }
    // if currentPointer is not same, replace current content
    const newContent = content.substring(0, currentPointer.value[0]) + '{{' + newVariable + '}}' + content.value.substring(currentPointer.value[1])

    emits('update:content', newContent)
}
function updateContent(e:any) {
    console.log(e.target.value)
    const value = e.target.value
    emits('update:content', value)
}
const textarea = ref()
function openNewVariableDialog() {
    if(!content) return
    // store current pointer
    currentPointer.value = [textarea.value.selectionStart, textarea.value.selectionEnd]
    // set cursor position to end of content
    newVariableDialogRef.value.open()
}



</script>

<template>
<div class="textEditorContainer">
    <div class="inputContainer">
        <textarea ref="textarea" :value="content" @input="updateContent" :rows="row" ></textarea>
    </div>
    <div class="actions">
        <ElButton  @click="openNewVariableDialog">Variable</ElButton>
    </div>
    <MessageTemplateNewVariableDialog ref="newVariableDialogRef" @added="handleNewVariableAdded" />
</div>
</template>

<style scoped lang="scss">
.textEditorContainer{
    width: 100%;
}
.inputContainer{
    width: 100%;
    textarea{
        width: 100%;
    }
}
</style>