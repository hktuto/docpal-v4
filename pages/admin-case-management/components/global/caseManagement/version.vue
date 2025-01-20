<script lang="ts" setup>
import {adminApi} from 'api'
import {CaseManagementVersionTable} from '#components'
import { ElNotification } from 'element-plus';
const props = defineProps<{
    caseTypeId: string,
    name: string,
    orderBy?: string,
    isDesc?: boolean,
    pageSize?: number,
    pageNum?: number,
}>();
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const tableRef = ref<InstanceType<typeof CaseManagementVersionTable>>()
const { pageNum, pageSize, orderBy, isDesc } = toRefs(props)

const caseData = ref();

async function getCaseData(){

    const { data } = await adminApi.api.getCaseTypesId(props.caseTypeId)
    caseData.value = data
    console.log(caseData.value)
}

async function saveAsNewVersion(data:any){
    console.log("saveAsNewVersion", data)
    // TODO : save as case logic
    await adminApi.api.postCaseTypesVersionVersionidNew(data.id)
    tableRef.value?.reload()
    ElNotification.success(`${data.versionNumber} has save to new version`)
}

async function promoteVersion(data:any){
    
}

async function openVersionDetail(data:any, openInNewTab:boolean = false){
    const newItem = newCaseManagementDetail(data.id, data.name, data.version)
    console.log("openVersionDetail", newItem)
    routerProvider?.navigateTo(newItem, openInNewTab)
}

function actionPermission({row, code}:PermissionMethodParams) {
    const isProduction = row.production
    console.log("actionPermission", row, code, caseData.value)
    const isLatest = row.version === caseData.value.latestVersion
    switch(code){
        case 'edit_version':
            return {visible:true, disabled: !isLatest}
        case 'edit_version_new_tab':
            return {visible:true, disabled: !isLatest}
        case 'save_as_new_version':
            return {visible:true, disabled: false}
        case 'promote_version':
            return {visible:true, disabled: isProduction}
        default:
            return {visible:true, disabled: false}
    }
}

provide(CaseManagementVersionProviderKey,{
    getListApi: (params:any) => {
        routerProvider?.updateProps({
            pageNum: params.pageNum + 1,
            pageSize: params.pageSize,
            orderBy: params.orderBy,
            isDesc: params.isDesc,
        })
        return adminApi.api.postCaseTypesVersionPage({...params, caseTypeId: props.caseTypeId})
    },
    actionPermission,
    saveAsNewVersion,
    promoteVersion,
    openVersionDetail
})

onMounted(async () => {
    await getCaseData()
})

</script>


<template>
    <div class="pageContainer">
        <CaseManagementVersionTable ref="tableRef" v-bind="props"  />
    </div>
</template>


<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    padding: var(--app-space-xs);
}
</style>