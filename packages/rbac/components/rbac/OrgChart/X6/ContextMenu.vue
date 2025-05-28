<template>
  <div v-if="visible" class="context-menu" :style="position">
    <div class="menu-item" @click="$emit('edit')">
      <i class="fas fa-edit"></i> 编辑
    </div>
    <div class="menu-item" @click="$emit('add')">
      <i class="fas fa-plus"></i> 添加子节点
    </div>
    <div class="menu-item delete" @click="$emit('delete')">
      <i class="fas fa-trash"></i> 删除
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  visible: boolean
  position: {
    left: string
    top: string
  }
}>()

defineEmits<{
  (e: 'edit'): void
  (e: 'add'): void
  (e: 'delete'): void
}>()
</script>

<style scoped>
.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  z-index: 1000;
  min-width: 160px;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item.delete {
  color: #ff4d4f;
}

.menu-item.delete:hover {
  background: #fff1f0;
}

i {
  font-size: 14px;
}
</style> 
