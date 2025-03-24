<template>
  <el-dialog v-model="state.visible" :title="$t('user_editPassword')" :close-on-click-modal="false">
    <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
    <template #footer>
      <el-button id="UserList__Info__ChangePassword__Submit" type="primary" :loading="state.loading"
                 @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {userProviderDetailKey} from '~/util/userProvider';
import formJson from './passwordDialog.vform.json'
import {ElMessage} from "element-plus";

const routerProvider = inject(MenuRouterKey)

const {t} = useI18n()
const userProviderDetail = inject(userProviderDetailKey)

const props = defineProps<{
  user: object,
}>()
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
  state.loading = true
  try {
    const param = {
      password: data.password,
      userId: props.user.userId,
    }
    await userProviderDetail?.PatchUserPasswordApi(param)
    routerProvider?.message.success(t('tip_updateSuccessMsg', {
      modelName: t('user_userPassword'),
      name: param.userId
    }));
    state.visible = false
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh')
  } catch (error) {

  }
  state.loading = false
}

function handleOpen() {
  state.visible = true
}

defineExpose({handleOpen})
</script>
<style lang="scss" scoped>

</style>
