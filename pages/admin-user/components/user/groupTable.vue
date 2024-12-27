<template>
<el-card>
    <template #header>
        <div v-show="state.selectedRows.length > 0" class="flex-x-between">
            <div class="title-select color__primary flex-x-start">
                <b class="el-icon--left "> {{ $t("notifications.fileSelected") }}({{ state.selectedRows.length }})</b>
                <SvgIcon :src="'/icons/close.svg'" :content="$t('button.clearSelected')" @click="handleClearSelection"/>
            </div>
            <el-button type="danger" @click="handleDeleteSelected()">{{
                $t("common_delete")
            }}</el-button>
        </div>
        <div v-show="state.selectedRows.length === 0" class="flex-x-between">
            <span>{{$t('user_groups')}}</span>
            <el-button class="button" type="primary"
                @click="handleGroupAddMemberFormShow()">{{$t('user_addGroups')}}</el-button>
        </div>
    </template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="gridEvents" >
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        <template #more="{row}">
            <Icon v-if="!noDeleteList.includes(row.id)" name="material-symbols:delete-rounded" class="normal cursor-pointer" @click="handleDelete(row)"></Icon>
        </template>    
    </VxeGrid>
    <UserAddGroupDialog ref="UserAddGroupDialogRef" :user="user" @refresh="getMemberGroupList"></UserAddGroupDialog>
</el-card>
</template>


<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { userProviderDetailKey } from '~/util/userProvider';
const userProviderDetail = inject(userProviderDetailKey)
if(!userProviderDetail) {
    throw new Error('userProviderDetailKey not found')
}
const props = defineProps<{
    user: obj
}>()
const state = reactive<any>({
    selectedRows: []
})
const tableConfig = ref({
    id: 'azureLogTableSetting',
    columns:  [
        { id: "10",  field: 'name', title: 'user_groupName', fixed: 'left',type: 'checkbox' },
        { field: 'id', title: 'user_groupIdentifer',},
        { title: 'dpTable_actions', 
          slots:{
            default:'more',
          }
        }
    ],  
    checkboxConfig: {
        labelField: 'name',
        highlight: true,
        range: true
    },
    data: []
})
const gridEvents: VxeGridListeners = {
  checkboxChange ({ checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) { 
    // console.log('checkboxChange', checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event)
    handleSelectionChange()
  },
  checkboxRangeChange( $event){
    // console.log('checkboxRangeChange',  $event)
    handleSelectionChange()
  },
  checkboxAll( {$event, checked}){
    // console.log('checkboxAll',  checked, $event)
    handleSelectionChange()
  }
}
const noDeleteList = ['members']
const UserAddGroupDialogRef = ref()
function handleGroupAddMemberFormShow() {
    UserAddGroupDialogRef.value.handleOpen(tableConfig.value.data)
}
async function getMemberGroupList() {
    const res = await userProviderDetail?.MemberGroupGetApi({
        userId: props.user.userId
    })
    tableConfig.value.data = res.data
}

const tableRef = ref();
function handleClearSelection() {
tableRef.value.clearCheckboxRow();
  state.selectedRows = [];
}
function handleSelectionChange() {
  const selectList = tableRef.value.getCheckboxRecords()
  state.selectedRows = [...selectList];
}
async function handleDelete (row) {
    const action = await ElMessageBox.confirm(`${$i18n.t("groupTip.confirmWhetherToDeleteItem")}`);
    if (action !== "confirm") return;
    await userProviderDetail?.BatchUserRemoveGroupsApi({
        groupIds: [row.id], 
        userId: props.user.userId 
    })
    getMemberGroupList()
}
async function handleDeleteSelected() {
    const action = await ElMessageBox.confirm(`${$i18n.t("groupTip.confirmWhetherToDeleteItems")}`);
    if (action !== "confirm") return;
    const ids = state.selectedRows.filter((item: any) => !noDeleteList.includes(item.id)).map((item: any) => item.id)
    if(ids.length === 0) {
        ElMessage.warning($i18n.t('userTip.noValidGroups', { groupIds: noDeleteList.join(',') }))
        return
    }
    await userProviderDetail?.BatchUserRemoveGroupsApi({
        groupIds: ids,  
        userId: props.user.userId 
    })
    state.selectedRows = [];
    getMemberGroupList()
}
watch( () => props.user, async(newValue) => {
    if (newValue) getMemberGroupList()
},{
    immediate:true 
})
</script>

<style lang="scss" scoped>
.flex-x-between {
    display: flex; 
    justify-content: space-between;
}
</style>