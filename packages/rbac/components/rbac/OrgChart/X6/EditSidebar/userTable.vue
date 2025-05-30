<template>
  <div class="user-section">
    <h4>{{ $t('orgChart.userTable.title') }}</h4>
    <div class="user-header">
      <el-select-v2 v-model="selectedUser" :options="userList" :placeholder="$t('orgChart.userTable.filterPlaceholder')" filterable class="filter-input" @change="handleFilter" />
      <el-button type="primary" @click="handleAddUser" :disabled="userTotalSize !== 0 || !selectedUser">{{ $t('orgChart.userTable.addUserButton') }}</el-button>
    </div>

    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent"> </VxeGrid>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { clientApi } from 'api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  roleId?: string
  isAdd?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:users', users: any[]): void
}>()

const selectedUser = ref('')
const userTotalSize = ref(0)
const userList = ref<any[]>([])
const addTableData = ref<any[]>([])
// 用户表格配置
const { tableConfig, tableEvent, tableRef, query, reload } = useVxeTable({
  id: 'role-users',
  api: async (pageParams: any) => {
    if (props.isAdd) {
      return addTableData.value
    }
    const extraParams = {
      userName: selectedUser.value,
      roleId: props.roleId
    }
    // TODO: api,这里需要替换为实际的用户查询API
    const data = await Promise.resolve({
      data: {
        entryList: [
        ],
        totalSize: 0
      }
    })
    userTotalSize.value = data.data.totalSize
    return data
  },
  virtualScroll: props.isAdd,
  columns: [
    { field: 'username', title: t('orgChart.userTable.columns.username'), width: 120 },
    {
      field: 'email',
      title: t('orgChart.userTable.columns.email'),
      slots: {
        default: 'email'
      }
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
const handleFilter = (query: string) => {
  reload()
}
const handleAddUser = () => {
  if (props.isAdd) {
    addTableData.value.push({
      username: selectedUser.value,
      email: ''
    })
    userList.value = userList.value.filter((item) => item.value !== selectedUser.value)
    emit('update:users', addTableData.value)
    
  } else {
    // TODO: api,实现添加用户的逻辑
  }
  selectedUser.value = ''

}
const sortUserList = () => {
  userList.value = userList.value.sort((a, b) => a.label.localeCompare(b.label))
}
const handleRemoveUser = (row: any) => {
  if (props.isAdd) {
    addTableData.value = addTableData.value.filter((item) => item.username !== row.username)
    userList.value.push({
      label: row.username,
      value: row.username
    })
    emit('update:users', addTableData.value)
    sortUserList()
    reload()
  } else {
    // TODO: api,实现移除用户的逻辑
  }
}
onMounted(async () => {
  const userdata = await clientApi.api.postNuxeoIdentityUsers().then((res) => res.data)
  userList.value = userdata.map((item: any) => ({
    label: item.username,
    value: item.username
  }))
  sortUserList()
})
// 监听roleId变化，重新加载用户数据
watch(
  () => props.roleId,
  (newVal) => {
    if (newVal) {
      reload()
    }
  }
)
</script>

<style scoped>
.user-section {
  height: 600px;
  margin-top: 1.2rem;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  .el-input {
    flex: 1;
  }
}
:deep(.vxe-toolbar) {
  display: none;
}
</style>
