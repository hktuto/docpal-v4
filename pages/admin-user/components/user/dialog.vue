<template>
  <el-dialog v-model="state.visible" :title="$t('user_newUser')"
             :close-on-click-modal="false" destroy-on-close
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button id="UserList__CreateNewUser__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { userProviderKey } from '~/util/userProvider'
import formJson from './dialog.vform.json'

const { t } = useI18n()
const userProvider = inject(userProviderKey)
const routerProvider = inject(MenuRouterKey)
const emits = defineEmits([
  'refresh'
])
const state = reactive({
  loading: false,
  visible: false
})
const FormRendererRef = ref()

async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData()
  if (!data.userId || !data.username) {
    routerProvider?.message.error(t("user_username") + t('render.hint.fieldRequired'));
    return;
  }
  state.loading = true
  try {
    await adminApi.api.postNuxeoIdentityUser(data)
    state.visible = false
    await adminApi.api.postNuxeoIdentityUserBatchAddGroups({
      userId: data.userId,
      groupIds: data.groupList
    })
    routerProvider?.message.success(t('tip_createdSuccessMsg', { modelName: t('User'), name: data.userId }))
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh')
  } catch (error) {
    console.log(error)
  }
  state.loading = false
}

function handleOpen() {
  state.visible = true
}

onMounted(async () => {
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
