<template>
  <el-dialog v-model="dialogVisible" title="用户权限设置" width="80%" append-to-body destroy-on-close center :close-on-click-modal="false" @close="handleClose">
    <div class="user-set-content">
      <!-- 用户权限设置内容 -->
      <div class="left">
        <ResourceDocumentUserSetForm ref="userSetFormRef" />
      </div>
      <div class="right">
        <ResourceDocumentPermissionDetailCheckboxForm ref="checkboxFormRef" />
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)
const permissionId = ref('')
const checkboxFormRef = ref()
const userSetFormRef = ref()
const emits = defineEmits(['success'])

const open = (id: string, documentId: string) => {
  permissionId.value = id
  dialogVisible.value = true
}

const handleClose = () => {
  dialogVisible.value = false
  permissionId.value = ''
}

const handleConfirm = () => {
  // 处理确认逻辑
  handleClose()
}

defineExpose({
  open
})
</script>

<style scoped>
.user-set-content {
  width:100%;
  /*  left and right panel */
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-s);
  justify-content: flex-start;
  align-items: flex-start;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
