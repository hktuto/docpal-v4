<script lang="ts" setup>
const mode = ref<'import' | 'export'>('export')


</script>

<template>
  <div class="pageContainer">
    <div class="importFromContainer">
      <ElSelect v-model="mode" placeholder="Select Mode">
        <ElOption label="Export" value="export"/>
        <ElOption label="Import" value="import"/>
      </ElSelect>
      <ConfigMigrationExportForm v-if="mode === 'export'"/>
      <ConfigMigrationImportForm v-if="mode === 'import'"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pageContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--app-space-s);
  gap: 10px;
  overflow: auto
}
</style>
