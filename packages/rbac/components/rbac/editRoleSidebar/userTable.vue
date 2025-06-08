<template>
  <div class="user-table">
    <div class="user-table-header">
      <h4>{{ $t('orgChart.userTable.title') }}</h4>
    </div>
    <div class="user-header">
      <el-select-v2 v-model="selectedUser" :options="users" :placeholder="$t('orgChart.userTable.addUser')" filterable class="filter-input" />
      <el-button type="primary" :disabled="!selectedUser" @click="handleAddUser">{{ $t('orgChart.userTable.addUserButton') }}</el-button>
    </div>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        </template>
    </VxeGrid>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { adminApi } from 'api'

const { t } = useI18n()

const props = defineProps<{
  roleId: string
  isAdd: boolean
}>()
const selectedUser = ref()
const emit = defineEmits<{
  (e: 'update', users: any[]): void
}>()

const users = ref<any[]>([])

onMounted(async () => {
  try{
   // TODO : sometime it return 500
    const data = await adminApi.api.getAclRoleUsersDropdown({
      query: {
        roleId: props.roleId
      }
    }).then(res => res.data)
    users.value = data.map((item: any) => ({
      label: item.username,
      value: item.id
    }))
  }catch(error){
    console.error('Failed to fetch role users:', error)
  }
})

const { tableConfig, tableEvent, tableRef, query, reload } = useVxeTable({
  id: 'role-users',
  api: async (pageParams: any) => {
    
    const conditions = [
      {
        column: 'acRoleId',
        type: 'EQ',
        values: props.roleId
      }
    ]
    // TODO: api,这里需要替换为实际的用户查询API，royhoo已经在做了，6月4号可以催一下
    // 更新： No API request part of from queryString, need to change later
    const data = await adminApi.api.postAclRoleUsersPage({
      ...pageParams,
      conditions
      })
    .catch((err) => {
      throw new Error('Failed to get role users: ' + err)
    })
    // userTotalSize.value = data.data.totalSize
    return data
  },
  virtualScroll: props.isAdd,
  columns: [
    { field: 'userName', title: t('orgChart.userTable.columns.username'), width: 120 },
    {
      field: 'email',
      title: t('orgChart.userTable.columns.email'),
    }
  ],
  bodyActions: [
    [
      {
        code: 'remove_user',
        name: t('orgChart.userTable.actions.remove'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleRemoveUser(row)
        }
      }
    ]
  ]
})

async function handleAddUser() {
  // TODO: Implement user selection dialog
await adminApi.api.postAclRoleUsers({
    roleId: props.roleId,
    userIds: [selectedUser.value]
  })
    reload()
}

const handleRemoveUser = async (user: any) => {
  try {
    await adminApi.api.deleteAclRoleUsers([user.id])
    users.value = users.value.filter(u => u.id !== user.id)
    emit('update', users.value)
    reload()
  } catch (error) {
    console.error('Failed to remove user from role:', error)
  }
}
</script>

<style scoped>
.user-table {
  margin-top: 2rem;
  height: 600px;
}

.user-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.user-table-header h4 {
  margin: 0;
}
</style> 
