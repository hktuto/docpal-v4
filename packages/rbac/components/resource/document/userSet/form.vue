<script setup lang="ts">

const formData = ref()
function setFormData(data:any){
}

function getFormData(){

}

defineExpose({
  setFormData,
  getFormData
})
</script>
<template>
  <ElForm :model="formData" label-position="top">
    
  </ElForm>
</template>
