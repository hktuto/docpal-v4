<script lang="ts" setup>
import { ref, watch } from 'vue'
import { adminApi } from 'api'
import { useVxeTable } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import {ResponsiveFilter} from '#components'


// default search value
const searchQuery = ref({
  sort_by: "updateTime",
  sort_type: "DESC"
})
const ResponsiveFilterRef = ref()

// Define table actions
const bodyActions: TableMenuActions[][] = [
  [
    {
      code: 'edit',
      name: 'Edit',
      action: ({ row }) => {
        // Handle edit action
        console.log('Edit role:', row)
      }
    },
    {
      code: 'delete',
      name: 'Delete',
      action: ({ row }) => {
        // Handle delete action
        console.log('Delete role:', row)
      }
    }
  ]
]

const { 
  tableConfig,
  tableEvent,
  tableRef,
  reload,
  query
} = useVxeTable({
  id: 'admin-role-table',
  api: (pageParams: any) => {
    const defaultCondition = {
      column: 'type',
      type: "EQ",
      values: "1"
    }
    const conditions = [defaultCondition]

    // Add search condition if exists
    if (searchQuery.value?.q) {
      conditions.push({
        column: 'name',
        type: "LIKE",
        values: searchQuery.value.q
      })
    }

    // Add status filter if selected
    if (searchQuery.value?.status) {
      conditions.push({
        column: 'status',
        type: "EQ",
        values: searchQuery.value.status
      })
    }

    // Add parent role filter if selected
    if (searchQuery.value?.parentRoleName) {
      conditions.push({
          column: 'parentRoleName',
          type: "EQ",
          values: searchQuery.value.parentRoleName
        })
    }

    // Add sort by filter if selected
    if (searchQuery.value?.sort_by) {
      conditions.push({
        column: searchQuery.value.sort_by,
        type: searchQuery.value.sort_type === "ASC" ? "ORDER_BY_ASC" : "ORDER_BY_DESC",
        values: ""
      })
    }

    return adminApi.api.postAclRolePage({...pageParams, conditions})
  },
  columns: [
    {
      field: 'name',
      title: 'Name'
    },
    {
      field: 'parentRoleName',
      title: 'Parent'
    },
    {
      field: 'status',
      title: 'Status',
      formatter: ({ cellValue }) => {
        return cellValue === 1 ? 'Active' : 'Inactive'
      }
    },
    {
      field: 'updateTime',
      title: 'Modify Date',
      formatter: ({ cellValue }) => {
        return formatDate(cellValue)
      }
    }
  ],
  bodyActions,
  saveColumnOrder: true,
  zoom: true,
  refresh: true,
  remoteSort: true,
  remoteFilter: true,
  permissionMethod: ({ row, code }) => {
    // Implement permission logic here
    return {
      visible: true,
      disabled: false
    }
  }
})


async function initFilter() {
  ResponsiveFilterRef.value.init([
    {
      label: "Status",
      key: "status",
      isMultiple: false,
      options: [
        {
          label: "Active",
          value: 1
        },
        {
          label: "Inactive",
          value: 3
        }
      ]
    },
    {
      label: "Parent Role",
      key: "parentRoleName",
      isMultiple: false,
      options: [
        {
          label: "CEO",
          value: "CEO"
        },
        {
          label: "CTO",
          value: "CTO"
        }
      ]
    },
    {
      label:"sort_by",
      key: "sort_by",
      isMultiple: false,
      value: ["updateTime"],
      options: [
        {
          label: "Name",
          value: "name"
        },
        {
          label: "Modify Date",
          value: "updateTime"
        },
        {
          label: "Parent",
          value: "parentRoleName"
        },
        {
          label: "Status",
          value: "status"
        }
      ]
    },
    {
      label:"sort_type",
      key: "sort_type",
      isMultiple: false,
      value: ["DESC"],
      options: [
        {
          label: "Asc",
          value: "ASC",
        },
        {
          label: "Desc",
          value: "DESC",
        }
      ]
    }
  ])
}

function handleFilterFormChange(form: any) {
  searchQuery.value = form
  debouncedReload()
}

// Create debounced reload function
const debouncedReload = useDebounceFn(() => {
  reload()
}, 300)

onMounted(async () => {
  await initFilter()
})

function handleAddRole() {
  console.log("add role")
}
</script>

<template>
  <div class="role-table-container">
    <vxe-grid
      ref="tableRef"
      v-bind="tableConfig"
      v-on="tableEvent"
    >
      <template #toolbar_buttons>
        <div class="tableActions">

          <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange" inputKey="q" />
          <ElButton type="primary" @click="handleAddRole">Add Role</ElButton>
        </div>
      </template>
    </vxe-grid>
  </div>
</template>

<style scoped>
.role-table-container{
   width: 100%;
   height: 100%;
   position: relative;
   overflow: hidden;
}

.search-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  width: 300px;
}
.tableActions{
  display: flex;
  gap: var(--app-space-s);
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  container-type: inline-size;
}
</style>
