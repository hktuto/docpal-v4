<script lang="ts" setup>
import { DocTemplateProveKey } from '../../../utils/docTempalteHelper';
import { ref, toRefs } from 'vue'
import type { ToolSection } from '../../../utils/docTempalteHelper'
import type { TipTapOptions } from 'docpal-document-editor/src/types'

const editorProvider = inject(DocTemplateProveKey)
if(!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor } = editorProvider
const headers = useDocHeader()
const activeName = ref(headers.value[0].name);
const extendElement = useDocExtendElement()

const displayHeader = ref<ToolSection[]>([])
const showVarManager = ref(false)
const { variables } = editorProvider

function init(options: TipTapOptions) {
  displayHeader.value = headers.value.reduce((acc: ToolSection[], cur) => {
    if (cur.requiredOptions && cur.requiredOptions.length > 0) {
      const isAllRequiredOptionsFilled = cur.requiredOptions.every(requiredOption => (options as any)[requiredOption])
      if (isAllRequiredOptionsFilled) {
        // loop through tools
        const tools = cur.tools.filter(tool => !tool.requiredOptions || tool.requiredOptions.length === 0 || tool.requiredOptions?.every(requiredOption => (options as any)[requiredOption]))
        if (tools.length > 0) {
          acc.push(cur)
        }
      }
    } else {
      const tools = cur.tools.filter(tool => !tool.requiredOptions || tool.requiredOptions.length === 0 || tool.requiredOptions?.every(requiredOption => (options as any)[requiredOption]))
      if (tools.length > 0) {
        acc.push(cur)
      }
    }
    return acc
  }, [])
}

defineExpose({
  init
})

</script>


<template>
<div class="headerContainer">
  <template v-if="editor">
    <el-tabs v-model="activeName" class="demo-tabs" >
      <el-tab-pane
        v-for="header in displayHeader"
        :key="header.name"
        :label="header.name"
        :name="header.name"
      >
      <div class="toolContainer">
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
  overflow: auto;
}

.toolContainer{
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
