<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" >
    <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="userNameOrEmail"
          :inputPlaceHolder="$t('placeHolder.userNameOrEmail')"
        /><el-button class="el-icon--right button" type="primary"
                @click="handleGroupDialogShow()">{{$t('user_newGroup')}}</el-button>
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
  <GroupDialog ref="GroupDialogRef" :groups="state._groupList" @refresh="getGroup"></GroupDialog>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from "element-plus";
import { groupProviderKey } from '~/util/userProvider';
const emits = defineEmits(['filter-change', 'refresh'])
const groupProvider = inject(groupProviderKey)
const isLdapMode: boolean = useIsLDAP();
const state = reactive<State>({
  groupList: {},
  _groupList: [],
});
const tableConfig = ref({
    id: 'groupTable',
    columns:  [
        { id: "10",  field: 'name', title: 'user_groupName', fixed: 'left' },
        { field: 'id', title: 'Identifer',},

        { title: 'dpTable_actions', 
          slots:{
            default:'more',
          }
        }
    ],  
    border: true,
    round: true,
    showOverflow: true,
    height: 'auto',
    data: [],
    loading: false,
    toolbarConfig: {
        custom:true,
        slots: {
            buttons: 'toolbar_buttons'
        }
    }
})

// #endregion
const UserDialogRef = ref();
function handleUserDialogShow() {
  UserDialogRef.value.handleOpen();
}
function routeDetail(row:any) {
  console.log("routeDetail", row)
  // router.push(`/user/detail?id=${row.userId}`);
  groupProvider.openGroupDetail(row)
}
async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  const res = await groupProvider?.DeleteGroupApi({ groupId: row.id })
  if (!!res) {
    ElMessage.success($i18n.t("dpMsg_success"));
    reload();
  }
}
const tableRef=ref()
// #region module: ResponsiveFilterRef
  const ResponsiveFilterRef = ref()
  function handleFilterFormChange(formModel, filedData) {
    state._groupList = state.groupList.filter((item:any) => {
      return item.name.toLowerCase().includes(formModel.userNameOrEmail.toLowerCase())
    })
    tableConfig.value.data = state._groupList
  }
// #endregion
async function getGroup() {
  state.groupList = await groupProvider?.GetGroupListApi()
  state._groupList = [...state.groupList]
  tableConfig.value.data = state._groupList
}
const GroupDialogRef = ref()
function handleGroupDialogShow() {
    GroupDialogRef.value.handleOpen()
}
onMounted(() => {
  getGroup()
});
function refresh() {
  getGroup()
}
function reload() {
  getGroup()
}
defineExpose({ reload })
</script>

<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
:deep .vxe-buttons--wrapper {
  justify-content: space-between;
  .responsive-container {
  width: fit-content;
}}
</style>
