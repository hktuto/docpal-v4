<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { publicApi } from "api";
import { routeDashboardDetail } from '~/utils/routerHelper';
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
let extraParams: any = {};
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "d-dashboard",
  zoom: false,
  api: (pageParams: any) =>
  publicApi.api.postUserDashboardPage({ ...pageParams, ...extraParams }),
  columns: [
    { field: "name", title: "tableHeader_name", fixed: "left" },
    {
      field: "createdDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
  ],

  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
  saveColumnOrder: false
});
function handleDblclick(row: any) {
  ElMessage.info('need navigate to dashboard detail')
  // routerProvider?.navigateTo(routeDashboardDetail(row), false)
}
async function getFilter() {
  const data = [
    { key: "orderBy", label: "tableHeader.sortBy", type: "string", isMultiple: false,
      options: [
        { label: 'table_name', value: 'name' },
        { label: 'tableHeader_access', value: 'access' },
        { label: 'filePopover_fileCreatedDate', value: 'createdDate' }
      ]
    },
    { key: "isDesc", label: "tableHeader.sortOrder", type: "string", isMultiple: false,
      options: [
        { label: 'tableHeader.desc', value: false },
        { label: 'tableHeader.asc', value: true }
      ]
    }
  ]
  ResponsiveFilterRef.value.init(data)
}
onMounted(() => {
  getFilter()
})
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
}
.responsive-container {
  width: 70%;
  :deep .el-input {
    width: 200px;
  }
}
</style>
