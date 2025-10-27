<script lang="ts" setup>
import type { SignatureSetting } from './type';
import { adminApi } from 'api';
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
  if(newCompany){
    getCompanyChopList(newCompany)
  }
  emits('update',newData)
}
const companyChopList = ref<any[]>([])
async function getCompanyChopList(companyId:string){
  const { data } = await adminApi.api.getCompanyprofilesCompanyidChops(companyId,{
    requestDTO: {
      pageNum: 1,
      pageSize: 1000,
      status: 'A'
    }
  })

  companyChopList.value = data || []
}

function companyChopChange(newChop:string){
  const newData = {
    ...props.setting,
    signatureId:newChop
  }
  emits('update',newData)
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
    <ElFormItem label="Type">
      <ElSelect :model-value="setting?.type" @change="changeType">
        <ElOption label="Personal" value="personal" />
        <ElOption label="Company" value="company" />
      </ElSelect>
    </ElFormItem>
  <template v-if="setting?.type === 'company'">
    <ElFormItem label="Company">
      <ElSelect :model-value="setting?.company" @change="companyChange">
          <ElOption v-for="company in companyListOptions" :label="company.name" :value="company.id" />
        </ElSelect>
    </ElFormItem>
    <ElFormItem label="Company Chop">
      <ElSelect :model-value="setting?.signatureId" @change="companyChopChange">
        <ElOption v-for="chop in companyChopList" :label="chop.name" :value="chop.id" />
      </ElSelect>
    </ElFormItem>
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
