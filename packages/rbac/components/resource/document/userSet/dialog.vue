<template>
  <el-dialog
    v-model="dialogVisible"
    title="用户权限设置"
    width="80%"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="user-set-content">
      <!-- 用户权限设置内容 -->
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

const open = (id: string) => {
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
  min-height: 200px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
