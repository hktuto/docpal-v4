<script lang="ts" setup>
import { DocTemplateProveKey } from '../../../utils/docTemplateHelper'
import { ref, inject } from 'vue'

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor } = editorProvider

const activeName = ref('Home')

function init() {
  // do nothing
}

defineExpose({
  init
})
</script>

<template>
  <div class="headerContainer">
    <template v-if="editor">
      <div class="toolContainer">
        <LazyDocTemplateContentToolbar />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.headerContainer {
  width: auto;
  background: var(--app-grey-975);
  padding-inline: var(--app-space-s);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  border-bottom: 1px solid var(--app-grey-800);
  overflow: auto;
}

.toolContainer {
  --gap: var(--app-space-s);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--gap);
  overflow: auto;
  width: auto;
  padding-block: var(--app-space-s);
}

.tool + .tool {
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background: var(--app-grey-800);
    position: absolute;
    left: calc(var(--gap) * -0.5);
    top: 0;
  }
}
</style>
