<script setup lang="ts">
import type { Node } from '@antv/x6'
// import { EditorState } from '@codemirror/state'
// import { EditorView, keymap } from '@codemirror/view'
// import { javascript } from '@codemirror/lang-javascript'
// import { defaultKeymap } from '@codemirror/commands'

const { node } = defineProps<{
  node: Node
}>()
const { t } = useI18n()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw createError('graph provider not found')
}
const defaultFieldOptions = computed(() => {
  if (!graphProvider.allFormField.value) return []

  return Object.keys(graphProvider.allFormField.value).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: graphProvider.allFormField.value[key].attr_id
    }
  })
})

const state = reactive({
  js: ''
})

function fieldMappingUpdate(newVal: string, name: string) {
  graphProvider?.graph.value?.startBatch('update-script-field-data')

  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }
  newData.data.script['__CDATA'] = newVal || ''
  node.setData(newData, { overwrite: true, deep: true, silent: false })

  graphProvider?.graph.value?.stopBatch('update-script-field-data')
}

// const editor = ref<HTMLDivElement | null>(null)
// let view = ref()
//
// function init() {
//   if (editor.value) {
//     let startState = EditorState.create({
//       doc: state.js,
//       extensions: [
//         keymap.of(defaultKeymap),
//         EditorView.theme({})
//       ]
//     })
//
//     const view = new EditorView({
//       doc: state.js,
//       parent: document.body,
//       extensions: [
//         javascript({ typescript: true })
//       ]
//     })
//   }
// }

// onMounted(() => {
//   init()
// })

// onBeforeUnmount(() => {
//   if (view) {
//     view.destroy()
//   }
// })

</script>

<template>
  <BpmnSidebarEditLabel :node="node" />
  <el-form-item :label="t('JavaScript')" label-position="top">
    <el-input v-model="state.js" type="textarea" rows="35"
              @change="(val:any) => fieldMappingUpdate(val, 'responseVariableName')" />
    <!--    <div ref="editor"></div>-->
  </el-form-item>

</template>

<style scoped lang="scss">

</style>