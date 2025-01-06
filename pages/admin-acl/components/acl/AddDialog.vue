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
import { adminApi } from 'api'
import  formJson from './acl.vform.json'
const props = defineProps<{
    doc: any,
    exitList: any[],
}>()
const emits = defineEmits([
    'refresh'
])
const state = reactive({
    loading: false,
    visible: false,

    userList: [],
    groupList: []
})
const FromRendererRef = ref()
const { t } = useI18n()
async function handleSubmit () {
    const data = await FromRendererRef.value.vFormRenderRef.getFormData()
    const params:any = {
        idOrPath: props.doc.id,
        userId: data.userId,
        permission: data.permission
    }
    if(data.time === 'dateBase') {
        params.startDate = data.dateRange[0]
        params.endDate = data.dateRange[1]
    }
    state.loading = true

    try {
        await adminApi.api.postNuxeoDocumentAclAdd(params)
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
    })
}
function handleOptions () {
    const userIdRef = FromRendererRef.value.vFormRenderRef.getWidgetRef('userId')
    const options = [
        { value: 'user_groups', label: t('user_groups'), options: groupListFilter() },
        { value: 'user_users', label: t('user_users'), options: userListFilter() }
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
    const {data} = await adminApi.api.postNuxeoIdentityUsers({})
    state.userList = data || [] as any
    state.userList.forEach((item:any) => {
        item.value = item.userId
        item.label = item.username
    });
    const groupResponse = await adminApi.api.postNuxeoIdentityGroups({})
    state.groupList= groupResponse.data || [] as any
    state.groupList.forEach((item:any) => {
        item.value = item.id
        item.label = item.name
    });
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
