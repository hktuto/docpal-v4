<script lang="ts" setup>
import type { SignatureSetting } from './type';

const props = defineProps<{
  index:number
  setting?: SignatureSetting
  companyListOptions?:any[]
}>()

const emits = defineEmits(['update','delete'])

const templateVariableOption = [
  'username',
  'firstName',
  'lastName',
  'signDate(yyyy-mm-dd)',
] as const

function changeType(newType:"personal" | "company"){
  const newData = {
    ...props.setting,
    type:newType
  }
  emits('update',newData)
}

async function getCompanyChopList(){

}

function remove(){

}

function addVariable(variable: typeof templateVariableOption[number]){

}

</script>

<template>
<div class="templateEditorContainer">
  <ElSelect :model-value="setting?.type" @change="changeType">
    <ElOption label="Personal" value="personal" />
    <ElOption label="Company" value="company" />
  </ElSelect>
  <div class="removeBtnContainer">
          <Icon name="lucide:trash-2" @click="remove" />
        </div>
</div>
</template>

<style lang="css" scoped>
.templateEditorContainer{

}
</style>
