<template>
<el-dialog v-model="state.visible" :title="$t('dashboard.setting')"
    class="scroll-dialog"
    append-to-body 
    :close-on-click-modal="false"
    @close="handleClose"
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
        <div class="footer-grid">
            <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
        </div>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { publicApi } from 'api'
import formJson from './dialog.vform.json'
const emits = defineEmits([
    'refresh', 'add'
])
const state = reactive({
    loading: false,
    visible: false,
    setting: {},
    edit: false
})
const FormRendererRef = ref()
async function handleSubmit () {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    state.loading = true
    const _data = {
        name: data.name,
        access: data.access.join(',')
    }
    try {
        if(state.edit) {
            const res = await publicApi.api.putUserDashboard({
                ...state.setting,
                ..._data
            })
            emits('refresh')
        }
        else {
            const res = await publicApi.api.postUserDashboard(_data)
            // router.push(`/data-dashboard/${res.id}`)
            emits('add', res.data)
        }
        state.visible = false
    } catch (error) {
        console.log(error)
    } finally {
        state.loading = false
    }
}
function handleOpen(setting?:any) {
    state.visible = true
    state.edit = false
    if(!setting) {
        setTimeout(async () => {
            FormRendererRef.value.vFormRenderRef.resetForm()
        })
        return
    }
    setTimeout(async () => {
        const _setting = deepCopy(setting)
        state.edit = _setting.edit = true
        state.setting = _setting
        if(_setting.access) _setting.access = _setting.access.split(',')
        else _setting.access = []
        await FormRendererRef.value.vFormRenderRef.setFormData({
            ..._setting
        })
        state.loading = false
    })
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
