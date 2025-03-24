<script setup lang="ts">
const content = defineModel<string>('content', {required: false, default: ''})
const parameters = defineModel<any[]>('parameters', {required: false, default: []})
const labelName = defineModel<string>('labelName')
const {row = 4, showVariables = true} = defineProps<{
  row: number,
  showVariables?: boolean,
}>();

const emits = defineEmits(['update', 'update:content']);
const newVariableDialogRef = ref();
const currentPointer = ref<any>([])
const handleNewVariableAdded = (newVariable: string) => {
  if (!content.value) return
  // if no currentPointer, inset add end
  if (!currentPointer.value || !currentPointer.value[0]) {
    content.value = content.value + ' {{' + newVariable + '}}'
  } else if (currentPointer.value[0] === currentPointer.value[1] && content.value) {
    content.value = content.value.substring(0, currentPointer.value[0]) + '{{' + newVariable + '}}' + content.value.substring(currentPointer.value[1])

  } else {
    // if currentPointer is not same, replace current content
    content.value = content.value.substring(0, currentPointer.value[0]) + '{{' + newVariable + '}}' + content.value.substring(currentPointer.value[1])
    console.log("content change", content.value)
  }
  // calculate new parameters
  nextTick(() => {
    calculateParaameters()
  })

}

function calculateParaameters() {
  console.log("calculateParaameters")
  if (!content.value || !showVariables) return

  if (!parameters.value || !Array.isArray(parameters.value)) {
    parameters.value = []
  }

  const newParameters = content.value.match(/\{\{(.*?)\}\}/g)?.map((item: any) => item.replace('{{', '').replace('}}', '')) || []
  // loop parameters and update value
  console.log("all newParameters", newParameters)
  parameters.value = newParameters.map((item: any) => {

    const oldValue = parameters.value ? parameters.value.find((param: any) => param.name === item) : ""
    return {
      name: item,
      value: oldValue?.value || '',
    }

  })
  console.log("parameters", parameters.value)
}

const textarea = ref()

function openNewVariableDialog() {
  if (!content) return
  // store current pointer
  currentPointer.value = [textarea.value.selectionStart, textarea.value.selectionEnd]
  // set cursor position to end of content
  newVariableDialogRef.value.open()
}

onMounted(() => {
  calculateParaameters()
})
</script>

<template>
  <div class="textEditorContainer">
    <div class="inputContainer">
      <textarea ref="textarea" v-model="content" @input="calculateParaameters" :rows="row"></textarea>
    </div>
    <div v-if="showVariables" class="actions">
      <ElButton :id="`MessageTemplate__Detail__EditTemplate__${labelName}Variable`" @click="openNewVariableDialog">
        {{ $t('messageTemplate_editTemplateVariable') }}
      </ElButton>
    </div>
    <div v-if="showVariables && parameters && parameters.length > 0" class="variableList">
      <ElForm :model="parameters" label-position="top">
        <ElFormItem v-for="(item, index) in parameters" :key="index" :label="item.name">
          <ElInput v-model="item.value" placeholder="Variable value"></ElInput>
        </ElFormItem>
      </ElForm>
    </div>
    <MessageTemplateNewVariableDialog ref="newVariableDialogRef" @added="handleNewVariableAdded"/>
  </div>
</template>

<style scoped lang="scss">
.textEditorContainer {
  width: 100%;
}

.inputContainer {
  width: 100%;

  textarea {
    width: 100%;
  }
}
</style>