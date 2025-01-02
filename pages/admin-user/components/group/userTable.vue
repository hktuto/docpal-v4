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
            <span>{{$t('user_users')}}</span>
            <el-button v-show="group && group.isCanModified" class="button" type="primary"
                @click="handleGroupAddMemberFormShow()">{{$t('user_addUser')}}</el-button>
        </div>
    </template>
    <div style="height: 100%; overflow: hidden;">
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent" >
            <template #toolbar_buttons>
                <slot name="toolbar_buttons" />
            </template>  
        </VxeGrid>
    </div>
    <GroupAddUserDialog ref="UserAddGroupDialogRef" :group="group" @refresh="getMemberGroupList"></GroupAddUserDialog>
</el-card>
</template>


<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { groupProviderDetailKey } from '~/util/userProvider';
import type { UserDTO, GroupDTO } from 'api/src/generate/admin'
const groupProviderDetail = inject(groupProviderDetailKey)

const props = defineProps<{
    group: GroupDTO
}>()
const state = reactive<any>({
    selectedRows: []
})
const { t } = useI18n()
const { tableConfig, tableEvent , tableRef ,cleanSelectedRows } = useVxeTable({
    id: 'userTableSetting',
    columns:  [
        { field: 'username', title: 'username', fixed: 'left',type: 'checkbox' },
        { field: 'userId', title: 'user_groupIdentifer',},
    ],
    bodyActions:[
        [
            {
                code:'delete_user',
                name:'table_action.delete',
                visible: true,
                disabled: false,
                action: ({row}:any) => {
                    handleDelete(row)
                }
            }
        ]
    ],
    selectChangeHander: (selectedRows: any[]) => {
        state.selectedRows = [...selectedRows];
    },
    optionalConfig: {
    }
})

const UserAddGroupDialogRef = ref()
function handleGroupAddMemberFormShow() {
    UserAddGroupDialogRef.value.handleOpen(tableConfig.data)
}
async function getMemberGroupList() {
    setTimeout(async() => {
        const res = await groupProviderDetail?.GetMemberListApi({
            groupName: props.group.id
        })
        tableRef.value?.loadData(res.data)
    })
}

async function handleDeleteSelected() {
    const action = await ElMessageBox.confirm(`${t("userTip.confirmWhetherToDeleteItems")}`);
    if (action !== "confirm") return;
    const ids = state.selectedRows.map((item: any) => item.userId)
    // const noDeleteList = state.selectedRows.filter((item: any) => !item.isCanModified)
    // if(ids.length === 0) {
    //     ElMessage.warning(t('groupTip.noValidUser', { userIds: noDeleteList.join(',') }))
    //     return
    // }
    await  groupProviderDetail?.BatchGroupRemoveUsersApi({
        groupId: props.group.id ,  
        userIds: ids
    })
    getMemberGroupList()
    state.selectedRows = [];
}
async function handleDelete (row: UserDTO) {
    const action = await ElMessageBox.confirm(`${t('userTip.confirmWhetherToDelete')}`)
    if (action !== "confirm") return;
    await groupProviderDetail?.BatchGroupRemoveUsersApi({
        userIds: [row.userId], 
        groupId: props.group.id 
    })
    getMemberGroupList()
}
watch( () => props.group, async(newValue) => {
    if (newValue) getMemberGroupList()
},{
    immediate:true 
})
</script>

<style lang="scss" scoped>
.el-card {
    display: grid;
    grid-template-rows: min-content 1fr;
    .el-card__body {
        overflow: hidden;
    }
}
.flex-x-between {
    display: flex; 
    justify-content: space-between;
}
.flex-x-start {
    display: flex;
    justify-content: flex-start;
}
</style>