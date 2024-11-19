<script lang="ts" setup>
import type { Node } from '@antv/x6'

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')   
}

const form = ref({
  name: ''
})
const FormRef = ref()

function nameChange(val:string) {
    graphProvider?.graph.value?.startBatch('update-name')
    // 
    graphProvider?.graph.value?.stopBatch('update-name')
}

function refreshData(){
    form.value.name = graphProvider?.bpmnJson.value.definitions.process.attr_name;

}

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
      refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
      refreshData()
    })
}


onMounted(() => {
    setUpListener()
    refreshData()
})


</script>

<template>
  <el-form ref="FormRef" label-position="top"
           :model="form" @submit.stop>
    <el-formItem label="Name" prop="name"
                 :rules="[{ required: true, message: 'Workflow Name is required'}]">
      <el-input v-model="form.name" @change="nameChange"  placeholder="Name" />
    </el-formItem>
</el-form>  
</template>