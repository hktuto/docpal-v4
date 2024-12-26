<template>
<el-dialog v-model="state.visible" :title="$t('user_newGroup')"
    :close-on-click-modal="false"
    >
    <FromRenderer ref="FromRendererRef" :form-json="formJson" />
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import { getJsonApi, CreateGroupApi } from 'dp-api'
const emits = defineEmits([
    'refresh'
])
const props = defineProps<{
  groups:any[]
}>()
const state = reactive({
    loading: false,
    visible: false,
})
const FromRendererRef = ref()
const formJson = getJsonApi('admin/adminGroupForm.json')
async function handleSubmit () {
    const data = await FromRendererRef.value.vFormRenderRef.getFormData()
    // check group name exist
  if(props.groups.some((g:any) => g.name === data.groupName || g.id === data.groupId)) {
    ElMessage.error('Group name / id already exists')
    return
  }
    data.groupName = data.groupName.trim()
    state.loading = true
    try {
        await CreateGroupApi(data)
        state.visible = false
        FromRendererRef.value.vFormRenderRef.resetForm()
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
