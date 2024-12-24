<script lang="ts" setup>
import {adminApi} from 'api'
import {CaseManagementVersionTable} from '#components'
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


async function saveAsNewVersion(data:any){

}

async function promoteVersion(data:any){
    
}

async function openVersionDetail(data:any, openInNewTab:boolean = false){
    const newItem = newCaseManagementDetail(data, data.version)
    routerProvider?.navigateTo(newItem, openInNewTab)
}

function actionPermission(row:any, code:string) {
    return {visible:true, disabled: false}
}

provide(CaseManagementVersionProviderKey,{
    getListApi: (params:any) => {
        routerProvider?.updateProps({
            pageNum: params.pageNum + 1,
            pageSize: params.pageSize,
            orderBy: params.orderBy,
            isDesc: params.isDesc,
        })
        return adminApi.caseTypeController.postPage({...params, caseTypeId: props.caseTypeId})
    },
    actionPermission,
    saveAsNewVersion,
    promoteVersion,
    openVersionDetail
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