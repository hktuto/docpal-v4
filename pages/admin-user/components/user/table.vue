<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="gridEvents">
    <template #toolbar_buttons>
      <header v-show="state.selectList?.length > 0" class="header-flex">
        <div class="title-select color__primary">
          <b class="el-icon--left "> {{ $t("notifications.fileSelected") }}({{ state.selectList.length }})</b>
          <Icon name="ic:baseline-clear" class="normal cursor-pointer" @click="handleClearSelection"></Icon>
        </div>
        <div class="flex-x-end">
          <el-button v-if="!isLdapMode" type="danger" @click="handleDeleteSelected()">{{
            $t("common_delete")
          }}</el-button>
          <el-divider direction="vertical" />
          <el-dropdown placement="top-start">
            <el-button type="primary" class="el-icon--left el-icon--right">
              {{ $t("actions.active") }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleActiveSelected('A')">{{
                  $t("actions.active")
                }}</el-dropdown-item>
                <el-dropdown-item @click="handleActiveSelected('D')">{{
                  $t("actions.inactive")
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button type="primary" @click="handleGroupSelected()">{{
            $t("userManage.group")
          }}</el-button>
        </div>
      </header>
      <header v-show="state.selectList.length === 0" class="header-flex">
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="userNameOrEmail"
          :inputPlaceHolder="$t('placeHolder.userNameOrEmail')"
          @clear-filter="handleClearFilter"
        />
        <el-button
          class="el-icon--right"
          type="primary"
          :disabled="state.activeUsers >= state.licenseUsers || isLdapMode"
          @click="handleUserDialogShow()"
          >{{ $t("user_newUser") }} ({{ state.activeUsers }} /
          {{ state.licenseUsers }})</el-button
        >
      </header>
    </template>
    <template #group="{ row, index }">
      <el-tag class="el-icon--left table-tag" v-for="item in row.groupDTOList">{{
        item.name
      }}</el-tag>
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
    <template #more="{ row }">
      <el-dropdown>
        <SvgIcon src="/icons/dots.svg"></SvgIcon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="routeDetail(row)">{{ $t("common_edit") }}</el-dropdown-item>
            <el-dropdown-item v-if="!isLdapMode" @click="handleDelete(row)">{{ $t("common_delete") }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </VxeGrid>

  <UserDialog ref="UserDialogRef" @refresh="reload"></UserDialog>
  <UserAddGroupsDialog
    ref="UserAddGroupDialogRef"
    @refresh="reload()"
  ></UserAddGroupsDialog>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from "element-plus";
import { userProviderKey } from '~/util/userProvider';
import type { VxeGridInstance, VxeGridProps, VxeGridListeners } from 'vxe-pc-ui'
const emits = defineEmits(['filter-change', 'refresh'])
const userProvider = inject(userProviderKey)
const isLdapMode: boolean = useIsLDAP();
const props = defineProps(['condition'])
const state = reactive({
  ready: false,
  loading: false,
  activeUsers: 10,
  licenseUsers: 50,
  extraParams: {},
  extraParamsFilter: {},
  selectList: [],
});
const tableConfig = reactive(createTableConfig({
    id: 'azureLogTableSetting',
    api: (pageParams:any) => userProvider?.getAllUsersApi(pageParams),
    columns:  [
        { id: "10",  field: 'username', title: 'user_username', fixed: 'left',type: 'checkbox' },
        { field: 'email', title: 'user_email',},
        { field: 'group', title: 'user_groupName',  
          slots:{
            default:'group',
          }
        },
        { field:'status', title: 'user_active', 
          slots:{
            default:'status',
          }
        },
        { title: 'dpTable_actions', 
          slots:{
            default:'more',
          }
        }
    ], 
     
}, {
  menuConfig:{
    body:{
      options:[
        [
          { code:'edit_user', name:"edit.currentTab"},
        ]
      ]
    },
    trigger: 'cell',
  },
  checkboxConfig: {
    labelField: 'username',
    highlight: true,
    range: true
  },
  rowConfig:{
      height: 60,
      isCurrent: true,
      isHover: true,
  }
}))

// #endregion
// #region module:

// #endregion
function handleUserDblclick(row) {
  // router.push(`/user/detail?id=${row.userId}`);
}
const UserDialogRef = ref();
function handleUserDialogShow() {
  UserDialogRef.value.handleOpen();
}
function routeDetail(row:any) {
  console.log("routeDetail", row)
  // router.push(`/user/detail?id=${row.userId}`);
  userProvider.openUserDetail(row)
}
async function handleDeleteSelected() {
  const action = await ElMessageBox.confirm(
    `${$i18n.t("userTip.confirmWhetherToDeleteItems")}`
  );
  if (action !== "confirm") return;
  const params = {
    // ids: state.selectList.map((item: any) => item.id),
    userIds: state.selectList.map((item: any) => item.userId),
  };
  await userProvider?.BatchDeleteUserApi(params);
  ElMessage.success($i18n.t("dpMsg_success"));
  reload();
}
async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm($i18n.t("userTip.confirmWhetherToDelete"));
  if (action !== "confirm") return;
  const res = await userProvider?.BatchDeleteUserApi({ userIds: [row.userId] });
  if (!!res) {
    ElMessage.success($i18n.t("dpMsg_success"));
    reload();
  }
}
async function handleSetStatus(status: "A" | "D", row: any) {
  if (status === row.value || !row.userId || status === null) return;
  if (state.activeUsers >= state.licenseUsers && status === "A") {
    row.status = "D";
    ElMessage({
      message: $i18n.t("user_activeUserOverLimit"),
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
  const { ActiveCount, licenseUserNum } = await userProvider?.getAllUserAndActiveCountApi();
  state.activeUsers = ActiveCount || 0;
  state.licenseUsers = licenseUserNum || 0;
}

// #region module:select actions
function handleSelectionChange() {
  const selectList = tableRef.value.getCheckboxRecords()
  state.selectList = [...selectList];
}
function handleClearSelection() {
  tableRef.value.clearCheckboxRow();
  state.selectList = [];
}


async function handleActiveSelected(status: "A" | "D") {
  const noActiveUsersCount = state.selectList.filter((item: any) => item.status === "D")
    .length;
  if (state.activeUsers + noActiveUsersCount > state.licenseUsers && status === "A") {
    ElMessage({
      message: $i18n.t("user_activeUserOverLimit"),
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
      $i18n.t("userTip.operationFailed", {
        users: result.join(","),
      })
    );
  } else ElMessage.success($i18n.t("dpMsg_success"));
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

const tableRef=ref()
const gridEvents: VxeGridListeners = {
  cellDblclick: ({ row, column, rowIndex }) => {
    userProvider?.openUserDetail(row)
  },
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
  },
  menuClick: ({menu, row, column}:any) => {
    switch(menu.code){
      case 'edit_user':
        alert('edit user')
        break;
    }
  }
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
onMounted(() => {
  getAllUserAndActiveCount();
});
watch(() => props.condition, (newVal) => {
  if(!!newVal) getFilter(newVal)
})
function reload() {
  tableRef.value.commitProxy('query')
  
  // tableRef.value.commitProxy('reload')
}
defineExpose({ reload })
</script>

<style lang="scss" scoped>
:deep(.headerLeftExpand .el-form-item--default) {
  margin-bottom: 0;
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
