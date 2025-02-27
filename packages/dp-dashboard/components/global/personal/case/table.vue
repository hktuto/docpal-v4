<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent"> </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { clientApi } from "api";
import dayjs from "dayjs";
import { watch } from "vue";
const routerProvider = inject(MenuRouterKey);
const { t } = useI18n();
const {
  public: { endPoint },
} = useRuntimeConfig();
let extraParams: any = {};
let caseId = "";
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "d-case",
  zoom: false,
  api: (pageParams: any) => getData(pageParams),
  columns: [
    { field: "case_id", title: "caseManagement.name", fixed: "left" },
    {
      field: "modified_date",
      title: "table_modifiedDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
  saveColumnOrder: false,
});
async function getData(
  params: any = {
    pageNum: 0,
    pageSize: 20,
  }
) {
  try {
    if (!caseId) {
      throw new Error("caseId is null");
    }
    if (endPoint === "admin") return;
    const res = await clientApi.api
      .postCaseTypesCasetypeidRecordsPage(caseId, { ...params, ...extraParams })
      .then((res) => res.data);
    return {
      data: {
        entryList: res?.entryList,
        totalSize: res?.totalSize,
      },
    };
  } catch (error) {
    return {
      data: {
        entryList: [],
        totalSize: 0,
      },
    };
  }
}
function handleDblclick(row: any) {
  ElMessage.info("Need to add routing jump event");
  // routerProvider?.navigateTo(routeDashboardDetail(row), false)
}
async function setCaseId(id: string) {
  caseId = id;
  reload();
}

defineExpose({
  setCaseId,
});
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
