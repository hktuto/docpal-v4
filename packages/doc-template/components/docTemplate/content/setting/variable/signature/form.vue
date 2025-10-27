<template>
  <div class="variable_editor">
    <TemplateEditor 
      v-for="(signature, signatureIndex) in modelValue"
      :key="signature.id"
      v-model="modelValue[signatureIndex]"
      :index="signatureIndex"
      :companyListOptions="companyOptions" 
      @delete="removeSignature(signatureIndex)"
    />

    <template v-if="modelValue.length <= SignatureMaxLength">
      <ElButton @click="addSignature">Add</ElButton>
    </template>
  </div>
</template>
<script setup lang="ts">
import { adminApi } from 'api'
import type { SignatureSetting } from './type'
import TemplateEditor from './templateEditor.vue'
const { t } = useI18n()

const modelValue = defineModel<SignatureSetting[]>('modelValue',{default:[]})

const linkTypeList = ['String', 'Document', 'Workflow', 'Case']


const companyOptions = ref<any[]>([])


const defaultValue:SignatureSetting = {
  id:"",
  type: 'personal',
  prefix:"",
  suffix:"",
  value: "",
  signBy: "",
  signatureId: ""
} 
const SignatureMaxLength = 1 // max 2 signature in 1 field
function addSignature(){
  if(!Array.isArray(modelValue.value)){
    modelValue.value = []
  }
  // modelValue need to emit event and get back, add nexTick to make sure the value has updated
  nextTick(() => {
    const newSign = {...defaultValue}
    newSign.id = Date.now().toString()
    modelValue.value.push(newSign)
  })
}

function removeSignature(signatureIndex: number) {
  if (signatureIndex !== -1) {
    // block remove last item
    if (modelValue.value.length === 1) return 
    modelValue.value.splice(signatureIndex, 1)
  } else {
    console.error('index not exist', { modelValue: modelValue.value })
  }
}

async function getCompanyList(){
  const {data} = await adminApi.api.postCompanyprofilesPage({
    pageNum:0,
    pageSize: 100
  })
  if(data && data.entryList) {
    companyOptions.value = data.entryList
  }
}

onMounted(async () => {
  await getCompanyList()

})

</script>
<style lang="scss" scoped>
.variable_editor {
  display: flex;
  flex-direction: column;
  width:100%;
  gap: var(--app-space-xs);
}
</style> 
