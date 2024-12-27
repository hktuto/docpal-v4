<template>
<el-dialog v-model="state.visible" :title="$t('user_newUser')"
    :close-on-click-modal="false"
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { Select, CloseBold } from '@element-plus/icons-vue'
import { userProviderKey } from '~/util/userProvider';
import formJson from './dialog.vform.json'
const userProvider = inject(userProviderKey)
const emits = defineEmits([
    'refresh'
])
const state = reactive({
    loading: false,
    visible: false,
})
const FormRendererRef = ref()
async function handleSubmit () {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    state.loading = true
    try {
        await userProvider?.CreateUserApi(data)
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
onMounted(async() => {
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
