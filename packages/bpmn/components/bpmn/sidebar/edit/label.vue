<script lang="ts" setup>
import {useI18n} from '#imports'
import type {Node} from '@antv/x6'

const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')

}

const {node,} = defineProps<{
  node: Node
}>()
const {t} = useI18n()

const form = ref({
  name: ''
})
const FormRef = ref()

function nameChange(val: string) {
  graphProvider?.graph.value?.startBatch('update-name')
  node.setData({
    name: val,
    data: {
      attr_name: val
    }
  })
  node.setProp('label', val)
  node.attr('text/text', val)
  graphProvider?.graph.value?.stopBatch('update-name')
}

function refreshData() {
  form.value.name = node.data.data.attr_name || node.data.name
}

function setUpListener() {
  graphProvider?.graph.value?.on('history:undo', () => {
    refreshData()
  })
  graphProvider?.graph.value?.on('history:redo', () => {
    refreshData()
  })
}

onMounted(() => {
  setUpListener()
})


watch(() => node, () => {
  if (node) {
    form.value.name = node.data.data.attr_name || node.data.name
  }
}, {
  immediate: true,
  deep: true
})
</script>

<template>
  <el-form ref="FormRef" label-position="top"
           :model="form" @submit.prevent>
    <el-formItem :label="$t('tableHeader_name')" prop="name"
                 :rules="[{ required: true, message: $t('tableHeader_name') + $t('render.hint.fieldRequired')}]">
      <el-input v-model="form.name" :disabled="editorProvider.readonly.value" @change="nameChange" placeholder="Name"/>
    </el-formItem>
  </el-form>
</template>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-bottom: var(--app-space-xs);
}
</style>
