<template>
  <div style="height: 100%;overflow: hidden">
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <ResponsiveFilter
        ref="ResponsiveFilterRef"
        inputKey="label"
        @form-change="handleFilterFormChange"
      />
      <el-button
        data-testid="folderCabinetConfig-new-button"
        type="primary"
        @click="handleAdd()"
        >{{ $t("folderCabinet.newItem") }}</el-button
      >
    </template>
    <template #status="{ row, index }">
      <SvgIcon :src="`/icons/file/status-${row.state}.svg`"></SvgIcon>
    </template>
  </VxeGrid>
</div>
    <FolderCabinetCreateDialog ref="CreateDialogRef" @refresh="query({})"/>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import type { VxeGridPropTypes  } from 'vxe-table'

import { ElMessageBox } from "element-plus";
import { clientApi } from "api";
const props = defineProps(["id", "detail"]);
const emits = defineEmits(['row-click'])
const { t } = useI18n();
let extraParams: any = {};
const basicColumns:VxeGridPropTypes.Columns = [
  {
    field: "status",
    title: "tableHeader_status",
    fixed: "left",
    slots: { default: "status" },
    width: 65,
  },
  { field: "label", title: "tableHeader_name" },
  { field: "createdBy", title: "role.creator" },
  {
    field: "modifiedDate",
    title: "tableHeader_modifiedDate",
    formatter({ cellValue }: any) {
      const format = userDisplayTimeSetting();
      return dayjs(cellValue).format(format);
    },
  },
  {
    field: "deadline",
    title: "tableHeader.deadline",
    formatter({ cellValue }: any) {
      const format = userDisplayTimeSetting();
      return dayjs(cellValue).format(format);
    },
  },
  {
    field: "documentType",
    title: "tableHeader_type",
    formatter({ cellValue }: any) {
      return t(cellValue);
    },
  },
];
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "fcc",
  api: async (pageParams: any) => {
    if (!props.id)
      return {
        data: {
          entryList: [],
          totalSize: 0,
        },
      };
    initFilter(props.id);
    return await clientApi.api.postCabinetPage({
      ...pageParams,
      ...extraParams,
      templateId: props.id,
    });
  },
  columns: [...basicColumns],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
});

function handleDblclick(row: any) {
  emits("row-click", row)
  // routerProvider?.navigateTo(routeFolderCabinetDetail(row), false);
}
const CreateDialogRef = ref();
function handleAdd() {
  CreateDialogRef.value.handleOpen(props.id);
}
function handleFilterFormChange(formModel: any) {
  if (!formModel.isDesc) formModel.isDesc = true;
  if (!formModel.orderBy) formModel.orderBy = "modified_date_";
  if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc === "false" ? false : true;
  extraParams = formModel;
  reload();
}
const ResponsiveFilterRef = ref();
async function initFilter(id) {
  tableConfig.id = "fc-" + id;
  let data: any = await clientApi.api
    .getCabinetTemplateidPageConditions(id)
    .then((res) => res.data);
  if (!data) return;
  data.unshift(
    {
      key: "orderBy",
      label: "tableHeader.sortBy",
      type: "string",
      isMultiple: false,
      options: [
        { label: "tableHeader_status", value: "state" },
        { label: "tableHeader_name", value: "label" },
        { label: "tableHeader_modifiedDate", value: "modified_date_" },
        { label: "role.creator", value: "created_by_" },
        { label: "info_contributors", value: "modified_by_" },
        { label: "tableHeader.deadline", value: "deadline" },
      ],
    },
    {
      key: "isDesc",
      label: "tableHeader.sortOrder",
      type: "string",
      isMultiple: false,
      options: [
        { label: "tableHeader.desc", value: true },
        { label: "tableHeader.asc", value: false },
      ],
    }
  );
  ResponsiveFilterRef.value.init(data);
  const ignoreList = ["createdBy", "complete", "isDesc", "orderBy", "state"];
  const columns = data.reduce((prev, item) => {
    if (!ignoreList.includes(item.key)) {
      prev.push(getColumn(item));
    }
    return prev;
  }, []);
  const newColumns = [...basicColumns];
  newColumns.splice(2, 0, ...columns);
  tableConfig.columns = newColumns;
  function getColumn(row: any) {
    if (row.type === "date")
      return {
        field: row.key,
        title: row.label,
        formatter({ cellValue }: any) {
          return t(cellValue);
        },
      };
    else {
      return {
        field: row.key,
        title: row.label,
      };
    }
  }
}

defineExpose({ reload });
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
