<template>
  <el-form ref="formRef" :model="formData" label-position="top">
    <el-form-item label="用户角色">
      <el-select v-model="formData.targetId" placeholder="请选择用户角色">
        <el-option v-for="role in flatRole" :key="role.id" :label="role.name" :value="role.id" />
      </el-select>
    </el-form-item>

    <el-divider>读取权限</el-divider>
    <el-form-item>
      <ResourceDocumentPermissionDetailCheckbox
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
      />
    </el-form-item>

    <el-divider>读写权限</el-divider>
    <ResourceDocumentPermissionDetailCheckbox
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
    />
    <el-form-item> </el-form-item>

    <el-divider>管理权限</el-divider>
    <el-form-item>
      <ResourceDocumentPermissionDetailCheckbox
        :checkAllLabel="`Manage`"
        v-model:checkAll="formData.allManage"
        :options="[
          { label: '删除文件夹/文件', value: 12 },
          { label: '删除子内容', value: 13 },
          { label: '分配权限', value: 14 },
          { label: '添加用户集', value: 15 }
        ]"
        v-model="formData.managePermissions"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const props = defineProps<{
  isFolder: boolean
}>()

const formRef = ref()
const roleOptions = ref([])

type SaveData = {
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
type FormData = {
  resourceId: string
  targetType: number
  targetId: string
  allRead: boolean
  allReadWrite: boolean
  allManage: boolean
  readPermissions: number[]
  readWritePermissions: number[]
  managePermissions: number[]
}
const formData = ref<FormData>({
  resourceId: '',
  targetType: 2,
  targetId: '',
  allRead: false,
  allReadWrite: false,
  allManage: false,
  readPermissions: [],
  readWritePermissions: [],
  managePermissions: []
})

function getReadPermissions(permissionLevels: number[]) {
  return permissionLevels.filter((level) => level <= 5)
}
function getReadWritePermissions(permissionLevels: number[]) {
  return permissionLevels.filter((level) => level >= 6 && level <= 11)
}
function getManagePermissions(permissionLevels: number[]) {
  return permissionLevels.filter((level) => level >= 12 && level <= 15)
}

function saveDataConvertToFormData(data: SaveData): FormData {
  const newFormData = {
    resourceId: data.resourceId,
    targetType: data.targetType,
    targetId: data.targetId,
    readPermissions: data.permissionLevel === 1 ? [1, 2, 3, 4, 5] : getReadPermissions(data.permissionIds),
    readWritePermissions: data.permissionLevel === 2 ? [6, 7, 8, 9, 10, 11] : getReadWritePermissions(data.permissionIds),
    managePermissions: data.permissionLevel === 3 ? [12, 13, 14, 15] : getManagePermissions(data.permissionIds)
  }
  return newFormData
}

function formDataConvertToSaveData(formData: FormData): SaveData {
  const newSaveData = {
    resourceId: formData.resourceId,
    resourceType: 1,
    targetType: 2,
    targetId: formData.targetId,
    permissionLevel: formData.allRead ? 1 : formData.allReadWrite ? 2 : formData.allManage ? 3 : 4,
    permissionIds: [...formData.readPermissions, ...formData.readWritePermissions, ...formData.managePermissions],
    configurationRuleName: '',
    members: [],
    rules: []
  }
  return newSaveData
}
function setFormData(data: SaveData) {
  formData.value = saveDataConvertToFormData(data)

  // formData.targetId = data.targetId
  // formData.readPermissions = data.readPermissions
  // formData.readWritePermissions = data.readWritePermissions
  // formData.managePermissions = data.managePermissions
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
