<script lang="ts" setup>

const { options, setupEdtior, doc, scale, loading } = useDocEditor()

provide('docEditor', {
  options,
  doc,
  scale
})

defineExpose({
  setupEdtior
})
</script>

<template>
  <div class="template-editor" v-loading="loading">
    <DocTemplateHeader  />
    <DocTemplateBody />
    <DocTemplateFooter />
  </div>
</template>

<style lang="scss" scoped>
.template-editor{
  width:100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content  1fr min-content;
}

</style>
