<script lang="ts" setup>

const props = defineProps<{
    disabled: boolean,
    formData: any
    options: any,
}>();

const {disabled, formData, options} = toRefs(props) 

const docId = ref('');

function getFormData(){
  return formData
}

function getInfo(){
  docId.value = formData.value[options.value.data.updateField]
}

defineExpose({ getFormData })

watch( formData, () => {
  getInfo()
}, {
  immediate: true,
  deep: true
})


</script>

<template>
  <div class="editDocumentContainer">
    <CollaboraViewer v-if="docId" :docId="docId" :readonly="false" :editable="true" fileType="WORKFLOW" />
  </div>
</template>


<style lang="scss" scoped>
.editDocumentContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
