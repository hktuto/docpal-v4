<script lang="ts" setup>

const graphProvider = inject('rbacGraph') as any
const graph = graphProvider?.graph
const show = ref(false)
function nodeOnClickHandler({node}: {node:Node}) {
  console.log('nodeOnClickHandler', node)
  show.value = true
  nodeSelectedHandler(node)
}

function setupListeners() {
  console.log('setupListeners', graph.value)
  graph.value.on('node:dblclick', nodeOnClickHandler)
}

const selectedNode = ref()
const users = useUserList()
const selectedNodeUser = ref<any[]>([])
function nodeSelectedHandler(node:Node){
  
  const role = useRoleList()
  const label = node.data.label
  selectedNodeUser.value = users.value.filter((item:any) => item.role === label)
  selectedNode.value = node
}

defineExpose({
  setupListeners
})



</script>


<template>
  <div :class="{nodedialogContainer:true, opened:show}" >
    node
    <template v-if="selectedNodeUser">
      {{ selectedNodeUser }}
      
    </template>
  </div>

</template>

<style lang="scss" scoped>
.nodedialogContainer{
  z-index: 2;
  position: absolute;
  right: calc(var(--app-font-size-s) * 2);
  top: calc(var(--app-font-size-s) * 2);
  height: calc(100% - var(--app-font-size-s) * 4);
  width: 200px;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(10px);
  opacity: 0;
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-m);
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
  transform: translateX(100%);
  transition: all .2s ease-in-out;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);
  &.opened{
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
