<template>
  <div>
    <el-divider content-position="left">读取权限</el-divider>
    <ResourceDocumentPermissionDetailCheckbox
      :ref="
        (el) => {
          CheckboxRef.read = el
        }
      "
      :checkAllLabel="`Read`"
      v-model:checkAll="formData.allRead"
      :options="[
        { label: '查看文件夹/文件', value: 1 },
        { label: '查看元数据', value: 2 },
        { label: '打印', value: 3 },
        { label: '下载', value: 4 },
        { label: '读取权限', value: 5 }
      ]"
      v-model="formData.readPermissions"
      @change="(v) => handleChange(v, 'read')"
    />

    <el-divider content-position="left">读写权限</el-divider>
    <ResourceDocumentPermissionDetailCheckbox
      :ref="
        (el) => {
          CheckboxRef.readWrite = el
        }
      "
      :checkAllLabel="`ReadWrite`"
      v-model:checkAll="formData.allReadWrite"
      :options="[
        { label: '编辑文件夹', value: 6 },
        { label: '编辑子内容', value: 7 },
        { label: '编辑元数据', value: 8 },
        { label: '分享', value: 9 },
        { label: '创建子文件夹', value: 10 },
        { label: '创建文件', value: 11 }
      ]"
      v-model="formData.readWritePermissions"
      @change="(v) => handleChange(v, 'readWrite')"
    />

    <el-divider content-position="left">管理权限</el-divider>
    <ResourceDocumentPermissionDetailCheckbox
      :ref="
        (el) => {
          CheckboxRef.manage = el
        }
      "
      :checkAllLabel="`manage`"
      v-model:checkAll="formData.allManage"
      :options="[
        { label: '删除文件夹/文件', value: 12 },
        { label: '删除子内容', value: 13 },
        { label: '分配权限', value: 14 },
        { label: '添加用户集', value: 15 }
      ]"
      v-model="formData.managePermissions"
      @change="(v) => handleChange(v, 'manage')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const CheckboxRef = ref({})

type FormData = {
  allRead: boolean
  allReadWrite: boolean
  allManage: boolean
  readPermissions: number[]
  readWritePermissions: number[]
  managePermissions: number[]
}

const formData = ref<FormData>({
  allRead: false,
  allReadWrite: false,
  allManage: false,
  readPermissions: [],
  readWritePermissions: [],
  managePermissions: []
})

function handleChange(value, type) {
  if (!value) return
  if (type === 'readWrite') {
    CheckboxRef.value.read.handleCheckAllChange2(value)
  } else if (type === 'manage') {
    CheckboxRef.value.read.handleCheckAllChange2(value)
    CheckboxRef.value.readWrite.handleCheckAllChange2(value)
  }
}

function convertToFormData(data: SaveData) {
  const newFormData: any = {}
  if (!data.permissionIds) return newFormData
  const arr = ['read', 'readWrite', 'manage']
  arr.forEach((type) => {
    newFormData[type + 'Permissions'] = CheckboxRef.value[type].filterPermission(data.permissionIds)
  })
  console.log(newFormData)
  // postAclResourcePermissions
  return newFormData
}

function getData() {
  const data = {
    permissionLevel: 0,
    permissionIds: []
  }
  if (formData.value.allRead && formData.value.readWritePermissions.length === 0 && formData.value.managePermissions.length === 0) {
    data.permissionLevel = 1 // Read
  } else if (formData.value.allRead && formData.value.allReadWrite && formData.value.managePermissions.length === 0) {
    data.permissionLevel = 2 // ReadWrite
  } else if (formData.value.allRead && formData.value.allReadWrite && formData.value.allManage) {
    data.permissionLevel = 3 // Manage
  } else {
    data.permissionLevel = 4 // Custom
    data.permissionIds = [...formData.value.readPermissions, ...formData.value.readWritePermissions, ...formData.value.managePermissions]
  }
  return data
}
function setData(data: FormData) {
  formData.value = convertToFormData(data)
  if (data.permissionLevel === 1) {
    formData.value.allRead = true
    handleChange(true, 'read')
  } else if (data.permissionLevel === 2) {
    formData.value.allRead = true
    formData.value.allReadWrite = true
    handleChange(true, 'readWrite')
  } else if (data.permissionLevel === 3) {
    formData.value.allRead = true
    formData.value.allReadWrite = true
    formData.value.allManage = true
    handleChange(true, 'manage')
  }
}
defineExpose({
  getData,
  setData
})
</script>

<style scoped>
.el-divider {
  margin: 20px 0;
}
.el-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
