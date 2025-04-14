<template>
  <el-dialog class="dialog-footer--between" v-model="state.visible" :title="$t('user_addGroups')" :close-on-click-modal="false" destroy-on-close>
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <!-- <el-text class="mx-1" type="danger">{{ $t('dpTip.resetWarning') }}</el-text> -->
      <el-button id="UserList__AssignUserGroup__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { userProviderKey } from '~/util/userProvider'
import formJson from './addGroupsDialog.vform.json'
const { t } = useI18n()
const props = defineProps<{}>()
const userProvider = inject(userProviderKey)
const emits = defineEmits(['refresh'])
const state = reactive({
  loading: false,
  visible: false,
  groupList: [],
  setting: {}
})
const FormRendererRef = ref()

async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  const params = {
    groupIds: data.id,
    ...state.setting
  }
  try {
    await userProvider?.BatchUsersToGroupsApi(params)
    ElMessage.success(t('dpMsg_success'))
    state.visible = false
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh')
  } catch (error) {}
  state.loading = false
}

function handleOpen(exitList: any, setting: any) {
  state.visible = true
  state.setting = setting
  setTimeout(() => {
    handleOptions(exitList)
  })
}

async function handleOptions(exitList) {
  const idRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('id')
  idRef.setWidgetOption('multiple', true)
  await getGroupList()
  const options = userListFilter()
  idRef.loadOptions(options)

  function userListFilter() {
    if (!exitList) exitList = []
    return state.groupList.reduce((prev, item) => {
      const index = exitList.findIndex((exitItem) => exitItem.id === item.id)
      if (index === -1) {
        item.value = item.id
        item.label = item.name
        if (!item.isCanModified) item.disabled = true
        prev.push(item)
      }
      return prev
    }, [])
  }
}

async function getGroupList() {
  // if(state.groupList.length > 0) return
  state.groupList = await userProvider?.GetGroupListApi()
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.dialog-footer--between {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  //   .el-dialog__footer {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //   }
}
</style>
