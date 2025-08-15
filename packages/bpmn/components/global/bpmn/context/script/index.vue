<script setup lang="ts">
import type { Node } from '@antv/x6'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { QuestionFilled } from '@element-plus/icons-vue'
import { FullScreen } from '@element-plus/icons-vue'

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

const codeMirror = ref()
const isFullscreen = ref(false)

function isInFullscreen() {
  return !!(document.fullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement)
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
  if (codeMirror.value.requestFullscreen) {
    codeMirror.value.requestFullscreen()
  } else if (codeMirror.value.mozRequestFullScreen) { // Firefox
    codeMirror.value.mozRequestFullScreen()
  } else if (codeMirror.value.webkitRequestFullscreen) { // Chrome, Safari and Opera
    codeMirror.value.webkitRequestFullscreen()
  } else if (codeMirror.value.msRequestFullscreen) { // IE/Edge
    codeMirror.value.msRequestFullscreen()
  }
}

onMounted(() => {
  const handleFullscreenChange = () => {
    if (!isInFullscreen()) {
      isFullscreen.value = false
    }
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

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
  <div ref="codeMirror" :style="isFullscreen ? {margin: '10px', backgroundColor: '#FFF'} : {}">
    <el-form-item label-position="top">
      <template #label>
        <div class="label-container">
          <div class="label-left">
            <span>JavaScript</span>
            <el-popover class="box-item" width="300" title="Info" placement="top"
                        content="You can get and set data through execution.getVariable('key') and execution.setVariable('key', 'data : string')"
            >
              <template #reference>
                <el-icon v-if="!isFullscreen" style="cursor: pointer; color: #909399;">
                  <QuestionFilled />
                </el-icon>
              </template>
            </el-popover>
          </div>
          <el-button v-if="!isFullscreen" class="fullscreen-btn" @click="toggleFullscreen" size="small"
                     :icon="FullScreen" circle />
        </div>
      </template>
      <div v-if="isFullscreen" style="width: 42%">
        <el-alert type="success"
                  title="You can get and set data through execution.getVariable('key') and execution.setVariable('key', 'data : string')" />
      </div>
      <codemirror
        v-model="state.data"
        :style="isFullscreen ? {width: '100%', height: '95vh' } :{width: '300px', height: '65vh' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @blur="handleBlur"
      />
    </el-form-item>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  width: 100%;
}

.label-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.label-left {
  gap: 4px;
}

.fullscreen-btn {
  margin-left: auto;
}
</style>
