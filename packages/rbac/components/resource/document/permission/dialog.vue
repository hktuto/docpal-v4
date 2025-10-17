<script lang="ts" setup>

const dialogVisible = ref(false)
const currentRow = ref<any>(null)
const activeTab = ref('permission')
const open = (row: any) => {
  currentRow.value = row
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <ElDialog v-model="dialogVisible" class="scroll-dialog big" :title="currentRow?.name || 'Permission'" width="80%" append-to-body destroy-on-close center >
    <div v-if="currentRow" class="permission-dialog-content-container">
      <ResourceDocumentPermissionTable  :document="currentRow" />
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
// because the table use vxetable, must set height to a value
.permission-dialog-content-container {
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

</style>
