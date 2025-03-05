<script lang="ts" setup>
import { clientApi } from "api";
import { caseManageDetailPage } from "~/utils/routerHelper";

const { t } = useI18n();
const routerProvider = inject(MenuRouterKey);
const keyword = ref();
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "clientCaseList",
  api: async (pageParams: any) => {
    if (keyword.value) {
      pageParams.name = keyword.value;
    }
    return clientApi.api.postCaseTypesPage(pageParams);
  },
  columns: [
    { field: "name", title: "search.name" },
    {
      field: "createdDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
    {
      field: "modifiedDate",
      title: "table_modifiedDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
  ],
  dblClickAction: ({ row }) => {
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
</script>

<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <el-input
          v-model="keyword"
          style="width: 200px"
          :placeholder="t('tip.filterByName')"
          clearable
          @input="reload"
        />
      </template>
    </VxeGrid>
  </div>
</template>

<style lang="scss" scoped></style>
