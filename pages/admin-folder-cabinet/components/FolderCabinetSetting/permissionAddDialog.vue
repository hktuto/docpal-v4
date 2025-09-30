<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('folder_cabinetDetailLocalPermissionAdd')"
    :close-on-click-modal="false"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button id="FolderCabinetSetting__Info__AddLocalPermission__Submit" type="primary" :loading="state.loading"
                 @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import formJson from './permissionAddDialog.vform.json'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  id: string;
  exitList: any;
}>()
const { t } = useI18n()
const emits = defineEmits(['refresh'])
const state = reactive<any>({
  loading: false,
  visible: false,

  userList: [],
  groupList: []
})
const FormRendererRef = ref()

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.getFormData()
    const params: any = {
      id: props.id,
      userId: data.userId
    }
    if (data.permission === 'Print') {
      params.print = true
    } else {
      params.permission = data.permission
    }
    if (data.time === 'dateBase') {
      params.startDate = data.dateRange[0]
      params.endDate = data.dateRange[1]
    }
    state.loading = true
    await adminApi.api.postCabinetTemplatePermission(params)
    state.visible = false
    ElMessage.success(t('tip_createdMsg', { modelName: t('folder_cabinetLocalPermissionOfFolder'), name: null }))
    emits('refresh')
  } catch (error) {
    console.log(error)
  }
  state.loading = false
}

function handleOpen() {
  state.visible = true
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.resetForm()
    handleOptions()
  })
}

function handleOptions() {
  const userIdRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('userId')
  const options = [
    { value: 'user_groups', label: t('user_groups'), options: groupListFilter() },
    { value: 'user_users', label: t('user_users'), options: userListFilter() }
  ]
  userIdRef.loadOptions(options)

  function userListFilter() {
    return state.userList.filter(
      (allItem: any) =>
        !props.exitList.some((exitItem: any) => exitItem.userId === allItem.userId)
    )
  }

  function groupListFilter() {
    return state.groupList.filter(
      (allItem: any) =>
        !props.exitList.some((exitItem: any) => exitItem.userId === allItem.id)
    )
  }
}

async function init() {
  state.userList = await adminApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
  state.userList.forEach((item: any) => {
    item.value = item.userId
    item.label = item.username
  })
  state.groupList = await adminApi.api.postNuxeoIdentityGroups().then(res => res.data)
  state.groupList.forEach((item: any) => {
    item.value = item.id
    item.label = item.name
  })
}

onMounted(async () => {
  init()
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped></style>
 