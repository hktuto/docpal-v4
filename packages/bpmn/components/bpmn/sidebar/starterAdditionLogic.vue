<script lang="ts" setup>
import type { Node } from '@antv/x6'

const { node } = defineProps<{
  node: Node
}>()
const editorProvider = inject(EDITOR_PROVIDER)
if (!editorProvider) {
  throw createError('graph provider not found')
}
type Form = {
  attr_openInNewPage: boolean
}
const defaultForm: Form = {
  attr_openInNewPage: false
}
const form = ref<Form>({
  attr_openInNewPage: false
})

function setForm() {
  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: nodeData.version + 1 || 1,
    data: {
      ...nodeData.data,
      extensionElements: {
        ...nodeData.data.extensionElements,
        'docpal:additionaSetting': JSON.parse(JSON.stringify(form.value))
      }
    }
  }
  node.setData(newData, {
    deep: true,
    overwrite: true
  })
}

function getForm() {
  const nodeData = node.getData()
  if (nodeData.data && nodeData.data.extensionElements && nodeData.data.extensionElements['docpal:additionaSetting']) {
    form.value = nodeData.data.extensionElements['docpal:additionaSetting']
  } else {
    form.value = { ...defaultForm }
  }
}

useAdditionalContext(getForm)

watch(form, () => {
  setForm()
}, {
  deep: true
})
</script>

<template>
  <div class="formContainer">
    <h4>Addtional Setting</h4>
    <ElForm label-position="top">
      <ElFormItem label="Open Form in new page">
        <ElSwitch :disabled="editorProvider.readonly.value" v-model="form.attr_openInNewPage" />
      </ElFormItem>
    </ElForm>
  </div>
</template>