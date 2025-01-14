<template>
<el-dialog v-model="state.visible" :title="$t('docType.new')"
    class="scroll-dialog"
    append-to-body 
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleClose"
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" >
    </FormRenderer>
    <template #footer>
        <div class="footer-grid">
            <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
        </div>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api';
import formJson from './new.vform.json'
const emits = defineEmits([
    'refresh'
])
const state = reactive({
    loading: false,
    visible: false,
    setting: {},
})

const FormRendererRef = ref()
async function handleSubmit () {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    state.loading = true
    try {
        const result =await adminApi.api.postDocpaltypeSettings(data)
        state.visible = false
        emits('refresh')
    } catch (error) {
    } finally {
        state.loading = false
    }
}
function handleOpen() {
    state.visible = true
    setTimeout(async () => {
        FormRendererRef.value.vFormRenderRef.resetForm()
        state.loading = false
    })
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
    