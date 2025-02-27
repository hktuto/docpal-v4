<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="name"
          @form-change="handleFilterFormChange"
        />
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { publicApi } from "api";
import dayjs from "dayjs";
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
  id: "d-azure",
  zoom: false,
  api: (pageParams: any) =>
  publicApi.api.postOcrQueryOcrTransactionLogs({ ...pageParams, ...extraParams }),
  columns: [
    { field: "businessName", title: "dpTableHeader.businessName", fixed: "left" },
    { field: "workflow", title: "azureDashboard.workflow" },
    { field: "state", title: "tableHeader_status" },
    { field: "scanType", title: "azureDashboard.scanType" },
    { field: "ocrProfileName", title: "azure.ocrProfileName" },
    { field: "ocrPageCount", title: "azure.ocrPages" },
    { field: "fieldCount", title: "azure.fieldCount" },
    {
      field: "createDate",
      title: "dpTable_createdDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "modifiedDate",
      title: "table_modifiedDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
  ]
});
const ResponsiveFilterRef = ref()
async function getFilter() {
  const data = await publicApi.api.getOcrConditions().then(res => res.data)
  ResponsiveFilterRef.value.init(data)
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}
onMounted(() => {
  getFilter()
})
</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
</style>
