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

function companyChange(newCompany:string) {
  const newData = {
    ...props.setting,
    company:newCompany
  }
  emits('update',newData)
}

async function getCompanyChopList(){

}

function remove(){
  emits('delete')
}

function addVariable(variable: typeof templateVariableOption[number]){

}

</script>

<template>
<div class="templateEditorContainer">
  <div class="header">
    <div class="label">Signature Setting</div>
    <div class="removeBtnContainer">
          <Icon name="lucide:trash-2" @click="remove" />
        </div>
  </div>
  <ElForm>
    <ElFormItem>

      <ElSelect :model-value="setting?.type" @change="changeType">
        <ElOption label="Personal" value="personal" />
        <ElOption label="Company" value="company" />
      </ElSelect>
    </ElFormItem>
  <template v-if="setting?.type === 'company'">
    <ElSelect :model-value="setting?.company" @change="companyChange">
      <ElOption v-for="company in companyListOptions" :label="company.name" :value="company.id" />
    </ElSelect>
  </template>
  </ElForm>
</div>
</template>

<style lang="css" scoped>
.templateEditorContainer{
  width: 100%;
  padding: var(--app-space-s);
  position: relative;
  border-radius: var(--app-border-radius-s);
  border: 1px solid var(--app-grey-900);
}
.header{
  width:100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.removeBtnContainer{
  cursor: pointer;
}
</style>
