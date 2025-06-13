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

    <ResourceDocumentPermissionDetailCheckboxForm ref="checkboxFormRef" />
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const props = defineProps<{
  isFolder: boolean
}>()

const formRef = ref()
const roleOptions = ref([])
const checkboxFormRef = ref({})
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
  resourceType: 1,
  targetType: 2,
  targetId: '',
  permissionLevel: 0,
  permissionIds: [],
})
function setFormData(data: SaveData) {
  formData.value.resourceId = data.resourceId
  formData.value.resourceType = data.resourceType
  formData.value.targetType = data.targetType
  formData.value.targetId = data.targetId
  // formData.value.permissionLevel = data.permissionLevel
  // formData.value.permissionIds = data.permissionIds
  checkboxFormRef.value.setData({
    permissionLevel: data.permissionLevel,
    permissionIds: data.permissionIds
  })
  console.log(formData.value)
}

async function getFormData() {
  try {
    await formRef.value.validate()
    const permissondata = checkboxFormRef.value.getData()
    const data: any = {
      resourceType: formData.value.resourceType || 1,
      resourceId: formData.value.resourceId,
      targetType: formData.value.targetType,
      targetId: formData.value.targetId,
      ...permissondata
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
