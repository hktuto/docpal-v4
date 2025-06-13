<template>
  <el-form ref="formRef" :model="formData" label-position="top">
    <el-form-item
      label="用户角色"
      prop="targetId"
      :rules="[{ required: true, message: $t('render.hint.fieldRequired', { name: '用户角色' }), trigger: 'change' }]"
    >
      <el-select v-model="formData.targetId" placeholder="请选择用户角色">
        <el-option v-for="role in flatRole" :key="role.id" :label="role.name" :value="role.id" />
      </el-select>
    </el-form-item>

    <el-divider content-position="left">读取权限</el-divider>
    <el-form-item>
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
    </el-form-item>

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
    <el-form-item> </el-form-item>

    <el-divider content-position="left">管理权限</el-divider>
    <el-form-item>
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
const CheckboxRef = ref({})
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
const allPermission = ref([])
function handleChange(value, type) {
  if (!value) return
  if (type === 'readWrite') {
    CheckboxRef.value.read.handleCheckAllChange2(value)
  } else if (type === 'manage') {
    CheckboxRef.value.read.handleCheckAllChange2(value)
    CheckboxRef.value.readWrite.handleCheckAllChange2(value)
  }
}
function convertToFormData(data: SaveData): FormData {
  const newFormData = {
    resourceId: data.resourceId,
    targetType: data.targetType,
    targetId: data.targetId,
    readPermissions: data.permissionLevel === 1 ? [1, 2, 3, 4, 5] : getReadPermissions(data.permissionIds),
    readWritePermissions: data.permissionLevel === 2 ? [ 6, 7, 8, 9, 10, 11] : getReadWritePermissions(data.permissionIds),
    managePermissions: data.permissionLevel === 3 ? [ 12, 13, 14, 15] : getManagePermissions(data.permissionIds)
  }
  console.log(newFormData)
  // postAclResourcePermissions
  return newFormData
}

function setFormData(data: SaveData) {
  formData.value = convertToFormData(data)
  if(data.permissionLevel === 1) {
    formData.value.allRead = true
    handleChange(true, 'read')
  } else if(data.permissionLevel === 2) {
    formData.value.allRead = true
    formData.value.allReadWrite = true
    handleChange(true, 'readWrite')
  } else if(data.permissionLevel === 3) {
    formData.value.allRead = true
    formData.value.allReadWrite = true
    formData.value.allManage = true
    handleChange(true, 'manage')
  }
  // formData.targetId = data.targetId
  // formData.readPermissions = data.readPermissions
  // formData.readWritePermissions = data.readWritePermissions
  // formData.managePermissions = data.managePermissions
}

async function getFormData() {
  try {
    await formRef.value.validate()
    const data: any = {
      resourceType: formData.value.resourceType || 1,
      resourceId: formData.value.resourceId,
      targetType: formData.value.targetType,
      targetId: formData.value.targetId
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
  } catch (e) {
    console.error(e)
  }
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
