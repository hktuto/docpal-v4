<template>
  <div class="user-table">
    <div class="user-table-header">
      <h4>{{ $t('orgChart.userTable.title') }}</h4>
    </div>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <div class="actionsContainer">

          <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange" inputKey="q" />
          <el-button type="primary" @click="showAddUserDialog = true">{{ $t('orgChart.userTable.addUserButton') }}</el-button>
        </div>
      </template>
    </VxeGrid>

    <AddUserDialog
      v-model="showAddUserDialog"
      :roleId="roleId"
      @confirm="handleAddUsers"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { adminApi } from 'api'
import AddUserDialog from './AddUserDialog.vue'

const { t } = useI18n()

const props = defineProps<{
  roleId: string
  isAdd: boolean
}>()

const showAddUserDialog = ref(false)
const emit = defineEmits<{
  (e: 'update', users: any[]): void
}>()

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
    if(searchConditions.value.length > 0){
      conditions.push(...searchConditions.value)
    }
    const data = await adminApi.api.postAclRoleUsersPage({
      ...pageParams,
      conditions
    })
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

const searchConditions = ref<any[]>([])
const handleFilterFormChange = (form: any) => {
  if(form.q){
    searchConditions.value = [
      {
        column: 'userName',
        type: 'EQ',
        values: form.q
      }
    ]
  }else{
    searchConditions.value = []
  }

}

const debounceFiler = useDebounceFn(() => {
  reload()
}, 300)
watch(searchConditions, (newVal) => {
  debounceFiler()
})

async function handleAddUsers(userIds: string[]) {
  try {
    await adminApi.api.postAclRoleUsers({
      roleId: props.roleId,
      userIds
    })
    reload()
  } catch (error) {
    console.error('Failed to add users to role:', error)
  }
}

const handleRemoveUser = async (user: any) => {
  try {
    await adminApi.api.deleteAclRoleUsers([user.id])
    emit('update', [])
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
.actionsContainer{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--app-space-s);
}
</style> 
