<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #duration="{ row, index }">
        {{ formatDate(row.created) }} ~ {{ formatDate(row.expiredDate) }}
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { clientApi } from "api";
import dayjs from "dayjs";
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
  id: "userTableSetting",
  api: (pageParams: any) => getData(pageParams),
  columns: [
    { field: "emailList", title: "tableHeader_emailList", fixed: "left" },
    { field: "documentSize", title: "tableHeader_numberOfFiles" },
    { field: "expiredDate",title: "search.duration", slots:{
      default:'duration',
    }},
    { field: "expiredDate", title: "tableHeader_dueDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      }
    },
  ],
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
  saveColumnOrder: false
});
async function getData(params: any = {}) {
  if(endPoint === 'admin') return
  const res = await clientApi.api.postNuxeoSharePage({ ...params, ...extraParams }).then(res => res.data)
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
  width: fit-content;
  :deep .el-input {
    width: 200px;
  }
}
</style>
 