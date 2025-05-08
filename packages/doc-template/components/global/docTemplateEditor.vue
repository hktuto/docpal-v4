<script lang="ts" setup>

const defineModel = defineModel('options', {required: true})

</script>

<template>
  <div class="template-editor">
    <div class="toolBarContainer">
      <div class="tool">
        <slot name="toolbar"></slot>
      </div>
    </div>
    <div class="templateBody">
      editor here
    </div>
  </div>
</template>

<style lang="scss" scoped>
.template-editor{
  width:100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-s);
}
.toolBarContainer{
  width: 100%;
  padding-block: var(--app-space-xs);
  padding-inline: var(--app-space-s);
  border-bottom: 1px solid var(--app-grey-800);
}
.templateBody{
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
