<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <div class="flex-x-between">
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="name"
        />
        <el-button class="el-icon--right button" type="primary" @click="handleAdd()">{{
          $t("button.add")
        }}</el-button>
      </div>
    </template>
    <template #status="{ row }">
      <el-tag v-if="row.status === 'A'" type="success">{{
        $t("actions.activated")
      }}</el-tag>
      <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
    </template>
  </VxeGrid>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { onActivated } from "vue";
import { MasterTableProviderKey } from "~/utils/masterTableProvider";
const emits = defineEmits(["filter-change"]);
const masterTableProvider = inject(MasterTableProviderKey);
const state = reactive<any>({
  loading: false,
});

const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: "masterTableTableSetting",
  api: (pageParams: any) => masterTableProvider?.GetMasterTablesPageApi(pageParams),
  columns: [
    { field: "name", title: "tableHeader_name", fixed: "left" },
    { field: "createdBy", title: "role.creator" },
    {
      field: "status",
      title: "dpTable_status",
      slots: {
        default: "status",
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "edit",
        name: "masterTable.editDetail",
        action: ({ row }: any) => {
          handleDblclick(row);
        },
      },
      {
        code: "delete",
        name: "trash_actions_delete",
        action: ({ row }: any) => {
          handleDelete(row);
        },
      },
      {
        code: "inactive",
        name: "actions.inactive",
        action: ({ row }: any) => {
          handleActive(row, "D");
        },
      },
      {
        code: "active",
        name: "actions.active",
        action: ({ row }: any) => {
          console.log("row", row);
          handleActive(row, "A");
        },
      },
    ],
  ],
  permissionMethod: (args: PermissionMethodParams) => {
    // options 是 menuConfig 中的 body 配置
    if (args.code === "active") {
      return {
        visible: args.row.status === "D",
        disabled: false,
      };
    } else if (args.code === "actions.inactive") {
      return {
        visible: args.row.status === "A",
        disabled: false,
      };
    }
    return {
      visible: true,
      disabled: false,
    };
  },
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
});
async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${$i18n.t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  const result = await masterTableProvider?.DeleteMasterTablesApi(row.id);
  if (!result) {
    ElMessage.error($i18n.t("dpTip.deleteFailed"));
    return;
  }
  query();
}
async function handleActive(row, status: "A" | "D") {
  state.loading = true;
  try {
    row.status = status;
    await masterTableProvider?.UpdateMasterTableApi({
      id: row.id,
      status,
    });
    ElMessage.success($i18n.t("dpMsg_success"));
  } catch (error) {
    row.status = row.status = "A" ? "D" : "A";
  }
  setTimeout(() => (state.loading = false), 500);
}
function handleDblclick(row: any) {
  console.log("handleDblclick", row);
  masterTableProvider?.openDetail(row);
}
function handleAdd() {
  masterTableProvider?.openNew();
}
// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref();
async function getFilter() {
  const filters = await masterTableProvider?.GetMasterTablesPageConditionApi();
  nextTick(() => {
    ResponsiveFilterRef.value.init(filters.data);
  });
}
function handleFilterFormChange(formModel: any) {
  state.extraParams = formModel;
  emits("filter-change", state.extraParams);
}
// #endregion

onMounted(() => {
  getFilter();
});
onActivated(() => {
  query();
});

defineExpose({ query, reload });
</script>

<style lang="scss" scoped>
.responsive-container {
  :deep .el-input {
    width: 200px;
  }
}
.flex-x-between {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
