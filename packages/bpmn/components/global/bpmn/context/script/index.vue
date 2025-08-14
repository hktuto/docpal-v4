<script setup lang="ts">
import type { Node } from '@antv/x6'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { QuestionFilled } from '@element-plus/icons-vue'

const { node } = defineProps<{
  node: Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw createError('graph provider not found')
}

const state = reactive({
  js: ''
})

function fieldMappingUpdate(newVal: string) {
  graphProvider?.graph.value?.startBatch('update-script-field-data')

  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }
  newData.data.script['__cdata'] = newVal || ''
  node.setData(newData, { overwrite: true, deep: true, silent: false })

  graphProvider?.graph.value?.stopBatch('update-script-field-data')
}

const extensions = [javascript({ typescript: true }), oneDark]

function init() {
  const field: string = node.data.data.script['__cdata']

  if (!field) {
    state.js = ''
    return
  }
  state.js = field
}

function handleBlur() {
  fieldMappingUpdate(state.js)
}

onMounted(() => {
  init()
})

</script>

<template>
  <BpmnSidebarEditLabel :node="node" />
  <el-popover
    class="box-item"
    width="300"
    title="Info"
    content="You can get and set data through execution.getVariable('key') and execution.setVariable('key', 'data : string')"
    placement="top"
  >
    <template #reference>
      <div style="display: flex; justify-content: flex-end; align-items: center;">
        <el-icon>
          <QuestionFilled />
        </el-icon>
      </div>
    </template>
  </el-popover>
  <el-form-item label="JavaScript" label-position="top">
    <codemirror
      v-model="state.js"
      :style="{width: '290px', height: '68vh'}"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @blur="handleBlur"
    />
  </el-form-item>
</template>

<style scoped lang="scss">

</style>
