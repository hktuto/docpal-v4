<script lang="ts" setup>
import {CaseManagementListProviderKey, MenuRouterKey} from '#imports';
import { adminApi} from 'api'
import { newCaseManagementDetail } from '~/utils/caseManagementHelper';
import tableComponent from '../../caseManagement/list/table.vue'
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}

const props= defineProps<{
    pageNum: number,
    pageSize: number,
    sort: any,
    filters: any,
}>();
const { pageNum, pageSize, sort, filters } = toRefs(props)
const filterFormdata = ref();
function updatePageParams({pageNum, pageSize, sort, filters}:any){
    routerProvider?.updateProps({
        pageNum,
        pageSize,
        sort,
        filters
    })
}

const tableRef = ref<InstanceType<typeof tableComponent>>()

function handleFilterFormChange(formData:any) {
    filterFormdata.value = formData
    tableRef.value?.reload()
}

function openLatestVersion(data:any){
    const newItem = newCaseManagementDetail(data)
    routerProvider?.navigateTo(newItem)
}

function openProductionVersion(data:any){
    const newItem = newCaseManagementDetail(data)
    routerProvider?.navigateTo(newItem)
}


function openNewCaseDialog(){

}

provide(CaseManagementListProviderKey,{
    getListApi: (params:any) => {
        const filter = filterFormdata.value
        if(filter){
            Object.keys(filter).forEach(key => {
                if(filter[key]) params[key] = filter[key]
            })
        }
        return adminApi.caseTypeController.postPage(params)
    },
    updatePageParams,
    openLatestVersion,
    openProductionVersion
})

</script>


<template>
    <div class="pageContainer">
        <CaseManagementListTable ref="tableRef" >
            <template #toolbar_buttons>
                <div class="actionsContainer">
                    <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
                    inputKey="name"/>
                    <el-button type="primary" @click="openNewCaseDialog">{{$t('button.add')}}</el-button>
                </div>
            </template>
        </CaseManagementListTable>
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    padding: var(--app-space-xs);
}
.actionsContainer{
    display: flex;
    flex-flow: row nowrap;
    gap: var(--app-space-s);
    justify-content: flex-start;
    align-items: center;
}
</style>