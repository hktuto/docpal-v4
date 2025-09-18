<template>
  <FormRenderer ref="FormRendererRef" :form-json="formJson" @form-change="handleFormChange"> </FormRenderer>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { globalApi } from 'api'
import formJson from './permission.vform.json'
const { t } = useI18n()
const emits = defineEmits(['refresh', 'vFormChange'])

const FormRendererRef = ref()

async function getFormData() {
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
}
function getPermissionData(values: any, options?: any) {
  if (!options) {
    const permissionRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('permissions')
    options = permissionRef.getOptionItems()
  }
  if (!values) return {}
  const result = {
    users: [],
    groups: [],
    roles: []
  }
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
function getPermissionType(value: any) {
  const permissionRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('permissions')
  const options = permissionRef.getOptionItems()
  const userList = options.find((item: any) => item.value === 'user_users')?.options
  const groupList = options.find((item: any) => item.value === 'user_groups')?.options
  const roleList = options.find((item: any) => item.value === 'user_roles')?.options
  if (userList.some((item: any) => item.value === value)) {
    return 'user'
  } else if (groupList.some((item: any) => item.value === value)) {
    return 'group'
  } else if (roleList.some((item: any) => item.value === value)) {
    return 'role'
  }
}
function setFormData(data: any) {
  const params = {
    name: data.name,
    read: data.permissions.Read?.map((item: any) => item.value) || [],
    create: data.permissions.Create?.map((item: any) => item.value) || [],
    delete: data.permissions.Delete?.map((item: any) => item.value) || [],
    manage: data.permissions.Manage?.map((item: any) => item.value) || [],
    edit: data.permissions.Edit?.map((item: any) => item.value) || []
  }
  FormRendererRef.value.vFormRenderRef.setFormData(params)
}
function setFieldValue(fieldName: string, data: any) {
  const widgetRef = FormRendererRef.value.vFormRenderRef.getWidgetRef(fieldName)
  if (!widgetRef) return
  widgetRef.setValue(data)
}
function handleFormChange({ fieldName, newValue, oldValue, formModel }: any) {
  emits('vFormChange', { fieldName, newValue, oldValue, formModel })
}
defineExpose({ getFormData, setFormData, getPermissionType, setFieldValue })
</script>
<style lang="scss" scoped></style>
