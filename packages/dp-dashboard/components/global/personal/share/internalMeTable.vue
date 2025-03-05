<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { clientApi } from "api";
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const {
  public: { endPoint },
} = useRuntimeConfig();
let extraParams: any = {
};
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "d-internalShare",
  zoom: false,
  api: (pageParams: any) => getData(pageParams),
  columns: [
    { field: "documentNames", title: "tableHeader.fileOrFolderName", fixed: "left" },
    { field: "createdUserId", title: "tableHeader_shareBy" },
  ],
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
  saveColumnOrder: false
});
async function getData(params: any = {}) {
  if(endPoint === 'admin') return
  const res = await clientApi.api.postInternalshareMe({ ...params, ...extraParams }).then(res => res.data)
  return {
    data: {
      entryList: res?.entryList,
      totalSize: res?.totalSize
    }
  }
}
function handleDblclick(row: any) {
  ElMessage.info('Need to add routing jump event')
  // routerProvider?.navigateTo(routeDashboardDetail(row), false)
}
onMounted(() => {
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
 