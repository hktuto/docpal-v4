<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent" >
    <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="userNameOrEmail"
          :inputPlaceHolder="$t('placeHolder.userGroupName')"
        />
        <el-button class="el-icon--right button" type="primary"
                @click="handleGroupDialogShow()">{{$t('user_newGroup')}}</el-button>
    </template>
  </VxeGrid>
  <GroupDialog ref="GroupDialogRef" :groups="state._groupList" @refresh="getGroup"></GroupDialog>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { adminApi } from 'api'
import { ElMessage, ElMessageBox } from "element-plus";
import { groupProviderKey } from '~/util/userProvider';
const emits = defineEmits(['filter-change', 'refresh'])
const groupProvider = inject(groupProviderKey)
const isLdapMode: boolean = useIsLDAP();
type State = {
  groupList: any,
  _groupList: any[],
}
const state = reactive<State>({
  groupList: {},
  _groupList: [],
});
const { t } = useI18n()
const { tableConfig, tableEvent , tableRef, reload, query } = useVxeTable({
    id: 'a-groupTable',
    columns:  [
        { field: 'name', title: 'user_userGroupName', fixed: 'left' },
        { field: 'id', title: 'user_userGroupIdentifer',},
    ],
    dblClickAction: ({ row, column, event }:any) => {
      groupProvider?.openGroupDetail(row) 
    },
    bodyActions: [
      [
        {
          code: 'edit_group',
          name: 'common_edit',
          visible: true,
          disabled: false,
          action: ({row}:any) => {
            groupProvider?.openGroupDetail(row)
          }
        },
        {
          code: 'delete_group',
          name: 'common_delete',
          visible: true,
          disabled: false,
          action: ({row}:any) => {
            handleDelete(row)
          }
        }
      ],
    ],
    virtualScroll: true,
    optionalConfig: {
    }
})

// #endregion
const UserDialogRef = ref();
function handleUserDialogShow() {
  UserDialogRef.value.handleOpen();
}

async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  const res = await groupProvider?.DeleteGroupApi({ groupId: row.id })
  if (!!res) {
    ElMessage.success(t("dpMsg_success"));
    reload();
  }
}
// #region module: ResponsiveFilterRef
  const ResponsiveFilterRef = ref()
  function handleFilterFormChange(formModel:any, filedData:any) {
    state._groupList = state.groupList.filter((item:any) => {
      return item.name.toLowerCase().includes(formModel.userNameOrEmail.toLowerCase())
    })
    tableRef.value?.loadData(state._groupList)
  }
// #endregion
async function getGroup() {
  tableConfig.loading = true
  state.groupList = await adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
  state._groupList = [...state.groupList]
  tableRef.value?.loadData(state._groupList)
  tableConfig.loading = false
}
const GroupDialogRef = ref()
function handleGroupDialogShow() {
    GroupDialogRef.value.handleOpen()
}
onActivated(() => {
  getGroup()
});
function refresh() {
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
  width: 70%;
}}
</style>
