<template>
  <el-form ref="FormRef" label-position="top" :model="form" @submit.prevent>
    <el-formItem :label="$t('tableHeader_name')" prop="name"
                 :rules="[{ required: true, message: $t('tableHeader_name') + $t('render.hint.fieldRequired')}]">
      <el-input v-model="form.name" :disabled="disabled" @change="nameChange" placeholder="Name"/>
    </el-formItem>
  </el-form>
</template>
<script lang="ts" setup>
import {Graph, Node} from "@antv/x6";

const props = defineProps<{
  graph: Graph,
  node: Node,
  disabled: boolean
}>()
const {node} = toRefs(props)
const form = ref({
  name: ''
})
const FormRef = ref()

async function nameChange(newName: string) {
  const valid = await FormRef.value.validate()
  if (!valid) return
  node.value.prop('label', newName)
  node.value.attr('text/text', newName)
  const nodeData = node.value.data
  nodeData.data.attr_name = newName
  if (nodeData.planItem && nodeData.type !== 'exitCriterion' && nodeData.type !== 'entryCriterion') {
    nodeData.planItem.attr_name = newName
  }
}

watch(node, () => {
  if (node.value) {
    console.log(node.value);

    form.value.name = node.value.label || node.value.data.data.attr_name
  }
}, {
  immediate: true
})
</script>
<style lang="scss" scoped>
</style>
