<template>
  <el-form ref="formRef" :model="formData" label-position="top">
    <el-form-item
      :label="$t('user_role')"
      prop="targetId"
      :rules="[{ required: true, message: $t('render.hint.fieldRequired', { name: $t('user_role') }), trigger: 'change' }]"
    >
      <el-select v-model="formData.targetId" :disabled="isEdit" :placeholder="$t('choose', { name: $t('user_role') })">
        <el-option-group v-for="options in targetOptions" :key="options.label" :label="$t(options.label)">
          <el-option v-for="item in options.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-option-group>
      </el-select>
    </el-form-item>

    <ResourceDocumentPermissionDetailCheckboxForm ref="checkboxFormRef" />
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { adminApi } from 'api'
const props = defineProps<{
  isFolder: boolean
  isEdit: boolean,
  filterList: any[]
}>()

const formRef = ref()
const checkboxFormRef = ref({})
const targetOptions = ref([])
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
  resourceType: number
  targetType: number
  targetId: string
}
const formData = ref<FormData>({
  resourceId: '',
  resourceType: 1,
  targetType: 2,
  targetId: '',
  permissionLevel: 0,
  permissionIds: []
})
function setFormData(data: SaveData) {
  formData.value.resourceId = data.resourceId
  formData.value.resourceType = data.resourceType
  formData.value.targetType = data.targetType
  formData.value.targetId = data.targetId ? '&&' + data.targetType + '&&' + data.targetId : ''
  // formData.value.permissionLevel = data.permissionLevel
  // formData.value.permissionIds = data.permissionIds
  checkboxFormRef.value.setData({
    permissionLevel: data.permissionLevel,
    permissionIds: data.permissionIds
  })
}

async function getFormData() {
  try {
    await formRef.value.validate()
    const permissondata = checkboxFormRef.value.getData()
    const data: any = {
      resourceType: formData.value.resourceType || 1,
      resourceId: formData.value.resourceId,
      targetType: getTargetType(formData.value.targetId),
      targetId: getTargetId(formData.value.targetId),
      ...permissondata
    }
    return data
  } catch (e) {
    console.error(e)
  }
  function getTargetType(targetId: string) {
    return targetId.split('&&')[1]
  }
  function getTargetId(targetId: string) {
    return targetId.split('&&')[2]
  }
}

const { flatRole } = useRBAC()
async function getTargetOptions() {
  console.log(props.filterList)
  const groupList = await adminApi.api.postNuxeoIdentityGroups({}).then((res) => res.data)
  const userList = await adminApi.api.postNuxeoIdentityGetkeycloakallusers({}).then((res) => res.data)
  targetOptions.value.push(
    {
      label: 'user_role',
      options: flatRole.value.map((item) => ({
        label: item.name,
        value: '&&2&&' + item.id
      }))
    },
    {
      label: 'user_groups',
      options: groupList
        .map((item) => ({
          label: item.name,
          value: '&&3&&' + item.id
        }))
        .filter((item: any) => !item.id)
    },
    {
      label: 'user_users',
      options: userList.map((item: any) => ({
        label: item.username,
        value: '&&1&&' + item.userId
      }))
    }
  )
}
onMounted(() => {
  getTargetOptions()
})
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
