<template>
  <el-card class="viewer">
    <template #header>
      <div class="card-header">
        <span>Case Dasboard View</span>
      </div>
    </template>
    <div style="height: 100%">
      <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
          <div class="actions">
            <ResponsiveFilter
              ref="ResponsiveFilterRef"
              @form-change="handleFilterFormChange"
              inputKey="q"
            />
            <el-button type="primary" @click="handleAdd()">{{
              $t("button.add")
            }}</el-button>
          </div>
        </template>
      </VxeGrid>

      <CaseManagementDetailDashboardDialog
        ref="dialogRef"
        v-bind="props"
        @refresh="reload"
      />
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { adminApi } from "api";

import dayjs from "dayjs";

const routerProvider = inject(MenuRouterKey);

const props = defineProps<{
  caseDetail: any;
  caseTypeId: string;
  name: string;
  currentVersion: string;
  caseDetailId: string;
}>();
const pageParams = {
  pageNum: 0,
  pageSize: 20,
  orderBy: "createdDate",
  isDesc: true,
};
const { t } = useI18n();
const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id: "case-dashboard-table",
  api: async (params: any) => {
    if (!params.orderBy) {
      params.orderBy = "createdDate";
      params.isDesc = false;
    }
    if (props.currentVersion) params.versionNumber = props.currentVersion;
    if (props.caseDetailId) params.caseTypeId = props.caseDetailId;
    return await adminApi.api.postCaseDashboardPage({ ...params, ...state.extraParams });
  },
  remoteSort: true,
  defaultSort: [
    {
      field: "createdDate",
      order: "desc",
    },
  ],
  columns: [
    {
      field: "label",
      title: "table_name",
      fixed: "left",
    },
    {
      field: "createdDate",
      title: "workflow_createDate",
      sortable: true,
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
    {
      field: "userGroup",
      title: "caseManagement.userGroup",
    },
    // {
    //   field: "status",
    //   title: "dpTable_status",
    //   formatter({ cellValue }: any) {
    //     return cellValue === "A" ? t("actions.activated") : t("actions.inactive");
    //   },
    // },
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
  bodyActions: [
    [
      {
        code: "edit",
        name: "workflowEditor.editInfo",
        action: ({ row }) => {
          handleAdd(row);
        },
      },
      {
        code: "edit",
        name: "caseManage.editLayout",
        action: ({ row }) => {
          handleDblclick(row);
        },
      },
      {
        code: "delete",
        name: "common_delete",
        action: ({ row }) => {
          handleDelete(row);
        },
      },
    ],
  ],
});
// const tableSetting = {
//   columns: [
//     { id: '1', label: 'table_name', prop: 'label', defaultColumn: true },
//     { id: '2', label: 'workflow_createDate', prop: 'createdDate', width: 200,
//         formatList: [ datesFormat('createdDate') ]
//     },
//     { id: '3', label: 'table_modifiedDate', prop: 'modifiedDate', width: 200,
//         formatList: [ datesFormat('modifiedDate') ]
//     },
//     { id: '4', label: 'caseManagement.userGroup', prop: 'userGroup'  },
//     { id: '5', label: 'dpTable_status', prop: 'publishStatus', slot: 'publishStatus', width: 120 },
//     { id: '6', type: "", label: "dpTable_actions", slot: 'dpTable_actions', width: 80 }
//   ],
//   events: ['delete'],
//   slots: [
//   ],
//   options: { pageSize: 20 }
// }
const state = reactive<State>({
  loading: false,
  tableData: [],
  options: {
    showPagination: true,
    paginationConfig: {
      total: 0,
      currentPage: 1,
      pageSize: pageParams.pageSize,
    },
    rowKey: "id",
  },
  extraParams: {},
});

async function handleDblclick(row) {
  const newItem = newCaseDashboardLink(row);
  console.log("newItem", newItem);
  routerProvider?.navigateTo(newItem);
}
async function handleDelete(row) {
  const action = await ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  try {
    state.loading = true;
    await adminApi.api.deleteCaseDashboardId(row.id);
    reload()
    // await deleteCaseDashboardApi(row.id)
  } catch (error) {
    
  } finally {
    state.loading = false;
  }
}
const dialogRef = ref();
function handleAdd(setting: any = null) {
    console.log(dialogRef.value);
    dialogRef.value.handleOpen(setting);
    reload();
}
function handleFilterFormChange(formModel) {
  state.extraParams = formModel;
  reload();
}
onMounted(() => {
  reload();
});
</script>
<style lang="scss" scoped>
:deep .el-card__body {
  height: 70vh;
}
.responsive-container {
  margin-bottom: 10px;
}
.actions {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-xs);
}
</style>
