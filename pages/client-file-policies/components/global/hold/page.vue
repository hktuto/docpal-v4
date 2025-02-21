<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="documentName"
        />
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { clientApi } from "api";
import dayjs from "dayjs";
let extraParams = {}
const { t } = useI18n();
const {
  tableConfig,
  tableEvent,
  tableRef,
  reload,
  query,
} = useVxeTable({
  id: "clientTrashList",
  api: async (pageParams: any) => {
    return clientApi.api.postPolicyDocumentsPage({...pageParams, ...extraParams});
  },
  columns: [
    { field: "documentName",  title: "tableHeader.folderName"},
    { field: "documentPath", title: "tableHeader_path" },
    { field: "policyHoldName", title: "tableHeader_policyName" },
    { field: "applyBy", title: "tableHeader_applyBy" },
    { field: "applyApprovedBy", title: "tableHeader_approver" },
    {
      field: "applyApprovedDate",
      title: "tableHeader_confirmAt",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "position",
        name: "position",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          // trashProvider?.openUserDetail(row)
        },
      }
    ],
  ],
});


// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref();
async function getFilter() {
  const data = await clientApi.api.getPolicyDocumentsPageConditions().then(res => res.data);
  ResponsiveFilterRef.value.init(data);
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload()
}
// #endregion

onMounted(() => {
  getFilter()
})
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 200px;
}
</style>
