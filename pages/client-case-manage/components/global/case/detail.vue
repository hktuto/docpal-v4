<script lang="ts" setup>
import { clientApi } from "api";
const { id, name, data} = defineProps<{
  id: string;
  name: string;
  data: string
}>();

const { t } = useI18n();
const emits = defineEmits(["filter-change", "refresh"]);
const routerProvider = inject(MenuRouterKey);
type TableState = {
  columns: any;
  where: any[];
};
const state = reactive<TableState>({
  columns: [],
  where: {},
});
const tableReady = ref(false);
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "clientCaseTableList",
  api: async (pageParams: any) => {
    pageParams.isDesc = true;
    pageParams.orderBy = "created_date";

    if (Object.entries(state.where).length !== 0) {
      if (state.where.q) {
        pageParams.q = state.where.q;
      }
      delete state.where.q;
      pageParams.where = state.where;
    }
    return clientApi.api.postCaseTypesCasetypeidRecordsPage(id, pageParams);
  },
  defaultSort: {},
  optionalConfig: {
    tooltipConfig: {
    },
  },
  dblClickAction: ({ row }) => {
    const item = caseManageDashboardPage({ ...row, id, instanceId: row.case_id, versionId: row.caseDefinitionVersionId, data })
    console.log('new page', item)
    routerProvider?.navigateTo(item);
  },
});

const responsiveFilter = ref();

async function initCondition() {
  try {
    const { data } = await clientApi.api.getCaseTypesCasetypeidRecordsPageConditions(id);
    responsiveFilter.value.init(data);
  } catch (error) {}
}

function handleFilterFormChange(formModel) {
  state.where = formModel;
  reload();
}

async function reorderColumn() {
  try {
    const {
      data: { fields },
    } = await clientApi.api.getCaseDashboardCasetypeCasetypeidPrimaryform(id);
    const columns = [
      { field: "case_id", title: "caseManagement.name", width:200 },
      {
        field: "created_date",
        title: "workflow_createDate", width:200,
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        },
      },
      {
        field: "modified_date",
        title: "table_modifiedDate", width:200,
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        },
      },
    ];
    fields.forEach((row) => {
      columns.splice(1, 0, { field: row.id, title: row.name, width: 200 });
    });
    const actionColumn = tableConfig.columns.find(
      (item) => item.title === "dpTable_actions"
    );
    if (!!actionColumn) columns.push(actionColumn);
    tableConfig.columns = columns;
  } catch (e) {}
  tableReady.value = true;
}

const addCaseDialog = ref();

function handleAddCaseDialog() {
  addCaseDialog.value.handleOpen(id, data);
}

onActivated(() => {
  reorderColumn();
  initCondition();
});
</script>

<template>
  <div class="pageContainer--padding">
    <VxeGrid v-if="tableReady" ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <header class="header-flex">
          <ResponsiveFilter
            ref="responsiveFilter"
            @form-change="handleFilterFormChange"
            inputKey="q"
            :inputPlaceHolder="t('tip.filterByName')"
          />
          <div class="flex-x-end">
            <el-button type="primary" @click="handleAddCaseDialog">
              {{ $t("common_add") }}
            </el-button>
          </div>
        </header>
      </template>
    </VxeGrid>
  </div>
  <LazyCaseAddCaseDialog ref="addCaseDialog" @refresh="reload"></LazyCaseAddCaseDialog>
</template>

<style lang="scss" scoped>
.header-flex {
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: var(--app-space-xs);
  padding: var(--app-space-xs);
  background: var(--el-color-primary-light-9);
}

.flex-x-end {
  display: flex;
  justify-content: end;
}

:deep(.el-input) {
  width: 200px;
}
</style>
