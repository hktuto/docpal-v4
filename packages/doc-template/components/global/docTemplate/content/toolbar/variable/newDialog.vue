<script lang="ts" setup>
const {defaultOpen = false } = defineProps<{
  defaultOpen: boolean
}>()

const editorProvider = inject(DocTemplateProveKey)

if(!editorProvider) {
  throw createError('editorProvider is not found')
}
const emits = defineEmits(['submit', 'cancel'])
const opened = ref(defaultOpen)

const { editor, options, variables } = editorProvider

const form = ref<VariableItem>()



function open(newVariable: VariableItem) {
  if(!newVariable.key) {
    throw createError('Varibles key is required')
  }
  if(newVariable.dataType && newVariable.type && newVariable.key && newVariable.value) {
    // not empty
    form.value = newVariable
  }else{
    form.value = {
      type: 'Text',
      dataType: 'string',
      key: newVariable.key,
      value: ''
    }
  }
  opened.value = true
}

function submit(){
  variables.value.push(form.value)
  opened.value = false
}

function cancel(){
  opened.value = false
}


defineExpose({
  open
})

</script>

<template>
  <ElDialog v-model="opened" >
    <ElForm :model="form" label-position="top">
      <ElFormItem label="Type">
          <ElSelect v-model="form.type" placeholder="Select a type">
            <ElOption v-for="type in variableType" :key="type.type" :label="type.type" :value="type.type" />
          </ElSelect>
      </ElFormItem>
      <ElFormItem label="Key">
        <ElInput v-model="form.key" placeholder="Enter a key" />
      </ElFormItem>
      <ElFormItem label="Default Value">
        <ElInput v-model="form.value" placeholder="Enter a value" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="cancel">Cancel</ElButton>
      <ElButton type="primary" @click="submit">Confirm</ElButton>
    </template>
  </ElDialog>

</template>
