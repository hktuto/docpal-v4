<template>
  <el-card v-if="user">
    <template #header>
      <div class="flex-x-between">
        <h3>{{ $t('user_info') }}</h3>
        <div class="flex-x-end" v-if="!isLdapMode">
          <el-tooltip class="box-item" effect="dark" :content="$t('user_editUser')" placement="top">
            <Icon
              id="UserList__Info__Edit"
              name="material-symbols:edit-square"
              class="normal cursor-pointer"
              style="width: 20px; height: 20px"
              @click="handleEdit"
            ></Icon>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" :content="$t('user_editPassword')" placement="top">
            <Icon
              id="UserList__Info__ChangePassword"
              name="mynaui:lock-password-solid"
              class="normal cursor-pointer"
              style="width: 20px; height: 20px"
              @click="openDialog"
            ></Icon>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" :content="$t('user_deleteUser')" placement="top">
            <Icon
              id="UserList__Info__DeleteUser"
              name="material-symbols:delete-rounded"
              style="width: 20px; height: 20px"
              class="normal cursor-pointer"
              @click="handleDelete"
            ></Icon>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div class="row">
      <div class="rowTitle">{{ $t('user_firstName') }}</div>
      <div class="rowValue" :title="user.firstName">{{ user.firstName }}</div>
    </div>
    <div class="row">
      <div class="rowTitle">{{ $t('user_lastName') }}</div>
      <div class="rowValue" :title="user.lastName">{{ user.lastName }}</div>
    </div>
    <div class="row">
      <div class="rowTitle">{{ $t('user_email') }}</div>
      <div class="rowValue" :title="user.email">{{ user.email }}</div>
    </div>
    <div class="row">
      <div class="rowTitle">{{ $t('user_userLevel') }}</div>
      <div class="rowValue" :title="user.userLevel">{{ user.userLevel }}</div>
    </div>
    <!-- <div class="row">
      <div class="rowTitle">{{ $t('user_company') }}</div>
      <div class="rowValue" :title="user.company">{{ user.company }}</div>
    </div> -->
    <div class="row">
      <div class="rowTitle">{{ $t('user_status') }}</div>
      <div class="rowValue">
        <el-switch
          v-model="user.status"
          :inactive-text="t('actions.inactive')"
          :active-text="t('user_active')"
          active-value="A"
          inactive-value="D"
          :loading="user.loading"
          :disabled="user.loading"
          @change="(value) => handleSetStatus(value, user)"
        />
      </div>
    </div>
    <UserEditDialog ref="UserEditDialogRef" :user="user" @refresh="emits('refresh')"></UserEditDialog>
    <UserPasswordDialog ref="UserPasswordDialogRef" :user="user"></UserPasswordDialog>
  </el-card>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { userProviderDetailKey } from '~/util/userProvider'
import type { UserDTO } from 'api/src/generate/admin'

const { t } = useI18n()
const userProviderDetail = inject(userProviderDetailKey)
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  user: UserDTO
  isLdapMode: boolean
}>()
const emits = defineEmits(['refresh'])

async function handleDelete() {
  try {
    const action = await ElMessageBox.confirm(
      t('userTip.confirmWhetherToDelete'),
      {
        confirmButtonClass: 'el-button el-button--warning',
        confirmButtonText: t('common_confirmDelete'),
        dangerouslyUseHTMLString: true
      })

    if (action !== 'confirm') return
    const res = await userProviderDetail?.BatchDeleteUserApi({ userIds: [props.user.userId] })
    routerProvider?.message.success(t('tip_deleteSuccessMessage', {name: props.user.firstName }))
    if (!!res) userProviderDetail?.openUserList()
  } catch (error) {
    console.log(error)
  }
}

const UserEditDialogRef = ref()

function handleEdit() {
  UserEditDialogRef.value.handleOpen()
}

const UserPasswordDialogRef = ref()

function openDialog() {
  UserPasswordDialogRef.value.handleOpen()
}

async function handleSetStatus(status, row) {
  row.loading = true
  row.properties = null
  const res = await userProviderDetail?.SetUserStatusApi(row)
  if (!res) {
    row.status = status === 'A' ? 'D' : 'A'
  } else {
    // await getAllUserAndActiveCount()
  }
  row.loading = false
}
</script>

<style lang="scss" scoped>
.flex-x-between {
  display: flex;
  justify-content: space-between;
}

.flex-x-end {
  display: flex;
  justify-content: flex-end;
}

.row {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: var(--app-space-xs);
  align-items: center;
  padding: 0.25rem 0;
  color: var(--app-grey-500);

  .rowTitle {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .rowValue {
    max-width: 200px;
    font-weight: bold;
    @extend .rowTitle;
  }
}
</style>
