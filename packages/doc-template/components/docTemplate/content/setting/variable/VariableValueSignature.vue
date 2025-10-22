<template>
  <div class="variable_editor">
    <template v-for="signature in modelValue">
      <div class="signatureSettingContainer">
        {{  signature }}
        <div class="removeBtnContainer">
          <Icon name="lucide:trash-2" @click="removeSignature(signature)" />
        </div>
      </div>
    </template>
    <template v-if="modelValue.length <= SignatureMaxLength">
      <ElButton @click="addSignature">Add</ElButton>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const { t } = useI18n()

const modelValue = defineModel<SignatureSetting[]>('modelValue',{default:[]})

const linkTypeList = ['String', 'Document', 'Workflow', 'Case']

type SignatureSetting = {
  id: string // timestamp as a uuid
  type: "personal" | "company", // what type of signature 
  prefix: string, // signature prefix with template string replace
  suffix: string, // signature suffix with template string replace
  value: any, // acture value of the signature to replace with
  signBy?: string // userId of sign user
  signatureId?: string  // the signature to replace with
}
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
  nextTick(() => {
    const newSign = {...defaultValue}
    newSign.id = Date.now().toString()
    modelValue.value.push(newSign)
  })
}

function removeSignature(signature:SignatureSetting) {
  const index = modelValue.value.findIndex( item => item.id === signature.id)
  console.log("removeSignature", index)
  if(index !== -1) {
    modelValue.value.splice(index, 1)
  }
}


</script>
<style lang="scss" scoped>
.variable_editor {
  display: flex;
  flex-direction: column;
  width:100%;
}
</style> 
