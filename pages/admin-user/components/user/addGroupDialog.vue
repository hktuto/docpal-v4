<template>
<el-dialog v-model="state.visible" :title="$t('user_addGroups')"
    :close-on-click-modal="false"
    >
    <FormRenderer ref="FromRendererRef" :form-json="formJson" />
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { userProviderDetailKey } from '~/util/userProvider';
import formJson from './addGroupDialog.vform.json'
const userProviderDetail = inject(userProviderDetailKey)
const props = defineProps<{
    user: object,
}>()
const emits = defineEmits([
    'refresh'
])
const state = reactive({
    loading: false,
    visible: false,
    groupList: []
})
const FromRendererRef = ref()
async function handleSubmit () {
    const data = await FromRendererRef.value.vFormRenderRef.getFormData()
    state.loading = true
    const param = {
        groupIds: data.id,
        userId: props.user.userId,
    }
    try {
        await userProviderDetail?.BatchUserAddGroupsApi(param)
        state.visible = false
        FromRendererRef.value.vFormRenderRef.resetForm()
        emits('refresh')
    } catch (error) {
        
    }
    state.loading = false
}
function handleOpen(exitList: any) {
    state.visible = true
    setTimeout(() => {
        handleOptions(exitList)
    })
}
function handleOptions (exitList: any) {
    const idRef = FromRendererRef.value.vFormRenderRef.getWidgetRef('id')
    const options = userListFilter()
    idRef.loadOptions(options)
    function userListFilter() {
        return state.groupList.reduce((prev: any, item: any) => {
            const index = exitList.findIndex((exitItem: any) => exitItem.id === item.id)
            if (index === -1) {
                item.value = item.id
                item.label = item.name
                if (!item.isCanModified) item.disabled = true
                prev.push(item)
            }
            return prev
        }, []);
    }
}
onMounted(async() => {
    state.groupList = await userProviderDetail?.GetGroupListApi()
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
