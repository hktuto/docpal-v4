<template>
<el-dialog v-model="state.visible" :title="$t('user_addUser')"
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
import formJson from './addUserDialog.vform.json'
import type { UserDTO, GroupDTO } from 'api/src/generate/admin'
const groupProviderDetail = inject(groupProviderDetailKey)
const props = defineProps<{
    group: GroupDTO,
}>()
const emits = defineEmits([
    'refresh'
])
const state = reactive<{
    loading: boolean,
    visible: boolean,
    userList: UserDTO[],
}>({
    loading: false,
    visible: false,
    userList: []
})
const FormRendererRef = ref()
async function handleSubmit () {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    state.loading = true
    try {
        const param = {
            groupId: props.group.id,
            userIds: data.id
        }
        await groupProviderDetail?.BatchGroupAddUsersApi(param)
        setTimeout(() => { state.visible = false }, 300)
        FormRendererRef.value.vFormRenderRef.resetForm()
        emits('refresh')
    } catch (error) {

    }
    state.loading = false
}
function handleOpen(exitList:UserDTO[]) {
    state.visible = true
    setTimeout(() => {
        handleOptions(exitList)
    },100)
}
async function handleOptions (exitList:UserDTO[]) {
    console.log(exitList)
    if(!state.userList || state.userList.length === 0) state.userList = await groupProviderDetail?.getUserListApi()
    const idRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('id')

    const options = userListFilter()
    
    idRef.loadOptions(options)
    function userListFilter() {
        return state.userList.reduce((prev: any[], item: UserDTO & any) => {
            const index = exitList.findIndex(exitItem => exitItem.userId === item.userId)
            if (index === -1 && item.userId) {
                item.value = item.userId
                item.label = item.username
                prev.push(item)
            }
            return prev
        }, []);
    }
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
