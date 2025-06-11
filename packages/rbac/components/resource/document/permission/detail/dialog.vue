<template>
  <el-dialog
    v-model="dialogVisible"
    title="权限详情"
    width="80%"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="permission-detail-content">
      <!-- 权限详情内容 -->
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
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

const handleConfirm = () => {
  // 处理确认逻辑
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  permissionId.value = ''
}

defineExpose({
  open
})
</script>

<style scoped>
.permission-detail-content {
  min-height: 200px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
