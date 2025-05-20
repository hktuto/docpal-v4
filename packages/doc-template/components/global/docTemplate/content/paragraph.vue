<script lang="ts" setup>

const { doc, inputEl, focus } = useDocEditorContent({
  focusLogic: selectLastNode,
  enterKeyHandler:handleEnterKey,
  deleteKeyHander:handleDeleteKey,
  otherKeyHandler:otherKeyHandler,
})
const emit = defineEmits(['add', 'remove', 'next', 'prev'])
function handleEnterKey(ev:any) {
  ev.preventDefault()
  emit('add')
}

function handleDeleteKey(ev:any) {
  // if input is empty fire remove event
  if(inputEl.value.innerHTML === '' || inputEl.value.innerHTML === '\n' || inputEl.value.innerHTML === '<br>') {
    ev.preventDefault()
    emit('remove')
  }
  // if current cursor is at first character, then move content to previous node
  const selection = getElementSelection(inputEl.value)
  if(selection.startPosition === 0) {
    ev.preventDefault()
    if(selection.selectedText === '') {

    }
  }
  
  console.log(selection)
}

function otherKeyHandler(ev:Event) {
  const selection = getElementSelection(inputEl.value)
  if(ev.key === 'ArrowDown') {
  
    emit('next', selection.startPosition || 0)
  }
  if(ev.key === 'ArrowUp') {
    emit('prev', selection.startPosition || 0)
  }
}

function selectLastNode(ev?:Event, selecteIndex?:number) {
  setElementSelection(inputEl.value, selecteIndex || 0)
}

</script>

<template>
  <div class="content" ref="inputEl" contenteditable="true" spellcheck="true"></div>
</template>

<style lang="scss" scoped>
.content{
  outline: none;
}
</style>
