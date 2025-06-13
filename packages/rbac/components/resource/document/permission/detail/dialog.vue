<template>
  <el-dialog v-model="dialogVisible" title="权限详情" width="80%" :close-on-click-modal="false" @close="handleClose">
    <div class="permission-detail-content">
      <!-- 权限详情内容 -->
      <ResourceDocumentPermissionDetailForm ref="formRef" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button :loading="loading" type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { adminApi } from 'api'
import { ref } from 'vue'
const emits = defineEmits(['success'])
const dialogVisible = ref(false)
const loading = ref(false)
const formRef = ref()
let isEditMode = false
let permissionId = ''
type FormData = {
  resourceId: string
  resourceType: number // (1=Document)
  targetType: number // (1=User, 2=Role, 3=Group, 4=User Set)
  targetId: string
  permissionLevel: number //(1=Read, 2=ReadWrite, 3=Manage, 4=Custom, 5=Configuration Set)
  permissionIds: number[]
  configurationRuleName: string
  members: any[] //TODO : create type
  rules: any[] //TODO : create type
}
async function open(row: any, documentId: string) {
  isEditMode = true
  if (!documentId) {
    throw new Error('documentId is required')
  }
  dialogVisible.value = true
  let formData: FormData
  // if row is not null, get form data from api
  if (row) {
    isEditMode = true
    permissionId = row.id
    formData = JSON.parse(JSON.stringify(row))
  } else {
    formData = {
      resourceId: documentId,
      resourceType: 1,
      targetType: 2,
      targetId: '',
      permissionLevel: 1,
      permissionIds: [],
      configurationRuleName: '',
      members: [],
      rules: []
    }
  }
  setTimeout(() => {
    formRef.value?.setFormData(formData)
  }, 100)
  // formRef.value?.setFormData(formData)
}

const handleConfirm = async () => {
  const data = await formRef.value.getFormData()
  if (!data) return
  loading.value = true
  // 处理确认逻辑
  if (isEditMode) {
    await adminApi.api.putAclResourcePermissionsId(permissionId, data)
  } else {
    await adminApi.api.postAclResourcePermissions(data)
  }
  loading.value = false
  emits('success')
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
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
