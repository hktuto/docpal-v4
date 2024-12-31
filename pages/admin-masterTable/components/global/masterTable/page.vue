<script lang="ts" setup>
import { adminApi } from 'api';
import { MasterTableProviderKey } from '~/utils/masterTableProvider';
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
if( !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const state = reactive<any>({
  activeName: "tabels",
  tableFilter: {},
  logFilter: {},
  masterTable: {
    name: "",
    fields: [],
  },
});
function openDetail(row:any) {
  routerProvider?.navigateTo(newMasterTableDetail(row))
}
function openNew() {
  const newItem = {
    menuKey: routerProvider?.menuSymbol,
    id: 'master-table-new-' + new Date().getTime(),
    name: $t('adminMenu.masterTable') + '/new',
    label: 'adminMenu.masterTable',
    icon : 'lucide:columns-2',
    component: 'LazyMasterTableNewDead',
    props:{
    }
  }
  console.log("newItem", newItem)
  routerProvider?.navigateTo({...newItem})
}
const logRef = ref()
const MasterTableTabRecordsRef = ref()
function handleTableFilterChange(formModel:any) {
  state.tableFilter = formModel
  MasterTableTabRecordsRef.value.refresh()
}
function handleLogFilterChange(formModel:any) {
  state.logFilter = formModel
  logRef.value.refresh()
}
provide(MasterTableProviderKey, {
  GetMasterTablesPageApi: (params:any) => {
    return adminApi.masterTableController.postPage1({...params, ...state.tableFilter})
  },
  DeleteMasterTablesApi: (params:any) => {
    return adminApi.masterTableController.deleteTables(params)
  },
  GetMasterTablesPageConditionApi: (params:any) => {
    return adminApi.masterTableController.getConditions(params)
  },
  UpdateMasterTableApi: (params:any) => {
    return adminApi.masterTableController.putTables(params)
  },
  GetMasterTablesLogsApi: (params:any) => {
    return adminApi.masterTableController.postLogs({...params, ...state.logFilter})
  },
  GetMasterTablesLogConditionsApi: (params:any) => {
    return adminApi.masterTableController.postConditions(params)
  },
  openDetail,
  openNew
}
)
</script>
<template>
  <div class="pageContainer--padding">
    <el-tabs class="dp-tabs--auto" v-model="state.activeName">
      <el-tab-pane :label="$t('masterTable.tabels')" name="tabels">
        <MasterTableTabTables ref="MasterTableTabRecordsRef"  @filter-change="handleTableFilterChange"></MasterTableTabTables>
      </el-tab-pane>
      <el-tab-pane :label="$t('masterTable.log')" name="log">
        <MasterTableTabLog ref="logRef" @filter-change="handleLogFilterChange"></MasterTableTabLog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped>
.dp-tabs--auto {
  height: 100%;
  .el-tab-pane {
    height: 100%;
  }
}
</style>
