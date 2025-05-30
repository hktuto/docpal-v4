<script lang="ts" setup>

const { t } = useI18n()
const {init} = useRBAC()
const users = useUserList()
const graphRef = ref()
onMounted(async () => {
  await init()
  console.log('graphRef', graphRef.value)
  graphRef.value.initGraph()
})

const nodeEditorEl = ref()

function graphReadyHandler(){
  console.log('graphReadyHandler', nodeEditorEl.value)
  nodeEditorEl.value.setupListeners()
}
</script>

<template>
  <div class="pageContainer">
    <RbacRoleGraph ref="graphRef" @graphReady="graphReadyHandler">
        <RbacNode ref="nodeEditorEl" />
      </RbacRoleGraph>
  </div>
</template>


<style lang="scss" scoped>
.pageContainer {
  width: 100%;
  height: 100%;
  padding: var(--app-space-s);
}
</style>
