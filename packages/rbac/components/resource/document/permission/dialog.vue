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
  <ElDialog
    v-model="dialogVisible"
    :title="currentRow?.name || 'Permission'"
    
    width="80%"
    append-to-body
    destroy-on-close
    center
  >
    <div v-if="currentRow" class="permission-dialog-content-container">
      <ElTabs v-model="activeTab" type="card">
        <ElTabPane label="Permission" name="permission">
          <ResourceDocumentPermissionTable :document="currentRow" />
        </ElTabPane>
        <ElTabPane label="User Set" name="UserSet">
          user set
        </ElTabPane>
      </ElTabs>
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
// because the table use vxetable, must set height to a value
.permission-dialog-content-container{
  width: 100%;
  height: 100%;
  min-height: 80vh;
  overflow: hidden;
}
</style>
