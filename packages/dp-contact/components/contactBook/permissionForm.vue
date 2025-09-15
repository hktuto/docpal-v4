<template>
  <FormRenderer ref="FormRendererRef" :form-json="formJson"> </FormRenderer>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { globalApi } from 'api'
import formJson from './permission.vform.json'
const { t } = useI18n()
const emits = defineEmits(['refresh'])

const FormRendererRef = ref()

async function getFormData() {
  try {
    const data = await FormRendererRef.value.getFormData()
    const permissionRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('permissions')
    const options = permissionRef.getOptionItems()
    const permissions = {
      Read: getPermissionData(data.read, options),
      Create: getPermissionData(data.create, options),
      Delete: getPermissionData(data.delete, options),
      Manage: getPermissionData(data.manage, options),
      Edit: getPermissionData(data.edit, options)
    }
    return { name: data.name, permissions }
  } catch (error) {
    console.log('error', error)
  } finally {
    // FormRendererRef.value.vFormRenderRef.resetForm()
  }
}
function getPermissionData(values: any, options: any) {
  console.log(values, options)
  if (!values) return {}
  const result = {
    users: [],
    groups: [],
    roles: []
  }
  console.log(options)
  const userList = options.find((item: any) => item.value === 'user_users')?.options
  const groupList = options.find((item: any) => item.value === 'user_groups')?.options
  const roleList = options.find((item: any) => item.value === 'user_roles')?.options
  values.forEach((value: any) => {
    if (userList.some((item: any) => item.value === value)) {
      result.users.push(value)
    } else if (groupList.some((item: any) => item.value === value)) {
      result.groups.push(value)
    } else if (roleList.some((item: any) => item.value === value)) {
      result.roles.push(value)
    }
  })
  if (result.users.length === 0) delete result.users
  if (result.groups.length === 0) delete result.groups
  if (result.roles.length === 0) delete result.roles
  return result
}
function setFormData(data: any) {
  FormRendererRef.value.vFormRenderRef.setFormData(data)
}
defineExpose({ getFormData, setFormData })
</script>
<style lang="scss" scoped></style>
