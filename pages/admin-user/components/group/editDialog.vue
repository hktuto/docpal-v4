<template>
<el-dialog v-model="state.visible" :title="$t('user_editGroup')"
    :close-on-click-modal="false"
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { groupProviderDetailKey } from '~/util/userProvider';
import formJson from './editDialog.vform.json'
const groupProviderDetail = inject(groupProviderDetailKey)
const props = defineProps<{
    group: any,
}>()
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
        data.groupId = props.group.id
        const res = await groupProviderDetail?.PatchGroupApi(data)
        state.visible = false
        FormRendererRef.value.vFormRenderRef.resetForm()
        emits('refresh', res.data)
    } catch (error) {

    }
    state.loading = false
}
function handleOpen() {
    state.visible = true
    setTimeout(() => {
        FormRendererRef.value.vFormRenderRef.setFormData({groupName: props.group.name})
    })
}
onMounted(async() => {
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
