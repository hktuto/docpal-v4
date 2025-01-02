<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent"> 
      <template #toolbar_buttons>
      <div class="flex-x-between">
          <ResponsiveFilter
            ref="ResponsiveFilterRef"
            inputKey="q"
            inputPlaceHolder="tip.fuzzySearch"
            @form-change="handleFilterFormChange"
          />
          <el-button class="el-icon--right button" type="primary"
                  @click="handleAdd()">{{$t('button.add')}}</el-button>
              </div>
      </template>
      <template #status="{ row }">
          <el-tag v-if="row.status === 'A'" type="success">{{$t('actions.activated')}}</el-tag>
          <el-tag v-else type="danger">{{$t('actions.inactived')}}</el-tag>
      </template>
  </VxeGrid>
</template>

<script lang="ts" setup>
import { adminApi } from 'api'
import dayjs from 'dayjs'
import type { MTColumnInfo } from 'api/src/generate/admin'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated } from 'vue';
const emits = defineEmits(['filter-change'])
const masterTableProvider = inject(MasterTableProviderKey)

const ignoreList = getIgnoreSchemas();
const props = defineProps<{
  tableId: string,
  permission: any,
}>()
const state = reactive<{
  loading: boolean,
  fields: MTColumnInfo[],
  extraParams: any,
}>({
  loading: false,
  fields: [],
  extraParams: {},
})

const { tableConfig, tableEvent , tableRef, reload, query } = useVxeTable({
  id: 'mt_' + props.tableId,
  api: (pageParams:any) => adminApi.masterTableController.postPage({ 
    ...pageParams, 
    ...state.extraParams,
    id: props.tableId
  }),
  columns:  [
    { field: 'id', title: 'masterTable_id', fixed: 'left'},
    { field: 'created_date', title: 'workflow_createDate', 
      formatter ({ cellValue }:any) {
        const format = userDisplayTimeSetting()
        return dayjs(cellValue).format(format)
      }
    },
    { field: 'modified_date', title: 'tableHeader_modifiedDate',  
      formatter ({ cellValue }:any) {
        const format = userDisplayTimeSetting()
        return dayjs(cellValue).format(format)
      }
    },
    { field: 'modified_by', title: 'modified_by'},
    { field: 'status', title: 'common_status', 
      slots:{
        default:'more',
      }
    },
  ], 
  bodyActions: [[
    { 
      code: 'edit_latest_version', 
      name: 'trash_actions_delete', 
      action: ({row}:any) => {handleDelete(row)}
    },
    { 
      code: 'edit_latest_version', 
      name: 'actions.inactive', 
      action: ({row}:any) => {
          handleActive(row, 'D')}
    },
    { 
      code: 'edit_latest_version', 
      name: 'actions.active', 
      action: ({row}:any) => {
          console.log("row", row)
          handleActive(row, 'A')}
    }
  ]],
  visibleMethod: ({options, column, row, rowIndex}: any) => {
    // options 是 menuConfig 中的 body 配置
    options.forEach((list: any) => {
      list.forEach((item: any) => {
        if(item.name === 'actions.active' ) {
          item.visible = row.status === 'D' ? true : false
        } 
        else if(item.name === 'actions.inactive'){
          item.visible = row.status === 'A' ? true : false
        }
      })
    })
    return options;
  }
})
async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  const result = await masterTableProvider?.DeleteMasterTablesApi(row.id)
  if(!result) {
      ElMessage.error($i18n.t('dpTip.deleteFailed'))
      return
  }
  query()
}
async function handleActive(row, status: 'A' | 'D') {
  try {
    row.loading = true
    row.status = status
    await adminApi?.masterTableController.patchStatus(props.tableId, {
      id: row.id,
      status: status === 'A',
    })
    ElMessage.success($i18n.t('dpMsg_success'))
  } catch (error) {
      row.status = row.status = 'A' ? 'D' : 'A'
  } finally {
    row.loading = false
  }
}
function handleDblclick(row: any) {
  console.log("handleDblclick", row)
  masterTableProvider?.openDetail(row)
}
function handleAdd () {
  masterTableProvider?.openNew()
}
// #region module: ResponsiveFilterRef
  const ResponsiveFilterRef = ref()
  function handleFilterFormChange(formModel: any) {
      state.extraParams = formModel
      emits('filter-change', state.extraParams)
  }
// #endregion
async function initTableColumns(fields: any) {
  if (!fields || fields.length === 0) return;
  state.slot = [];
  state.fields = fields
  const columns = fields
    .filter((item: any) => !tableConfig.columns.find(c => c.field === item.columnName))
    .map((item: any) => {
      if (!item.columnName) return item;
      const _item: any = {
        title: item.columnName,
        field: item.columnName,
        headerSlot: "defaultHeader",
      };
      if (item.dataType === "timestamp") {
        item.formatter = ({ cellValue }:any) => {
          const format = userDisplayTimeSetting()
          return dayjs(cellValue).format(format)
        }
      }
      if (item.relationTable) {
        _item.slot = item.columnName;
        state.slot.push(item.columnName);
      }
      return _item;
    });
  console.log("columns", columns)
  console.log(tableConfig)
  // if(!props.permission.edit && !props.permission.enable && endPoint !== 'admin') {
  //   const index = tableSetting.value.columns.findIndex(item => item.label === 'dpTable_actions')
  //   if(index !== -1) tableSetting.value.columns.splice(index, 1)
  // }

  let selectItemIndex = tableConfig.columns.findIndex(
    (item: any) => item.field === "id"
  );
  if (selectItemIndex < 0) selectItemIndex = 0;
  else selectItemIndex ++;
  tableConfig.columns.splice(selectItemIndex, 0, ...columns);
}

onMounted(() => {
})
onActivated(() => {
  // query()
})

defineExpose({ query, reload, initTableColumns })
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
