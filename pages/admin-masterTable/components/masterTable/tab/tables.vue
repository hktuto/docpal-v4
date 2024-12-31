<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent"> 
        <template #toolbar_buttons>
        <div class="flex-x-between">
            <ResponsiveFilter
            ref="ResponsiveFilterRef"
            @form-change="handleFilterFormChange"
            inputKey="name"
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated } from 'vue';
import { MasterTableProviderKey } from '~/utils/masterTableProvider';
const emits = defineEmits(['filter-change'])
const masterTableProvider = inject(MasterTableProviderKey)
const isSuperAdmin = useIsSuperAdmin()
const state = reactive<any>({
    loading: false,
})

const { tableConfig, tableEvent , tableRef, reload, query } = useVxeTable({
    id: 'masterTableTableSetting',
    api: (pageParams:any) => masterTableProvider?.GetMasterTablesPageApi(pageParams),
    columns:  [
        { field: 'name', title: 'tableHeader_name', fixed: 'left'},
        { field: 'createdBy', title: 'role.creator',},
        { field: 'status', title: 'dpTable_status',  
          slots:{
            default:'status',
          }
        },
    ], 
    bodyActions: [[
      { 
        code: 'edit_latest_version', 
        name: 'masterTable.editDetail', 
        action: ({row}:any) => {handleDblclick(row)}
      },
      { 
        code: 'edit_latest_version', 
        name: 'trash_actions_delete', 
        action: ({row}:any) => {handleDblclick(row)}
      },
      { 
        code: 'edit_latest_version', 
        name: 'actions.inactive', 
        action: ({row}:any) => {handleDblclick(row)}
      },
      { 
        code: 'edit_latest_version', 
        name: 'actions.active', 
        action: ({row}:any) => {handleDblclick(row)}
      }
    ]],
    visibleMethod: ({options, column, row, rowIndex}: any) => {
      // options 是 menuConfig 中的 body 配置
      options.forEach((list: any) => {
        list.forEach((item: any) => {
          if(item.name === 'actions.active' || item.name === 'actions.inactive') {
            item.visible = row.status === 'A' ? true : false
            console.log("item", row.status)
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
    refresh()
}
async function handleActive(row, status: 'A' | 'D') {
    state.loading = true
    try {
        row.status = status
        await masterTableProvider?.UpdateMasterTableApi({
            id: row.id,
            status,
        })
        // refresh()
        ElMessage.success($i18n.t('dpMsg_success'))
    } catch (error) {
        row.status = row.status = 'A' ? 'D' : 'A'
    }
    setTimeout(() => state.loading = false, 500)
}
function handleDblclick(row: any) {
  console.log("handleDblclick", row)
}
function handleAdd () {
    masterTableProvider?.openNew()
}
// #region module: ResponsiveFilterRef
    const ResponsiveFilterRef = ref()
    async function getFilter() {
        const filters = await masterTableProvider?.GetMasterTablesPageConditionApi()
        nextTick(() => {
            ResponsiveFilterRef.value.init(filters.data)
        })
    }
    function handleFilterFormChange(formModel: any) {
        state.extraParams = formModel
        emits('filter-change', state.extraParams)
    }
// #endregion
function refresh() {
    tableRef.value.commitProxy('query')
}
onMounted(() => {
    getFilter()
})
onActivated(() => {
    refresh()
})

defineExpose({ refresh, reload })
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
