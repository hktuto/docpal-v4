<script lang="ts" setup>

const {disabled, formData, options} = defineProps<{
    disabled: boolean,
    formData: any
    options?: Object,
}>();

const docId = ref('');

function getInfo(){
  docId.value = formData[options.data.updateField]
}


onMounted(() => {
    getInfo()
})
</script>

<template>
  <div class="editDocumentContainer">
    <CollaboraViewer v-if="docId" :docId="docId" :readonly="false" :editable="true" fileType="WORKFLOW"  :editMode="true"/>
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
