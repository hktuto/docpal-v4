<template>
  <el-dialog v-model="dialogVisible" title="用户权限设置" width="80%" append-to-body destroy-on-close center :close-on-click-modal="false" @close="handleClose">
    <div class="user-set-content">
      <!-- 用户权限设置内容 -->
      <div class="left">
        <ElForm ref="formRef" :model="formData" label-position="top">
          <ElFormItem
            label="User Set Name"
            prop="configurationRuleName"
            :rules="[{ required: true, message: $t('render.hint.fieldRequired', { name: $t('user_role') }), trigger: 'change' }]"
          >
            <ElInput v-model="formData.configurationRuleName" />
          </ElFormItem>
        </ElForm>
        <ResourceDocumentUserSetForm :filterList="filterList" ref="userSetFormRef" />
        <ResourceDocumentUserSetDocForm ref="userSetDocFormRef" />
      </div>
      <div class="right">
        <ResourceDocumentPermissionDetailCheckboxForm ref="checkboxFormRef" :isUserSet="true" />
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">{{ $t('cancelText') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('confirmText') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { adminApi } from 'api'
const props = defineProps<{
  filterList: any[]
}>()
const dialogVisible = ref(false)
const permissionId = ref('')
const resourceId = ref('') // documentId
const checkboxFormRef = ref()
const userSetFormRef = ref()
const userSetDocFormRef = ref()
const emits = defineEmits(['success'])
const formRef = ref()
const formData = ref({
  configurationRuleName: ''
})
const open = (row: any, documentId: string) => {
  resourceId.value = documentId
  permissionId.value = row?.id || ''
  dialogVisible.value = true
  setTimeout(() => {
    userSetFormRef.value.setFormData(row)
    userSetDocFormRef.value.setFormData(row)
    if (!!row) {
      checkboxFormRef.value.setData({
        permissionLevel: 5,
        permissionIds: row.permissionIds
      })
    }
  }, 100)
}

const handleClose = () => {
  dialogVisible.value = false
  permissionId.value = ''
}

const handleConfirm = async () => {
  try {
    await formRef.value.validate()
    const userformData = userSetFormRef.value.getFormData()
    const docData = userSetDocFormRef.value.getFormData()
    const permissondata = checkboxFormRef.value.getData()
    console.log(formData, docData, permissondata, userformData)
    const params = {
      permissionLevel: 5,
      permissionIds: permissondata.permissionIds,
      configurationRuleName: formData.value.configurationRuleName,
      targetType: 4,
      resourceId: resourceId.value,
      resourceType: 1,
      members: userformData,
      rules: [docData]
    }
    if (permissionId.value) {
      await adminApi.api.putAclResourcePermissionsId(permissionId.value, params)
    } else {
      await adminApi.api.postAclResourcePermissions(params)
    }
    console.log(params)
  } catch (e) {
    console.error(e)
    return
  }
  handleClose()
}

defineExpose({
  open
})
</script>

<style scoped>
.user-set-content {
  width: 100%;
  /*  left and right panel */
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-s);
  justify-content: flex-start;
  align-items: flex-start;
  .left {
    flex: 1;
  }
  .right {
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
