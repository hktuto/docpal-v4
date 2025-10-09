<script setup lang="ts">

const props = defineProps<{
  doc:any
}>()
const {doc} = toRefs(props);
const blob = ref();
const loading = ref(false);
async function getData() {
  loading.value = true;
  try {
    blob.value = await DownloadDocApi(props.doc.id);
  } catch (error) {

  }
  loading.value = false;
}
function refresh() {
  getData()
}
defineExpose({ refresh })
watch(doc, () => {
  getData();
},{
  immediate: true
})

</script>

<template>
  <div style="width:100%;height:100%;">
    
    <LazyReaderTiff :blob="blob" :loading="loading" />
  </div>
</template>

<style scoped lang="scss">

</style>
