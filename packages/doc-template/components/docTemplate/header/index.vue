<script lang="ts" setup>
import { DocTemplateProveKey } from '~/utils/docTempalteHelper';

const editorProvider = inject(DocTemplateProveKey)
if(!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor } = editorProvider
const headers = useDocHeader()
const activeName = ref(headers.value[0].name);
const extendElement = useDocExtendElement()
</script>


<template>
<div class="headerContainer">
  <template v-if="editor">

  <el-tabs v-model="activeName" class="demo-tabs" >
    <el-tab-pane
      v-for="header in headers"
      :key="header.name"
      :label="header.name"
      :name="header.name"
    >
    <div class="tooleContainer">
      <div v-for="tool in header.tools" :key="tool.name" class="tool">
        <component  :is="tool.components" />
      </div>
    </div>
    </el-tab-pane>
  </el-tabs>
  <!-- extend Element -->
  <component v-for="elemeent in extendElement" :key="elemeent.name" :is="elemeent.components" />
  </template>
</div>
</template>

<style lang="scss" scoped>
.headerContainer{
  width:100%;
  background: var(--app-grey-975);
  padding-inline: var(--app-space-s) ;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  border-bottom: 1px solid var(--app-grey-800);
}

.tooleContainer{

  --gap: var(--app-space-s);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--gap);
  overflow: auto;
  padding-bottom: var(--app-space-s);
}
.tool {
  position: relative;
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
