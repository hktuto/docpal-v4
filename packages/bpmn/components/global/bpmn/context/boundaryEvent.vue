<script lang="ts" setup>
import type { Node } from '@antv/x6'
const { node } = defineProps<{
    node:Node
}>()

const time = computed({
  get(){
    const data = node.getData()
    
    return  Number(data.data.timerEventDefinition.timeDuration.substring(1, 2));
  },
  set(value) {
    node.setData({
        ...node.data,
        version: (node.data.version || 0) + 1,
        data:{
            ...node.data,
            timerEventDefinition:{
                timeDuration : `P${value}D`
            }
        }
    },{
        overwrite:true,
        deep:true
    })
  }
})

</script>

<template>
<div class="fromContainer">
    <BpmnSidebarFormLabel :node="node" />
    <div class="formContainer">
        <ElForm label-position="top">
            <ElFormItem label="Remind in day(s)" >
            <ElInputNumber v-model="time" controls-position="right" :min="1"  :step="1" />
            </ElFormItem>
        </ElForm>
    </div>

</div>
</template>