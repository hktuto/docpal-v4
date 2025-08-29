<template>
  <el-dialog v-model="state.visible" :title="$t('masterTable_settingAddPermission')" :close-on-click-modal="false">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button id="MasterTable__Tables__Detail__Setting__Permissions__AddPermission__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import type { GroupDTO, UserDTO } from 'api/src/generate/admin'
import formJson from './addPermissionDialog.vform.json'
import { ElMessage } from 'element-plus'
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  exitList: any[]
  tableId: string
}>()
const { t } = useI18n()
const emits = defineEmits(['refresh'])

const state = reactive<any>({
  loading: false,
  visible: false
})
let userList: UserDTO[] | any = []
let groupList: GroupDTO[] | any = []
const FormRendererRef = ref()

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.getFormData()
    const params = {
      masterTableId: props.tableId,
      userId: data.userId,
      ...data
    }
    state.loading = true
    await adminApi.api.postMasterTablesAclsAdd(params)
    ElMessage.success(
      t('tip_createdSuccessMsg', {
        modelName: t('masterTable_permissionForMaster'),
        name: props.exitList[0]?.masterTableName
      })
    )
    state.visible = false
    emits('refresh')
  } catch (error) {
  } finally {
    state.loading = false
  }
}

async function handleOpen() {
  state.visible = true
  await new Promise((resolve) => setTimeout(resolve, 10))

  FormRendererRef.value.vFormRenderRef.resetForm()
  handleOptions()
}
const { flatRole } = useRBAC()
function handleOptions() {
  const userIdRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('userId')
  const options = [
    {
      key: 'role',
      label: t('user_role'),
      type: 'string',
      isMultiple: false,
      options: flatRole.value.map((item) => ({
        label: item.name,
        value: item.id
      }))
    },
    { value: 'user_groups', label: t('user_groups'), options: groupListFilter() },
    { value: 'user_users', label: t('user_users'), options: userListFilter() }
  ]
  userIdRef.loadOptions(options)

  function userListFilter() {
    return userList?.filter((allItem: any) => !props.exitList.some((exitItem: any) => exitItem.userId === allItem.userId))
  }

  function groupListFilter() {
    return groupList?.filter((allItem: any) => !props.exitList.some((exitItem: any) => exitItem.userId === allItem.id))
  }
}

onMounted(async () => {
  try {
    userList = await adminApi.api.postNuxeoIdentityUsers({}).then((res) => res.data)
    userList?.forEach((item: any) => {
      item.value = item.userId
      item.label = item.username
    })
    const _groupList: any = await adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
    // groupList = _groupList.filter((item: any) => item.id !== 'administrators') // backend fixed
    groupList = _groupList
    groupList?.forEach((item: any) => {
      item.value = item.id
      item.label = item.name
    })
  } catch (error) {}
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped></style>
