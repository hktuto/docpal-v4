<script lang="ts" setup>
import { adminApi } from 'api'

const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: 'user-list-table',
  api: (params) => {
    return adminApi.api.getAclUserUserid(params)
  },
  columns: [
    {
      field: 'id',
      title: 'ID',
      width: 80
    },
    {
      field: 'username',
      title: '用户名',
      width: 120
    },
    {
      field: 'email',
      title: '邮箱',
      width: 180
    },
    {
      field: 'roleName',
      title: '角色',
      width: 120
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 160,
      formatter: ({ cellValue }) => formatDate(cellValue)
    },
    {
      field: 'status',
      title: '状态',
      width: 100,
      formatter: ({ cellValue }) => cellValue === 1 ? '启用' : '禁用'
    }
  ],
  bodyActions: [
    [
      {
        code: 'edit',
        label: '编辑',
        action: ({ row }) => {
          // Handle edit action
        }
      },
      {
        code: 'delete',
        label: '删除',
        action: ({ row }) => {
          // Handle delete action
        }
      }
    ]
  ],
  permissionMethod: ({ options, column, row }) => {
    if (!row) {
      return { visible: false, disabled: false }
    }
    return {
      visible: true,
      disabled: false
    }
  }
})
</script>

<template>
  <div class="user-list-container">
    <VxeGrid v-bind="tableConfig" v-on="tableEvent" ref="tableRef">
      <template #toolbar_buttons>
        <div class="actionContainer">
          <ResponsiveFilter
            ref="filterRef"
            inputKey="q"
            @form-change="handleFilterFormChange"
          />
        </div>
      </template>
    </VxeGrid>
  </div>
</template>

<style lang="scss" scoped>
.user-list-container {
  height: 100%;
  padding: var(--app-space-s);
}

.actionContainer {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  container-type: inline-size;
}
</style>

