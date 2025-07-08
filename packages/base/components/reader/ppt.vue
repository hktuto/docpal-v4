<template>
  <div class="pptWrapper" v-loading="loading">
    <div class="pptContainer" ref="containerEl">
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import {init} from 'pptx-preview'
const props = defineProps<{ blob: Blob }>()

const pptViewer = ref()
const containerEl = ref()
const loading = ref(false)
async function initViewer(){
  loading.value = true;
  try{
    console.log(containerEl.value, props.blob)
    if(!containerEl.value || !props.blob) return;
    // get pptContainer width and height
    const {width, height} = containerEl.value.getBoundingClientRect()
    
    pptViewer.value =init(containerEl.value, {
      width,
      height,
    })
    // convet props.blob to arrayBuffer
    const buffer = await props.blob.arrayBuffer()
    console.log(props.blob, width, height, pptViewer.value, buffer)
    pptViewer.value.preview(buffer)
  } catch(error) {
    console.log(error)
  } finally {
    loading.value = false
  }

}

onMounted(() => {
  initViewer()
})

</script> 


<style lang="scss" scoped>
.pptContainer,.pptWrapper{
  width:100%;
  height: 100%;
}
:deep(.pptx-preview-wrapper){
  background: var(--app-grey-800)!important;
}
</style>
