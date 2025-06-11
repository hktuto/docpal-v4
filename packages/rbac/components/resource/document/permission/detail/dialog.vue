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
      <ResourceDocumentPermissionDetailForm ref="formRef" />
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
import { adminApi } from 'api'
import { ref } from 'vue'

const dialogVisible = ref(false)
const permissionId = ref('')
const formRef = ref()
type FormData = {
  resourceId: string,
  resourceType: number, // (1=Document)
  targetType: number, // (1=User, 2=Role, 3=Group, 4=User Set)
  targetId: string, 
  permissionLevel: number, //(1=Read, 2=ReadWrite, 3=Manage, 4=Custom, 5=Configuration Set)
  permissionIds: number[],
  configurationRuleName: string,
  members: any[], //TODO : create type
  rules: any[] //TODO : create type
}

async function getFormData(id: string) {
  // @ts-ignore
  const res = await adminApi.api.getAclResourcePermissionsResourceid(id).then((res) => res) as any
  return res
}

async function open (id: string, documentId: string)  {
  if(!documentId) {
    throw new Error('documentId is required')
  }
  permissionId.value = id
  dialogVisible.value = true
  let formData: FormData;
  // if id is not null, get form data from api
  if (id) {
    formData = await getFormData(id)
  }else{
    formData = {
      resourceId: documentId,
      resourceType: 1,
      targetType: 1,
      targetId: '',
      permissionLevel: 3,
      permissionIds:[],
      configurationRuleName: "",
      members: [],
      rules:[]
    }
  }
  formRef.value?.setFormData(formData)
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
