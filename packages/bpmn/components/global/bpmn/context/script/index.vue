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
  data: ''
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
  state.data = ''
  state.data = node.data.data.script['__cdata']
}

function handleBlur() {
  fieldMappingUpdate(state.data)
}

watch(() => node, async () => {
  if (node && node.data) {
    console.log('Request Node', node)
    init()
  }
}, {
  immediate: true,
  deep: true
})
</script>

<template>
  <BpmnSidebarEditLabel :node="node" />
  <el-form-item label="JavaScript" label-position="top">
    <template #label>
      <div style="display: flex; align-items: center; gap: 4px;">
        <span>JavaScript</span>
        <el-popover
          class="box-item"
          width="300"
          title="Info"
          content="You can get and set data through execution.getVariable('key') and execution.setVariable('key', 'data : string')"
          placement="top"
        >
          <template #reference>
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </template>
        </el-popover>
      </div>
    </template>
    <codemirror
      v-model="state.data"
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
