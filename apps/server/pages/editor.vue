<script lang="ts" setup>

const editorRef = ref()
const options = ref({});

onMounted(async () => {
  editorRef.value.setupEdtior()
})

</script>


<template>
  <div class="pageContainer">
    <DocTemplateEditor :options="options" ref="editorRef">
    </DocTemplateEditor>
  </div>
</template>

<style lang="scss" scoped>
.pageContainer{
  // padding: var(--app-space-s);
  height: 100svh;
  width: 100svw;
  position: relative;
  overflow: hidden;
}
</style>


