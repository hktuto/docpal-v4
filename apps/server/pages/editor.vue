<script lang="ts" setup>

const editorRef = ref()
const options = ref({});

</script>


<template>
  <div class="pageContainer">
    <DocTemplateEditor :options="options" ref="editorRef">
        <template #toolbar>
          <ElButton type="primary" >Preview</ElButton>
        </template>
    </DocTemplateEditor>
  </div>
</template>

<style lang="scss" scoped>
.pageContainer{
  // padding: var(--app-space-s);
}
</style>
