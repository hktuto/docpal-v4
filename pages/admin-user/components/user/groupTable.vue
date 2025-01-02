<template>
<el-card>
    <template #header>
        <div v-show="state.selectedRows.length > 0" class="flex-x-between">
            <div class="title-select color__primary flex-x-start">
                <b class="el-icon--left "> {{ $t("notifications.fileSelected") }}({{ state.selectedRows.length }})</b>
                <SvgIcon :src="'/icons/close.svg'" :content="$t('button.clearSelected')" @click="cleanSelectedRows"/>
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
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent" >
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
    user: any
}>()
const state = reactive<any>({
    selectedRows: []
})
const { tableConfig, tableEvent , tableRef ,cleanSelectedRows } = useVxeTable({
    id: 'azureLogTableSetting',
    columns:  [
        { field: 'name', title: 'user_groupName', fixed: 'left',type: 'checkbox' },
        { field: 'id', title: 'user_groupIdentifer',},
    ],
    selectChangeHander: (selectedRows: any[]) => {
        state.selectedRows = [...selectedRows];
    },
})

const noDeleteList = ['members']
const UserAddGroupDialogRef = ref()
function handleGroupAddMemberFormShow() {
    UserAddGroupDialogRef.value.handleOpen(tableConfig.data)
}
async function getMemberGroupList() {
    const res = await userProviderDetail?.MemberGroupGetApi({
        userId: props.user.userId
    })
    tableRef.value?.loadData(res.data)
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

onMounted(() => {
    getMemberGroupList()
})

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