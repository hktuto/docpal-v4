<script lang="ts" setup>
import { clientApi } from 'api';

const opened = ref(false)
const props = defineProps<{
  signatureSetting: any
}>()
const emit = defineEmits(['confirm'])
const loading = ref(false)
const signatures = ref<any[]>([])
const currenUserDetail = useUserState()
async function getUserSignature(){
  console.log('currenUserDetail', currenUserDetail.value)
 const signature = await clientApi.api.getUserProfileUseridSignature(currenUserDetail.value.userId,{format: 'blob'})
 console.log('signature', signature)
 const reader = new FileReader();
  reader.readAsDataURL(signature); 
  reader.onloadend = function() {
    var base64data = reader.result;  
    signatures.value.push(base64data)       
    
  }
}

async function getCompanyChop(chopId:string){
  const signature = await clientApi.api.getCompanyprofilesChopsCompanychopidFile(chopId,{format: 'blob'})
  const reader = new FileReader();
  reader.readAsDataURL(signature); 
  reader.onloadend = function() {
    var base64data = reader.result;  
    signatures.value.push(base64data)       
  }
}

async function open() {
  opened.value = true
  loading.value = true
  signatures.value = []
  // check if signatureVariableSetting is personal or company
  const type = props.signatureSetting.signatureVariableSetting.value.type
  if(type === 'personal' || type === 'both'){
    await getUserSignature()
  }
  if(type === 'company' || type === 'both'){
    const chopId = props.signatureSetting.signatureVariableSetting.value.signatureId
    await getCompanyChop(chopId)
  }
}
function close() {
  opened.value = false
}

function confirmApplySignature() {
  // step 1 , create current user info
  const signatureData = {
    ...currenUserDetail.value,
    signature: JSON.parse(JSON.stringify(signatures.value)),
    signDate: Date.now()
  }
  console.log('signatureData', signatureData)
  emit('confirm', signatureData)
  close()
}


defineExpose({
  open,
  close
})
</script>
<template>
  <el-dialog v-model="opened" v-loading="loading" append-to-body>
    <div class="signatureContainer">
      <div class="signatureItem" v-for="signature in signatures" :key="signature">
        <img class="signatureImage" :src="signature" alt="signature" />
      </div>
    </div>

    <template #footer>
      <el-button type="primary" @click="confirmApplySignature">Apply Signature</el-button>
    </template>
  </el-dialog>
</template>
<style scoped>
.signatureContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.signatureImage {
  width: 100%;
  height: 100%;
}
</style>
