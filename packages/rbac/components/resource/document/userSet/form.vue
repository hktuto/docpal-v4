<script setup lang="ts">
import { adminApi } from 'api'
const formData = ref({
  condition: 'or',
  resourceRules: []
})

function setFormData(data) {
  if (!data) {
    formData.value = {
      condition: 'or',
      resourceRules: []
    }
    return
  }
  formData.value = data
}
function getFormData() {
  return formData.value.resourceRules.map((item: any) => {
    return {
      memberType: item.attribute,
      memberId: item.value[0],
      operator: item.condition === 'eq' ? 1 : 2 // 1=includes, 2=not includes
    }
  })
}
const SelectorRoleRef = ref()
const targetOptions = ref([])
const { flatRole } = useRBAC()
async function getTargetOptions() {
  async function getGroupList() {
    try {
      return await adminApi.api.postNuxeoIdentityGroups({}).then((res) => res.data)
    } catch (error) {
      console.error(error)
      return []
    }
  }
  async function getUserList() {
    try {
      return await adminApi.api.postNuxeoIdentityGetkeycloakallusers({}).then((res) => res.data)
    } catch (error) {
      console.error(error)
      return []
    }
  }
  const groupList = await getGroupList()
  const userList = await getUserList()
  targetOptions.value.push(
    {
      label: 'user_role',
      value: 3, // 1=User, 2=Group, 3=Role
      type: 'select',
      options: flatRole.value.map((item) => ({
        label: item.name,
        value: item.id
      }))
    },
    {
      label: 'user_groups',
      value: 2,
      type: 'select',
      options: groupList
        .map((item) => ({
          label: item.name,
          value: item.id
        }))
        .filter((item: any) => !item.id)
    },
    {
      label: 'user_users',
      value: 1,
      type: 'select',
      options: userList.map((item: any) => ({
        label: item.username,
        value: item.userId
      }))
    }
  )
}
// 监听filterList变化，如果filterList有数据，则filter targetOptions里的user_users，user_groups，user_role里的options
watch(props.filterList, async(newVal) => {
  console.log(newVal)
  if (newVal.length > 0) {
    const targetIds = newVal.map((item: any) => item.targetId)
    while (targetOptions.value.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    targetOptions.value = targetOptions.value.forEach((item: any) => {
      item.options = item.options.filter((option: any) => !targetIds.includes(option.value))
    })
  }
})
onMounted(async () => {
  setTimeout(() => {
    SelectorRoleRef.value.addResourceRule()
    getTargetOptions()
  }, 100)
})
defineExpose({
  setFormData,
  getFormData
})
</script>
<template>
  <FormLogicalSelector ref="SelectorRoleRef" v-model:form-data="formData" :resource-attributes="targetOptions" :is-or="true" @update:form-data="setFormData" />
</template>
