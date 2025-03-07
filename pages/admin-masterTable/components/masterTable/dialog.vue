<template>
<el-dialog v-model="state.visible" :title="$t('masterTable_masterName')"
    class="scroll-dialog"
    append-to-body 
    :close-on-click-modal="false"
    destroy-on-close
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" >
    </FormRenderer>
    <template #footer>
        <div class="footer-grid">
            <el-button type="primary" @click="handleSubmit">{{$t('confirm')}}</el-button>
        </div>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import formJson from './dialog.vform.json'
const emits = defineEmits([
    'confirm'
])
const state = reactive({
    visible: false,
    edit: false
})
const FormRendererRef = ref()
async function handleSubmit () {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    try {
        state.visible = false
        emits('confirm', { ...data })
    } catch (error) {
    }
}
function handleOpen(data = { name: ''}) {
    state.visible = true
    setTimeout(async () => {
        await FormRendererRef.value.vFormRenderRef.setFormData({ ...data })
    })
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
