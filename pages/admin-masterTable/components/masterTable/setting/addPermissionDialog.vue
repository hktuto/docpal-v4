<template>
<el-dialog v-model="state.visible" :title="$t('dpDocument_acl_addLocal')"
    :close-on-click-modal="false"
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import type { UserDTO, GroupDTO } from 'api/src/generate/admin'
import formJson from './addPermissionDialog.vform.json' 
const props = defineProps<{
    exitList: any[],
    tableId: string,
}>()
const { t } = useI18n()
const emits = defineEmits([
    'refresh'
])

const state = reactive({
    loading: false,
    visible: false,

})
let userList: never[] | UserDTO[] | undefined | any[] = [] 
let groupList: never[] | GroupDTO[] | undefined | any[] = []
const FormRendererRef = ref()

async function handleSubmit () {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    const params = {
        masterTableId: props.tableId,
        userId: data.userId,
        ...data
    }
    state.loading = true
    try {
        await adminApi.api.postMasterTablesAclsAdd(params)
        state.visible = false
        emits('refresh')
    } catch (error) {
    }
    state.loading = false
}
function handleOpen() {
    state.visible = true
    setTimeout(() => {
        FormRendererRef.value.vFormRenderRef.resetForm()
        handleOptions()
    }, 100)
}
function handleOptions () {
    const userIdRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('userId')
    const options = [
        { value: 'user_groups', label: t('user_groups'), options: groupListFilter() },
        { value: 'user_users', label: t('user_users'), options: userListFilter() }
    ]
    userIdRef.loadOptions(options)
    function userListFilter() {
        return userList?.filter((allItem:any) => 
                !props.exitList.some((exitItem:any) => exitItem.userId === allItem.userId))
    }
    function groupListFilter() {
        return groupList?.filter((allItem:any) => 
                !props.exitList.some((exitItem:any) => exitItem.userId === allItem.id))
    }
}
onMounted(async() => {
    userList = await adminApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
    userList?.forEach(item => {
        item.value = item.userId
        item.label = item.username
    });
    groupList = await adminApi.api.postNuxeoIdentityGroups().then(res => res.data)
    groupList?.forEach(item => {
        item.value = item.id
        item.label = item.name
    });
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
