<template>
  <el-form label-position="top"
           :model="form" @submit.prevent>
    <el-formItem v-for="item in options" :label="$t(`cmmn.${item}`)">
      <el-switch v-model="form[item]" @change="(val) => handleChange(val, item)" />
    </el-formItem>
  </el-form>
</template>
<script lang="ts" setup>

import { Graph, Node } from '@antv/x6'
const routerProvider = inject(MenuRouterKey)
const props = withDefaults(defineProps<{
  graph: Graph,
  node: Node,
  options: string[]
}>(), {
  options: [
    'requiredRule',
    'repetitionRule',
    'manualActivationRule'
  ]
})
const { node } = toRefs(props)
const form = ref({
  manualActivationRule: false,
  repetitionRule: false,
  requiredRule: false
})
const map = {
  manualActivationRule: '',
  requiredRule: '',
  repetitionRule: {
    'extensionElements': '',
    'attr_flowable:counterVariable': 'repetitionCounter'
  }
}

async function handleChange(val: boolean | string | number, key: string) {
  try {
    const itemControl = getItemControl()
    if (!val) delete itemControl[key]
    else itemControl[key] = map[key] ? map[key] : { ...map[key] }
  } catch (error) {

  }
}

function getItemControl() {
  if (!node.value.data.planItem) {
    routerProvider?.message.error('no planItem')
    throw new Error('no planItem')
  }
  if (!node.value.data.planItem.itemControl) node.value.data.planItem.itemControl = {}
  return node.value.data.planItem.itemControl
}

watch(node, () => {
  if (node.value) {
    try {
      const itemControl = getItemControl()
      if (itemControl.manualActivationRule || itemControl.manualActivationRule === '') form.value.manualActivationRule = true
      if (itemControl.repetitionRule || itemControl.repetitionRule === '') form.value.repetitionRule = true
      if (itemControl.requiredRule || itemControl.requiredRule === '') form.value.requiredRule = true
    } catch (error) {
      console.log(error)
    }
  }
}, {
  immediate: true
})


</script>
<style lang="scss" scoped>
.el-form {
  display: flex;
}
</style>
