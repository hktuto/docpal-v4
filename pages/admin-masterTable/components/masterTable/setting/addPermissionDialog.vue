<template>
<el-dialog v-model="state.visible" :title="$t('dpDocument_acl_addLocal')"
    :close-on-click-modal="false"
    >
    <FromRenderer ref="FromRendererRef" :form-json="formJson" />
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { getJsonApi, getUserListApi, GetGroupListApi, AddMasterTablesAclApi } from 'dp-api'
const props = defineProps<{
    exitList: Array,
}>()
const emits = defineEmits([
    'refresh'
])
const route = useRoute()

const state = reactive({
    loading: false,
    visible: false,

    userList: [],
    groupList: []
})
const FromRendererRef = ref()
const formJson = getJsonApi('admin/masterTablePermission.json')

async function handleSubmit () {
    const data = await FromRendererRef.value.vFormRenderRef.getFormData()
    const params = {
        masterTableId: route.params.id,
        userId: data.userId,
        ...data
    }
    state.loading = true
    try {
        await AddMasterTablesAclApi(params)
        state.visible = false
        emits('refresh')
    } catch (error) {
    }
    state.loading = false
}
function handleOpen() {
    state.visible = true
    setTimeout(() => {
        FromRendererRef.value.vFormRenderRef.resetForm()
        handleOptions()
    }, 100)
}
function handleOptions () {
    const userIdRef = FromRendererRef.value.vFormRenderRef.getWidgetRef('userId')
    const options = [
        { value: 'user_groups', label: $i18n.t('user_groups'), options: groupListFilter() },
        { value: 'user_users', label: $i18n.t('user_users'), options: userListFilter() }
    ]
    userIdRef.loadOptions(options)
    function userListFilter() {
        return state.userList.filter((allItem:any) => 
                !props.exitList.some((exitItem:any) => exitItem.userId === allItem.userId))
    }
    function groupListFilter() {
        return state.groupList.filter((allItem:any) => 
                !props.exitList.some((exitItem:any) => exitItem.userId === allItem.id))
    }
}
onMounted(async() => {
    state.userList = await getUserListApi()
    state.userList.forEach(item => {
        item.value = item.userId
        item.label = item.username
    });
    state.groupList= await GetGroupListApi()
    state.groupList.forEach(item => {
        item.value = item.id
        item.label = item.name
    });
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
