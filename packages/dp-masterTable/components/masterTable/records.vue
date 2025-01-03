<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
  <!-- TODO: muultiple select -->
    <template #toolbar_buttons>
      <div v-if="state.selectList.length === 0" class="flex-x-between">
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="q"
          inputPlaceHolder="tip.fuzzySearch"
          @form-change="handleFilterFormChange"
        />
        <div class="flex-x-end">
          <div
            v-for="item in ['optional', 'unique', 'required']"
            class="column-dynamic el-icon--left"
            :style="`--column-color: ${getColor('', item)}`"
          >
            {{ $t(`marsterTable.${item}`) }}
            <div class="column-dynamic-point"></div>
          </div>
          <el-button
            v-if="permission?.create && !!endPoint && endPoint !== 'admin'"
            class="el-icon--right"
            type="primary"
            size="small"
            @click="handleAddRow()"
            >{{ $t("button.add") }}</el-button
          >
        </div>
      </div>
      <div v-else class="flex-x-between">
        <div class="title-select color__primary">
            <b class="el-icon--left">
              {{ $t("notifications.fileSelected") }}({{ state.selectList.length }})</b
            >
            <Icon name="ic:baseline-clear" class="normal cursor-pointer" @click="cleanSelectedRows"></Icon>
          </div>
          <div>
            <!-- v-if="isSuperAdmin && endPoint === 'admin'" -->
            <el-button  type="danger" @click="handleDeleteSelected">
              {{ $t("common_delete") }}
            </el-button>
            <el-dropdown v-if="endPoint === 'admin' || permission?.enable" trigger="click">
              <el-button class="el-icon--left el-icon--right" type="warning" >
                {{ $t("actions.active") }}
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleBatchActive(true)">{{ $t('actions.active') }}</el-dropdown-item>
                  <el-dropdown-item @click="handleBatchActive(false)">{{ $t('actions.inactive') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button type="primary" @click="handleBatchEdit">
              {{ $t("button.batchEdit") }}
            </el-button>
          </div>
      </div>
    </template>
    <template #defaultHeader="{ column }">
      <span
          class="column-dynamic"
          :style="`--column-color: ${getColor(column.field)}`"
        >
          {{ $t(column.title) }}
          <!-- <div class="column-dynamic-point"></div> -->
        </span>
    </template>
    <template v-for="(item, index) in state.slot" v-slot:[`${item}`]="{ row }">
        {{ row[item] }}
        <template v-if="row[`Relation_${item}`]">
          -
          <el-tag round> {{ row[`Relation_${item}`] }} </el-tag>
        </template>
    </template>
    <template #status="{ row }">
      <el-tag v-if="row.status" type="success">{{
        $t("actions.activated")
      }}</el-tag>
      <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
    </template>
  </VxeGrid>
  <MasterTableRecordDialog
      ref="MasterTableNewRowDialogRef"
      :ignoreList="ignoreList"
      :tableId="tableId"
      @refresh="query"
    />
  <MasterTableBatchEditDialog
      ref="BatchDialogRef"
      :tableId="tableId"
      :ignoreList="ignoreList"
      @refresh="query"
    />
</template>

<script lang="ts" setup>
import { adminApi } from "api";
import dayjs from "dayjs";
import type { MTColumnInfo } from "api/src/generate/admin";
import { ElMessage, ElMessageBox } from "element-plus";
import { onActivated } from "vue";
const emits = defineEmits(["filter-change"]);
const masterTableProvider = inject(MasterTableProviderKey);
const {
  public: { endPoint },
} = useRuntimeConfig();
const ignoreList = getIgnoreSchemas();
const isSuperAdmin = useIsSuperAdmin()
const props = defineProps<{
  tableId: string;
  permission: any;
}>();
const state = reactive<{
  loading: boolean;
  fields: MTColumnInfo[];
  extraParams: any;
  slot: string[];
  selectList: any[]
}>({
  loading: false,
  fields: [],
  extraParams: {},
  slot: [],
  selectList: []
});

const { tableConfig, tableEvent, tableRef, reload, query, cleanSelectedRows } = useVxeTable({
  id: "mt_" + props.tableId,
  api: (pageParams: any) =>
    adminApi.masterTableController.postPage({
      ...pageParams,
      ...state.extraParams,
      id: props.tableId,
    }),
  columns: [
    { type: 'checkbox', fixed: "left", width: 47 },
    { field: "id", title: "masterTable_id", },
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
      title: "tableHeader_modifiedDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    { field: "created_by", title: "role.creator" },
    { field: "modified_by", title: "modified_by" },
    {
      field: "status",
      title: "common_status",
      slots: {
        default: "status",
      },
    },
  ],
  bodyActions: [
    [{
        code: "edit_latest_version",
        name: "common_edit",
        action: ({ row }: any) => {
          handleAddRow(row);
        },
      },
      {
        code: "edit_latest_version",
        name: "trash_actions_delete",
        action: ({ row }: any) => {
          handleDelete(row);
        },
      },
      {
        code: "edit_latest_version",
        name: "actions.inactive",
        action: ({ row }: any) => {
          handleActive(row, false);
        },
      },
      {
        code: "edit_latest_version",
        name: "actions.active",
        action: ({ row }: any) => {
          handleActive(row, true);
        },
      },
    ],
  ],
  visibleMethod: ({ options, column, row, rowIndex }: any) => {
    // options 是 menuConfig 中的 body 配置
    options.forEach((list: any) => {
      list.forEach((item: any) => {
        if(item.name === 'actions.active' ) {
          item.visible = row.status ? false : true;
        } else if(item.name === 'actions.inactive'){
          item.visible = row.status ? true : false;
        }
      });
    });
    return options;
  },
  selectChangeHander: (selectedRows: any[]) => {
    state.selectList = [...selectedRows];
  },
  dblClickAction: ({ row, column, event }:any) => {
    console.log(row)
    handleAddRow(row) 
  },
  optionalConfig: {
    rowConfig:{
      height: 60,
      isCurrent: true,
      isHover: true,
    }
  }
});
async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${$i18n.t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  const result = await adminApi.masterTableController.deleteRecord(props.tableId,  {recordId: row.id}, {});
  if (!result) {
    ElMessage.error($i18n.t("dpTip.deleteFailed"));
    return;
  }
  query();
}
const BatchDialogRef = ref()
function handleBatchEdit() {
  const fields = state.fields.filter(item => !item.unique && !item.primaryKey)
  BatchDialogRef.value.handleOpen(fields, state.selectList)
}
const MasterTableNewRowDialogRef = ref();
function handleAddRow(row: any) {
  MasterTableNewRowDialogRef.value.handleOpen(state.fields, row);
}
async function handleBatchActive(status: boolean) {
  try {
    const ids = state.selectList.map((item: any) => item.id)
    await adminApi?.masterTableController.patchStatus1(props.tableId, {
      in: {
        id: ids
      },
      status,
    });
    ElMessage.success($i18n.t("dpMsg_success"));
    query()
  } catch (error) {
  } finally {
  }
}
async function handleActive(row, status: boolean) {
  try {
    row.loading = true;
    row.status = status;
    await adminApi?.masterTableController.patchStatus(props.tableId, {
      id: row.id,
      status
    });
    ElMessage.success($i18n.t("dpMsg_success"));
  } catch (error) {
    row.status = row.status ? false : true;
  } finally {
    row.loading = false;
  }
}
// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref();
function handleFilterFormChange(formModel: any) {
  state.extraParams = formModel;
  console.log("handleFilterFormChange", state.extraParams);
  reload()
}
function getColor(prop: any, option?: "unique" | "required" | "optional") {
  try {
    if (!!prop) {
      const mItem: any = state.fields.find((item: any) => item.columnName === prop);
      if (mItem.unique) return "#0099FF";
      else if (mItem.required) return "#7B61FF";
    }
  } catch (error) {}
  switch (option) {
    case "unique":
      return "#0099FF";
    case "required":
      return "#7B61FF";
    default:
      break;
  }
  // return 'red'
  return "#373D43";
}
// #endregion
async function initTableColumns(fields: any) {
  if (!fields || fields.length === 0) return;
  state.slot = [];
  state.fields = fields;
  const columns = fields
    .filter((item: any) => !tableConfig.columns.find((c) => c.field === item.columnName))
    .map((item: any) => {
      if (!item.columnName) return item;
      const _item: any = {
        title: item.columnName,
        field: item.columnName,
        slots: { header: 'defaultHeader' }
      };
      if (item.dataType === "timestamp") {
        item.formatter = ({ cellValue }: any) => {
          const format = userDisplayTimeSetting();
          return dayjs(cellValue).format(format);
        };
      }
      if (item.relationTable) {
        _item.slots.default = item.columnName,
        
        state.slot.push(item.columnName);
      }
      return _item;
    });
  // TODO: endPoint
  if (!props.permission?.edit && !props.permission?.enable && endPoint !== "admin") {
    const index = tableConfig.columns.findIndex(
      (item) => item.title === "dpTable_actions"
    );
    if (index !== -1) tableConfig.columns.splice(index, 1);
  }

  let selectItemIndex = tableConfig.columns.findIndex((item: any) => item.field === "id");
  if (selectItemIndex < 0) selectItemIndex = 0;
  else selectItemIndex++;
  tableConfig.columns.splice(selectItemIndex, 0, ...columns);
}
async function handleDeleteSelected() {
  const action = await ElMessageBox.confirm(
    `${$i18n.t("msg_confirmWhetherToDeletes")}`
  );
  if (action !== "confirm") return;
  const ids = state.selectList.map((item: any) => item.id)
  await adminApi.masterTableController.postDelete({
    tableId: props.tableId, 
    recordIds: ids});
  ElMessage.success($i18n.t("dpMsg_success"));
  if (ids.length === tableConfig.data.length) query();
  else reload();
}

onMounted(() => {});
onActivated(() => {
  // query()
});

defineExpose({ query, reload, initTableColumns });
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
.flex-x-end {
  display: flex;
  justify-content: flex-end;
}
.column-dynamic {
  min-width: 3rem;
  color: var(--column-color);
  display: flex;
  align-items: center;
  margin-right: var(--app-space-xs);
  &-point {
    width: 8px;
    height: 8px;
    margin-left: 3px;
    border-radius: 50%;
    background-color: var(--column-color);
  }
}
</style>
