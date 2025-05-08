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
