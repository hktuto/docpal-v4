<template>
<el-dialog 
    class="scroll-dialog retention-add-dialog"
    v-model="state.visible" :title="$t('filePolicies_RetentionPolicyCreate')"
    :close-on-click-modal="false" append-to-body
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson">
    </FormRenderer>
    <template #footer>
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import formJson from './addDialog.vform.json'
import {ElMessage} from "element-plus";
const { t } = useI18n()
const emits = defineEmits([
    'update'
])
const state = reactive({
    loading: false,
    visible: false,
    setting: {},
})
const router = useRouter()
const form = reactive({
    labelRule: []
})
const FormRendererRef = ref()
async function handleSubmit() {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    if(!data) return
    const params = {
        ...state.setting,
        ...data,
        actionType: data.actionType ? 'D' : 'A'
    }
    try {
        state.loading = true
        // await adminApi.api.postPolicyRetentions(params)
        ElMessage.success(t('filePolicies_RetentionPolicyCreateSuccessMsg'))
        state.visible = false
        emits('update')
    } catch (error) {
    }
    state.loading = false
}
async function handleOpen(setting) {
    state.visible = true
    setTimeout(async() => {
        await FormRendererRef.value.vFormRenderRef.resetForm()
        state.setting = {}
    })
}

defineExpose({ handleOpen })
</script>
<style lang="scss">
.retention-add-dialog {
    min-width: 900px;
}
</style>
