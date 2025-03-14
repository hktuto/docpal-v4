<script lang="ts" setup>
import {clientApi} from "api";
import {caseManageDetailPage} from "~/utils/routerHelper";

const {t} = useI18n();
const routerProvider = inject(MenuRouterKey);
const keyword = ref();
const ResponsiveFilterRef = ref()

let extraParams: any = {};

const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "clientCaseList",
  api: async (pageParams: any) =>
    clientApi.api.postCaseTypesPage({...pageParams, ...extraParams}),
  columns: [
    {field: "name", title: "caseManagement.name"},
    {
      field: "createdDate",
      title: "workflow_createDate",
      formatter({cellValue}: any) {
        return formatDate(cellValue)
      },
    },
    {
      field: "modifiedDate",
      title: "table_modifiedDate",
      formatter({cellValue}: any) {
        return formatDate(cellValue)
      },
    },
  ],
  dblClickAction: ({row}) => {
    console.log("dblClickAction", row)
    routerProvider?.navigateTo(
      caseManageDetailPage({
        name: row.name,
        id: row.id,
        data: row
      })
    );
  },
});

function handleFilterFormChange(formData: any) {
  extraParams = formData;
  reload()
}

</script>

<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="responsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="name"
          inputPlaceHolder="caseManagement_filter"
        />
      </template>
    </VxeGrid>
  </div>
</template>

<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}

</style>
