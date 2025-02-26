<script lang="ts" setup>
import { clientApi } from "api";
import dayjs from "dayjs";
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
      field: "created_date",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "modified_date",
      title: "table_modifiedDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
  ],
  dblClickAction: ({ row }) => {
    routerProvider?.navigateTo(
      caseManageDetailPage({
        name: row.name,
        id: row.id,
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
