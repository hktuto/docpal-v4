<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <ResponsiveFilter
        ref="ResponsiveFilterRef"
        @form-change="handleFilterFormChange"
        inputKey="documentName"
      />
    </template>
  </VxeGrid>
</template>
<script lang="ts" setup>
import { clientApi } from "api";
import dayjs from "dayjs";
import { MenuRouterKey } from "#imports";
const routerProvider = inject(MenuRouterKey);
let extraParams = {};
let doneParams = {
  orderBy: "createdDate",
  isDesc: true,
  states: ["A"],
};

const { t } = useI18n();
const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: "c-retention-done",
  api: async (pageParams: any) => {
    return clientApi.api.postPolicyRetentionsDocumentPage({
      ...doneParams,
      ...pageParams,
      ...extraParams,
    });
  },
  columns: [
    {
      field: "documentName",
      title: "tableHeader_name",
      type: "html",
      formatter: ({ cellValue, row }: any) => {
        let icon = "/icons/doc/file.svg";
        return `<span class="tableRow-icon-cell"><img src="${icon}" /> ${cellValue}</span>`;
      },
    },
    { field: "documentPath", title: "tableHeader_path" },
    { field: "policyName", title: "tableHeader_policyName" },
    { field: "approver", title: "tableHeader_approver", 
      formatter({ cellValue }: any) {
        if(!cellValue) return t('System')
        else return  cellValue
      }  
    },
    {
      field: "confirmAt",
      title: "tableHeader_confirmAt",
      formatter({ cellValue, row }: any) {
        const format = userDisplayTimeSetting();
        const date = row.applyApprovedDate ? row.applyApprovedDate : row.modifiedDate
        return dayjs(date).format(format);
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "preview",
        name: "common_preview",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row);
        },
      },
    ],
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
});

// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref();
async function getFilter() {
  const data = await clientApi.api
    .getPolicyRetentionsDocumentPageConditions()
    .then((res) => res.data);
  ResponsiveFilterRef.value.init(data);
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}
// #endregion
function handleDblclick(row: any) {
  routerProvider?.navigateTo(createDetailPageParams({
    docName: row.documentName,
    idOrPath: row.documentId,
    showHeaderAction: false
  }), false);
}
onMounted(() => {
  getFilter();
  // clientApi.api.getPolicyRetentionsPolicyidScanDocument(414105)

  // clientApi.api.getPolicyRetentionsPolicyidScanExpired(414105);
});
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 200px;
}
</style>
