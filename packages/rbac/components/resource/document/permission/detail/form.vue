<template>
  <el-form ref="formRef" :model="formData" label-width="120px">
    <el-form-item label="用户角色">
      <el-select v-model="formData.roleId" placeholder="请选择用户角色">
        <el-option
          v-for="role in flatRole"
          :key="role.id"
          :label="role.name"
          :value="role.id"
        />
      </el-select>
    </el-form-item>

    <el-divider>读取权限</el-divider>
    <el-form-item>
      <el-checkbox-group v-model="formData.readPermissions">
        <el-checkbox label="viewFolder">查看文件夹/文件</el-checkbox>
        <el-checkbox label="viewMetadata">查看元数据</el-checkbox>
        <el-checkbox label="print">打印</el-checkbox>
        <el-checkbox label="download">下载</el-checkbox>
        <el-checkbox label="readPermission">读取权限</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-divider>读写权限</el-divider>
    <el-form-item>
      <el-checkbox-group v-model="formData.readWritePermissions">
        <el-checkbox label="editFolder">编辑文件夹</el-checkbox>
        <el-checkbox label="editChildContent" :disabled="!isFolder">编辑子内容</el-checkbox>
        <el-checkbox label="editMetadata">编辑元数据</el-checkbox>
        <el-checkbox label="share">分享</el-checkbox>
        <el-checkbox label="createSubFolder" :disabled="!isFolder">创建子文件夹</el-checkbox>
        <el-checkbox label="createFile" :disabled="!isFolder">创建文件</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-divider>管理权限</el-divider>
    <el-form-item>
      <el-checkbox-group v-model="formData.managePermissions">
        <el-checkbox label="deleteFolder">删除文件夹/文件</el-checkbox>
        <el-checkbox label="deleteChild" :disabled="!isFolder">删除子内容</el-checkbox>
        <el-checkbox label="assignPermission">分配权限</el-checkbox>
        <el-checkbox label="addUserSet">添加用户集</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getAclRoleUsersDropdown } from '@/api/admin'

const props = defineProps<{
  isFolder: boolean
}>()

const formRef = ref()
const roleOptions = ref([])



const formData = reactive({
  roleId: '',
  readPermissions: [],
  readWritePermissions: [],
  managePermissions: []
})

function setFormData(data: any) {
  formData.roleId = data.roleId
  formData.readPermissions = data.readPermissions
  formData.readWritePermissions = data.readWritePermissions
  formData.managePermissions = data.managePermissions
}

function getFormData() {
  return formData
}

const { flatRole } = useRBAC()

// 暴露方法给父组件
defineExpose({
  formRef,
  formData,
  setFormData,
  getFormData
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
