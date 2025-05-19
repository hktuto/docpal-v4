<script lang="ts" setup>
const editorProvider = inject(DocTemplateProveKey)

if(!editorProvider) {
  throw createError('editorProvider is not found')
}
const { editor, options, variables } = editorProvider
const selectedVariable = ref()
const dialogRef = ref()
function onChange(value) {
  console.log(value)
  // check if value is new
  const selectedItem = variables.value.find(item => item.key === value)
  if(!selectedItem) {
    // new item logic
    console.log('new item')
    dialogRef.value.open({
      key: value,
      value: ''
    })
  }
}

</script>

<template>
  <div class="variableContainer">
    <ElSelect v-model="selectedVariable" allow-create filterable placeholder="Select a variable" @change="onChange">
      <ElOption v-for="vari in variables" :key="vari.key" :label="vari.key" :value="vari.value" />
    </ElSelect>
    <DocTemplateContentToolbarVariableNewDialog :defaultOpen="false" ref="dialogRef"/>
  </div>
</template>
