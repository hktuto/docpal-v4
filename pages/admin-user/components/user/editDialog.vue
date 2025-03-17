<template>
  <el-dialog v-model="state.visible" :title="$t('user_editUser')" :close-on-click-modal="false">
    <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
    <template #footer>
      <el-button id="adminUserInfoEditSubmit" type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {adminApi} from 'api'
import formJson from './editDialog.vform.json'

const routerProvider = inject(MenuRouterKey)
const {t} = useI18n()
const props = defineProps<{
  user: any,
}>()
const emits = defineEmits([
  'refresh'
])
const state = reactive({
  loading: false,
  visible: false,
})
const FormRendererRef = ref()

async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  try {
    await adminApi.api.patchNuxeoIdentityUser({...props.user, properties: null, ...data})
    routerProvider?.message.success(t('user_userInfoUpdatedSuccessMsg', {username: data.name}));
    state.visible = false
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh')
  } catch (error) {

  }
  state.loading = false
}

function handleOpen() {
  state.visible = true
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.setFormData(props.user)
  })
}

onMounted(async () => {
})
defineExpose({handleOpen})
</script>
<style lang="scss" scoped>

</style>
