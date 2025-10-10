<script lang="ts" setup>
import type { Node } from '@antv/x6'

const { node } = defineProps<{
  node: Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')
}
const condition = ref({})

function refreshData() {
  const nodeData = node.getData()
  condition.value = nodeData.data.extensionElements['flowable:field'].reduce((prev, item) => {
    if (item.attr_name !== 'variables') {
      prev[item.attr_name] = item['flowable:expression']['__cdata']
    } else {
      let _variablesCData = item['flowable:expression']['__cdata']
      try {
        _variablesCData = JSON.parse(_variablesCData)
      } catch (error) {
        _variablesCData = {}
      }
      if (!_variablesCData || '' === _variablesCData.CurrentYear) {
        return prev
      }
      const pattern = /(?<=get\()(.+?)(?=\))/g
      prev[item.attr_name] = Object.keys(_variablesCData).map((key) => {
        const value = _variablesCData[key]
        const values: RegExpExecArray | null = value.match(pattern)
        return {
          label: key,
          value: values[0]
        }
      })
    }
    return prev
  }, {})
}

function updateCondition() {
  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: nodeData.version + 1 || 1,
    data: {
      ...nodeData.data,
      extensionElements: {
        ...nodeData.data.extensionElements,
        'flowable:field': getCondition()
      }
    }
  }
  node.setData(newData, { overwrite: true, deep: true })

  function getCondition() {
    return Object.keys(condition.value).map((key) => {
      const value = condition.value[key]
      let __cdata = ''
      if (key === 'variables') {
        const data = value.reduce((prev, item) => {
          prev[item.label] = item.value ? '${variables:get(' + item.value + ')}' : ''
          return prev
        }, {})
        __cdata = JSON.stringify(data)
      } else {
        __cdata = value
      }
      return {
        attr_name: key,
        ['flowable:expression']: {
          __cdata
        }
      }
    })
  }
}

function setUpListener() {
  graphProvider?.graph.value?.on('history:undo', () => {
    refreshData()
  })
  graphProvider?.graph.value?.on('history:redo', () => {
    refreshData()
  })
}

watch(
  condition,
  (newVal) => {
    if (newVal) {
      updateCondition()
    }
  },
  {
    deep: true
  }
)
watch(
  () => node,
  async () => {
    console.log('node changed')
    refreshData()
  },
  {
    immediate: true,
    deep: true
  }
)
onMounted(async () => {
  setUpListener()
  // refreshData()
})
</script>
<template>
  <div>
    <BpmnSidebarEditLabel :node="node" />
    <BpmnContextGenerateIdForm :condition="condition" :disabled="editorProvider.readonly.value"></BpmnContextGenerateIdForm>
  </div>
</template>

<style lang="scss" scoped></style>
