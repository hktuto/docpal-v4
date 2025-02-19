<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <header v-show="state.selectList?.length > 0" class="header-flex">
                <div class="title-select color__primary">
                    <b class="el-icon--left ">
                        {{ $t("notifications.userSelected") }} <{{ state.selectList.length }}>
                    </b>
                    <Icon name="ic:baseline-clear" class="normal cursor-pointer" @click="cleanSelectedRows"></Icon>
                </div>
                <div class="flex-x-end">
                    <el-button v-if="!isLdapMode" type="danger" @click="handleDeleteSelected()">
                        {{ $t("common_delete") }}
                    </el-button>
                    <el-divider direction="vertical"/>
                    <el-dropdown placement="top-start">
                        <el-button type="primary" class="el-icon--left el-icon--right">
                            {{ $t("actions.active") }}
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="handleActiveSelected('A')">
                                    {{ $t("actions.activate") }}
                                </el-dropdown-item>
                                <el-dropdown-item @click="handleActiveSelected('D')">
                                    {{ $t("actions.inactivate") }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-button type="primary" @click="handleGroupSelected()">
                        {{ $t("userManage.group") }}
                    </el-button>
                </div>
            </header>
            <header v-show="state.selectList.length === 0" class="header-flex">
                <ResponsiveFilter
                    ref="ResponsiveFilterRef"
                    @form-change="handleFilterFormChange"
                    inputKey="userNameOrEmail"
                    :inputPlaceHolder="$t('placeHolder.userNameOrEmail')"
                />
                <el-button
                    class="el-icon--right"
                    type="primary"
                    :disabled="state.activeUsers >= state.licenseUsers || isLdapMode"
                    @click="handleUserDialogShow()"
                >{{ $t("user_newUser") }} ({{ state.activeUsers }} /
                    {{ state.licenseUsers }})
                </el-button>
            </header>
        </template>
        <template #group="{ row, index }">
            <el-tag class="el-icon--left table-tag" v-for="item in row.groupDTOList">{{
                    item.name
                }}
            </el-tag>
        </template>
        <template #status="{ row, index }">
            <el-switch
                v-model="row.status"
                active-value="A"
                inactive-value="D"
                :loading="row.loading"
                :disabled="row.status === 'D' && state.activeUsers >= state.licenseUsers"
                @change="(value: 'A' | 'D') => handleSetStatus(value, row)"
            />
        </template>

    </VxeGrid>

    <UserDialog ref="UserDialogRef" @refresh="reload"></UserDialog>
    <UserAddGroupsDialog
        ref="UserAddGroupDialogRef"
        @refresh="reload()"
    ></UserAddGroupsDialog>
</template>

<script lang="ts" setup>
import {ElMessage, ElMessageBox} from "element-plus";
import {userProviderKey} from '~/util/userProvider';

const {t} = useI18n()
const routerProvider = inject(MenuRouterKey)
const emits = defineEmits(['filter-change', 'refresh'])
const userProvider = inject(userProviderKey)
const isLdapMode: boolean = useIsLDAP();
const props = defineProps(['condition'])

type TableState = {
    ready: boolean,
    loading: boolean,
    activeUsers: number,
    licenseUsers: number,
    extraParams: any,
    extraParamsFilter: any,
    selectList: any[],
}
const state = reactive<TableState>({
    ready: false,
    loading: false,
    activeUsers: 10,
    licenseUsers: 50,
    extraParams: {},
    extraParamsFilter: {},
    selectList: [],
});

const {tableConfig, tableEvent, tableRef, reload, cleanSelectedRows} = useVxeTable({
    id: 'userTableSetting',
    api: async (pageParams: any) => {
        cleanSelectedRows()
        return await userProvider?.getAllUsersApi(pageParams)
    },
    columns: [
        {field: 'username', title: 'user_username', fixed: 'left', type: 'checkbox'},
        {field: 'email', title: 'user_email',},
        {
            field: 'groupDTOList', title: 'user_groups',
            slots: {
                default: 'group',
            }
        },
        {
            field: 'status', title: 'user_active',
            slots: {
                default: 'status',
            }
        },
    ],
    bodyActions: [
        [
            {
                code: 'edit_user',
                name: 'Edit User',
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    userProvider?.openUserDetail(row)
                }
            },
            {
                code: 'delete_user',
                name: 'Delete User',
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    handleDelete(row)
                }
            }
        ]
    ],
    optionalConfig: {
        rowConfig: {
            height: 60,
            isCurrent: true,
            isHover: true,
        },
        tooltipConfig: {
            contentMethod: ({
                                items,
                                row,
                                rowIndex,
                                $rowIndex,
                                column,
                                columnIndex,
                                $columnIndex,
                                type,
                                cell,
                                $event
                            }: any) => {
                const key = column.property
                const value = row[key]
                if (key === 'groupDTOList') {
                    return value.map(item => item.name).join(', ')
                }
                if (typeof value === 'string') {
                    return value
                }
                if (Array.isArray(value)) {
                    return value.join(',')
                }
            }
        }
    },
    selectChangeHander: (selectedRows: any[]) => {
        state.selectList = [...selectedRows];
    },
    dblClickAction: ({row, column, event}: any) => {
        userProvider?.openUserDetail(row)
    },
})

// #endregion
// #region module:

// #endregion
const UserDialogRef = ref();

function handleUserDialogShow() {
    UserDialogRef.value.handleOpen();
}

async function handleDeleteSelected() {
    const action = await ElMessageBox.confirm(
        t("userTip.confirmWhetherToDeleteItems"),
        {
            confirmButtonText: `${t("common_confirmDelete")}`,
            dangerouslyUseHTMLString: true,
        }
    );
    if (action !== "confirm") return;
    const params = {
        userIds: state.selectList.map((item: any) => item.userId),
    };
    await userProvider?.BatchDeleteUserApi(params);
    routerProvider?.message.success(t('userTip.userSelectedDeleteMsg'));
    reload();
}

async function handleDelete(row: any) {
    const action = await ElMessageBox.confirm(
        t("userTip.confirmWhetherToDeleteItems"),
        "",
        {
            confirmButtonText: `${t("common_confirmDelete")}`,
            dangerouslyUseHTMLString: true,
        }
    );
    if (action !== "confirm") return;
    const res = await userProvider?.BatchDeleteUserApi({userIds: [row.userId]});
    if (!!res) {
        routerProvider?.message.success(t('userTip.userSelectedDeleteMsg'));
        reload();
    }
}

async function handleSetStatus(status: "A" | "D", row: any) {
    if (status === row.value || !row.userId || status === null) return;
    if (state.activeUsers >= state.licenseUsers && status === "A") {
        row.status = "D";
        ElMessage({
            message: t("user_activeUserOverLimit"),
            type: "warning",
        });
        return;
    }
    try {
        row.loading = true;
        await userProvider?.SetUserStatusApi(row);
        await getAllUserAndActiveCount();
    } catch (error) {
        row.status = row.status = "A" ? "D" : "A";
    } finally {
        row.loading = false;
    }
}

async function getAllUserAndActiveCount() {
    const {ActiveCount, licenseUserNum} = await userProvider?.getAllUserAndActiveCountApi();
    state.activeUsers = ActiveCount || 0;
    state.licenseUsers = licenseUserNum || 0;
}

// #region module:select actions

async function handleActiveSelected(status: "A" | "D") {
    const noActiveUsersCount = state.selectList.filter((item: any) => item.status === "D")
        .length;
    if (state.activeUsers + noActiveUsersCount > state.licenseUsers && status === "A") {
        ElMessage({
            message: t("user_activeUserOverLimit"),
            type: "warning",
        });
        return;
    }
    const params = {
        ids: state.selectList.map((item: any) => item.id),
        userIds: state.selectList.map((item: any) => item.userId),
        active: status,
    };
    const result = await userProvider?.BatchActiveUserApi(params);
    if (result.length > 0) {
        ElMessage.error(
            t("userTip.operationFailed", {
                users: result.join(","),
            })
        );
    } else {
        if (status === "A") {
            ElMessage.success(t("user.activate.successfully.msg"));
        } else {
            ElMessage.success(t("user.inactivate.successfully.msg"));
        }
    }
    getAllUserAndActiveCount();
    reload();
}

const UserAddGroupDialogRef = ref();

function handleGroupSelected() {
    const params = {
        ids: state.selectList.map((item: any) => item.id),
        userIds: state.selectList.map((item: any) => item.userId),
    };
    UserAddGroupDialogRef.value.handleOpen([], params);
}

// #endregion
// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref()

async function getFilter(conditions) {
    ResponsiveFilterRef.value.init(conditions);
}

function handleFilterFormChange(formModel, filedData) {
    state.extraParamsFilter = formModel;
    emits('filter-change', state.extraParamsFilter)
}

function handleClearFilter() {
    state.extraParamsFilter = {};
    emits('filter-change', state.extraParamsFilter)
}

// #endregion

onActivated(() => {
    state.selectList = []
})

watch(() => props.condition, (newVal) => {
    if (!!newVal) getFilter(newVal)
})
defineExpose({reload})
</script>

<style lang="scss" scoped>
:deep(.headerLeftExpand .el-form-item--default) {
    margin-bottom: 0;
}
:deep(.responsive-container .el-input){
    width: 250px;
}

.table-tag {
    margin-bottom: 5px;
}

:deep .headerLeftExpand {
    .el-input {
        width: 200px;
    }
}

.header-flex {
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr min-content;
    gap: var(--app-space-xs);
    padding: var(--app-space-xs);
    background: var(--el-color-primary-light-9);
}

.title-select {
    display: flex;
    align-items: center;
    --icon-size: 1.2rem;
}

:deep .tableHeader {
    gap: unset;
}

.el-divider--vertical {
    height: 1.5rem;
}

:deep .el-input {
    width: 200px;
}

.flex-x-end {
    display: flex;
    justify-content: end;
}
</style>
