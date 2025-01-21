<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="label"
          @form-change="handleFilterFormChange"
        />
        <el-button data-testid="folderCabinetConfig-new-button" type="primary" @click="handleInfo()">{{
              $t("folderCabinet.add")
            }}</el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
    <FolderCabinetSettingAddDialog ref="FolderCabinetSettingAddDialogRef" @update="handleUpdateOrCreate" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { adminApi } from "api";
import { routeFolderCabinetDetail } from "~/utils/routerHelper";
const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const { t } = useI18n();
let extraParams: any = {};

function handleUpdateOrCreate({ edit, response }: any) {
  if(!edit) {
    console.log("handleUpdateOrCreate", response)
    routerProvider?.navigateTo(routeFolderCabinetDetail(response), false);
  }else{
    reload()
  }

}


const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "userTableSetting",
  api: (pageParams: any) =>
    adminApi.api.postCabinetTemplatePage({ ...pageParams, ...extraParams }),
  columns: [
    { field: "label", title: "folderCabinet.name", fixed: "left" },
    {
      field: "documentType",
      title: "docType_documentType",
      formatter({ cellValue }: any) {
        return t(`${cellValue}`);
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "edit_easyForm",
        name: t("common_edit"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row);
        },
      },
      {
        code: "config",
        name: t("common_config"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleInfo(row);
        },
      },
      {
        code: "delete",
        name: t("common_delete"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDelete(row);
        },
      },
    ],
  ],
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
});

function handleDblclick(row) {
  // router.push(`/easyFormManage/${row.id}`);
  routerProvider?.navigateTo(routeFolderCabinetDetail(row), false);
}
const FolderCabinetSettingAddDialogRef = ref();
function handleInfo(row?: any) {
  FolderCabinetSettingAddDialogRef.value.handleOpen(row);
}
async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  try {
    const result = await adminApi.api.deleteCabinetId(row.id).then((res) => res.data);
    query();
  } catch (error) {}
}


function handleFilterFormChange(formModel: any) {
  if (!formModel.isDesc) formModel.isDesc = true;
  if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc === "false" ? false : true;
  let filterParams: any = {
    label: formModel.label === "" ? undefined : formModel.label,
    orderBy:
      formModel.orderBy === undefined || formModel.orderBy === ""
        ? "createdDate"
        : formModel.orderBy,
  };
  filterParams.isDesc = formModel.isDesc;
  extraParams = filterParams;
  reload();
}
const ResponsiveFilterRef = ref();
async function initFilter() {
  try {
    const data = [
      {
        key: "orderBy",
        label: "tableHeader.sortBy",
        type: "string",
        isMultiple: false,
        options: [
          { label: "folderCabinet.name", value: "label" },
          { label: "docType_documentType", value: "documentType" },
        ],
      },
      {
        key: "isDesc",
        label: "tableHeader.sortOrder",
        type: "string",
        isMultiple: false,
        options: [
          { label: "tableHeader.desc", value: false },
          { label: "tableHeader.asc", value: true },
        ],
      },
    ];
    ResponsiveFilterRef.value.init(data);
  } catch (error) {}
}
onMounted(() => {
  initFilter();
});
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  width: 100%;
  justify-content: space-between;
  .responsive-container {
    width: 70%;
  }
}
:deep .el-input {
  width: 200px;
}
</style>
