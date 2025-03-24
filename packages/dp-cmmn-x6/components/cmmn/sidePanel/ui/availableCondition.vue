<template>
  <el-form ref="FormRef" label-position="top"
           :model="form" @submit.prevent>
    <el-formItem :label="$t('availableCondition')" prop="availableCondition"
                 :rules="[{ required: true, message: $t('availableCondition') + $t('render.hint.fieldRequired')}]">
      <el-input v-model="form.availableCondition" @change="handleChange" placeholder="availableCondition"/>
    </el-formItem>
  </el-form>
</template>
<script lang="ts" setup>
import {Graph, Node} from "@antv/x6";

const props = defineProps<{
  graph: Graph,
  node: Node
}>()
const {node} = toRefs(props)
const form = ref({
  availableCondition: ''
})
const FormRef = ref()

async function handleChange(value: string) {
  try {
    const nodeData = node.value.data
    nodeData.data['attr_flowable:availableCondition'] = value
  } catch (error) {

  }
}

function init(nodeData: any) {
  try {
    form.value.availableCondition = nodeData.data['attr_flowable:availableCondition']
  } catch (error) {
  }
}

watch(node, () => {
  if (node.value) {
    init(node.value.data)
  }
}, {
  immediate: true
})
</script>
<style lang="scss" scoped>
</style>
