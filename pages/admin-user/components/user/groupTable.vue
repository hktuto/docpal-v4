<template>
    <el-card>
        <template #header>
            <div v-show="state.selectedRows.length > 0" class="flex-x-between">
                <div class="title-select color__primary flex-x-start">
                    <b class="el-icon--left ">
                        {{ $t("user_userGroup_selectedMsg") }}: {{ state.selectedRows.length }}
                    </b>
                    <SvgIcon :src="'/icons/close.svg'" :content="$t('button.clearSelected')"
                             @click="cleanSelectedRows"/>
                </div>
                <el-button type="danger" @click="handleDeleteSelected()">
                    {{ $t("common_delete") }}
                </el-button>
            </div>
            <div v-show="state.selectedRows.length === 0" class="flex-x-between">
                <span><h3>{{ $t('user_userGroupAssignment') }}</h3></span>
                <el-button class="button" type="primary" @click="handleGroupAddMemberFormShow()">
                    {{ $t('user_addGroups') }}
                </el-button>
            </div>
        </template>
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
            <template #toolbar_buttons>
                <slot name="toolbar_buttons"/>
                <ResponsiveFilter
                    ref="ResponsiveFilterRef"
                    inputPlaceHolder="placeHolder.userGroupName"
                    @form-change="handleFilterFormChange"
                    inputKey="metaData"
                />
            </template>
            <template #more="{row}">
                <Icon v-if="!noDeleteList.includes(row.id)" name="material-symbols:delete-rounded"
                      class="normal cursor-pointer" @click="handleDelete(row)"></Icon>
            </template>
        </VxeGrid>
        <UserAddGroupDialog ref="UserAddGroupDialogRef" :user="user" @refresh="getMemberGroupList"></UserAddGroupDialog>
    </el-card>
</template>


<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'
import {userProviderDetailKey} from '~/util/userProvider';

const {t} = useI18n()
const userProviderDetail = inject(userProviderDetailKey)
if (!userProviderDetail) {
    throw new Error('userProviderDetailKey not found')
}
const props = defineProps<{
    user: any
}>()
const state = reactive<any>({
    selectedRows: [],
    groupList: []
})
const {tableConfig, tableEvent, tableRef, cleanSelectedRows} = useVxeTable({
    id: 'a-user-group',
    columns: [
        {type: "checkbox", fixed: 'left', width: "60px"},
        {field: 'name', title: 'user_userGroupName', fixed: 'left', sortable: true},
        {field: 'id', title: 'user_userGroupIdentifer',},
    ],
    selectChangeHander: (selectedRows: any[]) => {
        state.selectedRows = [...selectedRows];
    },
    virtualScroll: true
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
    state.groupList = res.data
}

async function handleDelete(row: any) {
    const action = await ElMessageBox.confirm(
        `${t("groupTip.confirmWhetherToDeleteItem")}`,
        {
            confirmButtonText: `${t("common_confirmDelete")}`,
        }
    );
    if (action !== "confirm") return;
    await userProviderDetail?.BatchUserRemoveGroupsApi({
        groupIds: [row.id],
        userId: props.user.userId
    })
    getMemberGroupList()
}

async function handleDeleteSelected() {
    const action = await ElMessageBox.confirm(
        t('groupTip.confirmWhetherToDeleteItems', {username: props.user.firstName}),
        {
            confirmButtonText: t("common_confirmRemove"),
        }
    );
    if (action !== "confirm") return;
    const ids = state.selectedRows.filter((item: any) => !noDeleteList.includes(item.id)).map((item: any) => item.id)
    if (ids.length === 0) {
        ElMessage.warning(t('userTip.noValidGroups', {groupIds: noDeleteList.join(',')}))
        return
    }
    await userProviderDetail?.BatchUserRemoveGroupsApi({
        groupIds: ids,
        userId: props.user.userId
    })
    state.selectedRows = [];
    ElMessage({
        type: 'success',
        message: t('user_removeGroupsSuccessMsg', {username: props.user.firstName}),
    })
    getMemberGroupList()
}

function handleFilterFormChange(formModel: any) {
    let data = state.groupList;
    if (formModel.metaData) {
        const searchString = formModel.metaData.toLowerCase();
        data = state.groupList.filter((item: any) => item.name.toLowerCase().includes(searchString));
    }
    tableRef.value?.loadData(data);
}

onActivated(() => {
    getMemberGroupList()
    state.selectedRows = []
})


watch(() => props.user, async (newValue: any) => {
    if (newValue) getMemberGroupList()
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
.el-card {
    display: grid;
    grid-template-rows: min-content 1fr;
}

:deep(.el-input) {
    width: 200px;
}

.flex-x-between {
    display: flex;
    justify-content: space-between;
}
</style>